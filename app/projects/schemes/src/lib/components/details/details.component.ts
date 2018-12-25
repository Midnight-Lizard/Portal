import { Store, select } from '@ngrx/store';
import { filter, map, first, withLatestFrom, switchMap, take, skip } from 'rxjs/operators';
import { Observable, combineLatest, fromEvent, Subscription } from 'rxjs';
import
{
    Component, TrackByFunction, ElementRef,
    AfterViewInit, ViewChildren, QueryList, OnDestroy
} from '@angular/core';

import { NotifyUser, NotificationLevel, SideService } from 'core';

import { PublicScheme, PublicSchemeDetails } from '../../model/public-scheme';
import { SchemesRootState } from '../../store/schemes.state';
import * as Act from '../../store/schemes.actions';
import { ExtensionService } from '../../extension/extension.service';

@Component({
    selector: 'schemes-details',
    templateUrl: './details.component.html',
    styleUrls: ['./details.component.scss']
})
export class SchemeDetailsComponent implements AfterViewInit, OnDestroy
{
    private subs = new Array<Subscription>();
    public readonly supportsNativeShare: boolean = false;
    public readonly scheme$: Observable<PublicSchemeDetails[]>;
    public readonly schemeIsInstalled$: Observable<boolean>;
    public get extensionIsAvailable() { return this.extension.isAvailable; }

    @ViewChildren('addRemoveButton', { read: ElementRef }) addRemoveButton: QueryList<ElementRef>;

    constructor(
        private readonly env: SideService,
        private readonly store$: Store<SchemesRootState>,
        private readonly extension: ExtensionService)
    {
        if (env.isBrowserSide)
        {
            this.supportsNativeShare = !!((navigator as any).share);
        }

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
        this.subs.push(this.extension.installedPublicSchemes$.pipe(first())
            .subscribe(installedPublicSchemes =>
                installedPublicSchemes.includes(scheme.id)
                    ? this.extension.uninstallPublicScheme(scheme.id)
                    : this.extension.installPublicScheme(scheme)));
    }

    ngAfterViewInit(): void
    {
        if (this.extensionIsAvailable)
        {
            const getClicks = () => fromEvent(this.addRemoveButton.first.nativeElement, 'click');
            const clicks$ = this.addRemoveButton.first
                ? getClicks() : this.addRemoveButton.changes.pipe(first(), switchMap(() => getClicks()));

            this.subs.push(clicks$.pipe(
                switchMap(() => this.extension.installedPublicSchemes$.pipe(skip(1), take(1))),
                withLatestFrom(this.scheme$),
                map(([installedIds, scheme]) => ({
                    schemeName: scheme[0].name,
                    installed: installedIds.includes(scheme[0].id)
                }))
            ).subscribe(x =>
            {
                const message = x.installed
                    ? `Color scheme ‘${x.schemeName}’ has been successfully installed.`
                    : `Color scheme ‘${x.schemeName}’ has been successfully uninstalled.`;
                this.store$.dispatch(new NotifyUser({
                    message: message,
                    level: NotificationLevel.Info,
                    isLocal: true,
                }));
            }));
        }
    }

    ngOnDestroy(): void
    {
        this.subs.forEach(x => x.unsubscribe());
    }

    nativeShare(scheme: PublicSchemeDetails)
    {
        if (this.env.isBrowserSide && (navigator as any).share)
        {
            (navigator as any).share({ url: document!.location!.href! });
        }
    }

    public get facebookShareUrl()
    {
        if (this.env.isBrowserSide)
        {
            const url = encodeURIComponent(document!.location!.href!);
            return `https://www.facebook.com/dialog/share?app_id=271115283358654&href=${url}`;
        }
    }

    public get twitterShareUrl()
    {
        if (this.env.isBrowserSide)
        {
            const url = encodeURIComponent(document!.location!.href!);
            return `https://twitter.com/share?url=${url}`;
        }
    }
}
