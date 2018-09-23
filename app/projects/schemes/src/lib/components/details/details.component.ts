import { Component, TrackByFunction } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { filter, map, first } from 'rxjs/operators';
import { Observable, combineLatest } from 'rxjs';

import { PublicScheme, PublicSchemeDetails } from '../../model/public-scheme';
import { SchemesRootState } from '../../store/schemes.state';
import * as Act from '../../store/schemes.actions';
import { ExtensionService } from '../../extension/extension.service';

@Component({
    selector: 'schemes-details',
    templateUrl: './details.component.html',
    styleUrls: ['./details.component.scss']
})
export class SchemeDetailsComponent
{
    public readonly scheme$: Observable<PublicSchemeDetails[]>;
    public readonly schemeIsInstalled$: Observable<boolean>;
    public get extensionIsAvailable() { return this.extension.isAvailable; }

    constructor(
        private readonly store$: Store<SchemesRootState>,
        private readonly extension: ExtensionService)
    {
        this.scheme$ = store$.pipe(
            select(x => x.SCHEMES.schemes.currentScheme!),
            filter(scheme => !!scheme),
            map(x => [x])
        );

        this.schemeIsInstalled$ = combineLatest(this.scheme$, extension.installedPublicSchemes$)
            .pipe(map(([scheme, installedIds]) => installedIds.includes(scheme[0].id)));
    }

    trackById: TrackByFunction<PublicScheme> = (index, item) => item ? item.id : null;

    toggleSchemeLiked(scheme: PublicScheme)
    {
        this.store$.dispatch(scheme.liked
            ? new Act.DislikeScheme(scheme)
            : new Act.LikeScheme(scheme));
    }

    toggleSchemeFavorited(scheme: PublicScheme)
    {
        this.store$.dispatch(scheme.favorited
            ? new Act.RemoveSchemeFromFavorites(scheme)
            : new Act.AddSchemeToFavorites(scheme));
    }

    installOrUninstallPublicScheme(scheme: PublicSchemeDetails)
    {
        this.extension.installedPublicSchemes$.pipe(first())
            .subscribe(installedPublicSchemes =>
                installedPublicSchemes.includes(scheme.id)
                    ? this.extension.uninstallPublicScheme(scheme.id)
                    : this.extension.installPublicScheme(scheme));
    }
}
