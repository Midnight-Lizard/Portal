import { Component, TrackByFunction } from '@angular/core';
import { } from '@angular/material';
import { Store, select } from '@ngrx/store';
import { filter, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { PublicScheme, PublicSchemeDetails } from '../../model/public-scheme';
import { SchemesRootState } from '../../store/schemes.state';
import * as Act from '../../store/schemes.actions';

@Component({
    selector: 'schemes-details',
    templateUrl: './details.component.html',
    styleUrls: ['./details.component.scss']
})
export class SchemeDetailsComponent
{
    public readonly scheme$: Observable<PublicSchemeDetails[]>;

    constructor(
        protected readonly store$: Store<SchemesRootState>)
    {
        this.scheme$ = store$.pipe(
            select(x => x.SCHEMES.schemes.currentScheme!),
            filter(scheme => !!scheme),
            map(x => [x])
        );
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
}
