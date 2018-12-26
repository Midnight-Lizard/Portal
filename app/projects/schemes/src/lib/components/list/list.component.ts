import { Component, OnDestroy, TrackByFunction, HostBinding, Inject, Optional, OnInit, AfterViewInit } from '@angular/core';
import { ObservableMedia, MediaChange } from '@angular/flex-layout';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntil, filter, map, switchMap, first, delay } from 'rxjs/operators';
import { Subscription, Observable, Subject, combineLatest } from 'rxjs';
import { Store, select } from '@ngrx/store';

import { SideService, MetaService, InfoRootState } from 'core';
import { SchemesRootState } from '../../store/schemes.state';
import { PublicScheme } from '../../model/public-scheme';
import * as Act from '../../store/schemes.actions';
import { SchemeDetailsComponent } from '../details/details.component';
import { SchemesList } from '../../model/schemes-lists';
import { ScreenshotSize } from '../../model/screenshot';

@Component({
    selector: 'schemes-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss'],
    providers: [
        { provide: 'scrollContainerSelector', useValue: '.mat-sidenav-content' },
        { provide: 'searchScrollContainerSelectorFromRoot', useValue: true },
        { provide: 'scrollThrottleTime', useValue: 150 }
    ]
})
export class SchemesListComponent implements OnDestroy, OnInit, AfterViewInit
{
    cols = 2;
    aspect = '4:5';
    private readonly disposed = new Subject<boolean>();
    readonly schemes$: Observable<PublicScheme[]>;
    private readonly list$: Observable<SchemesList>;
    private _mediaSub: Subscription;
    @HostBinding('class.show-loading') isLoading = false;

    constructor(
        private readonly env: SideService,
        private readonly media$: ObservableMedia,
        @Inject('MEDIA') @Optional() private readonly lastMedia: string | null,
        private readonly store$: Store<SchemesRootState & InfoRootState>,
        private readonly route: ActivatedRoute,
        private readonly router: Router,
        private readonly dialog: MatDialog,

        @Inject('scrollContainerSelector')
        readonly scrollContainerSelector: string,

        @Inject('searchScrollContainerSelectorFromRoot')
        readonly searchScrollContainerSelectorFromRoot: boolean,

        @Inject('scrollThrottleTime')
        readonly scrollThrottleTime: number,

        meta: MetaService)
    {
        this.schemes$ = store$.pipe(select(s => s.SCHEMES.schemes.data));
        this.list$ = store$.pipe(select(x => x.SCHEMES.schemes.list));

        combineLatest(
            this.route.paramMap.pipe(
                map(x => x.get('id')!),
                filter(id => !!id)),
            store$.pipe(
                select(x => x.SCHEMES.schemes.currentScheme),
                filter(x => !!x))).pipe(
                    filter(([id, scheme]) => !!scheme && id === scheme.id),
                    map(([id, scheme]) => scheme!),
                    takeUntil(this.disposed))
            .subscribe(scheme =>
            {
                meta.updatePageMetaData({
                    title: `${scheme.name} - Midnight Lizard color scheme`,
                    description: (scheme.description || '').trim(),
                    image: scheme.screenshots[0].urls[ScreenshotSize.ExtraSmall]
                });
            });
    }

    ngOnInit(): void
    {
        const self = this;

        this.store$.pipe(
            select(x => x.SCHEMES.schemes.done),
            takeUntil(self.disposed)
        ).subscribe(done =>
        {
            self.isLoading = !done;
        });

        this._mediaSub = this.media$.subscribe((change: MediaChange) =>
        {
            let mq = this.lastMedia || 'default';
            if (this.env.isBrowserSide && change.matches)
            {
                mq = change.mqAlias;
            }
            switch (mq)
            {
                case 'xs':
                    this.cols = 1;
                    this.aspect = '100:92';
                    break;

                case 'sm':
                    this.cols = 1;
                    this.aspect = '100:80';
                    break;

                case 'md':
                    this.cols = 2;
                    this.aspect = '100:90';
                    break;

                case 'lg':
                    this.cols = 2;
                    this.aspect = '100:85';
                    break;

                case 'xl':
                    this.cols = 3;
                    this.aspect = '100:90';
                    break;

                default:
                    this.cols = 2;
                    this.aspect = '100:92';
                    break;
            }
        });
    }

    ngAfterViewInit(): void
    {
        if (this.env.isBrowserSide)
        {
            const self = this;

            this.route.paramMap.pipe(
                map(x => x.get('id')!),
                filter(id => !!id),
                takeUntil(self.disposed),
                delay(0)
            ).subscribe(id =>
            {
                const dialog = self.dialog.open(SchemeDetailsComponent, {
                    maxWidth: '85vw',
                    maxHeight: '90vh',
                    autoFocus: false
                });

                this.store$.pipe(
                    select(x => x.INFO.notification.lastMessage),
                    filter(x => !!x && x.correlationId === id),
                    delay(300),
                    takeUntil(self.disposed),
                    takeUntil(dialog.beforeClosed()))
                    .subscribe(() => dialog.close());

                dialog.beforeClosed()
                    .pipe(switchMap(_ => self.list$), takeUntil(self.disposed))
                    .subscribe(list =>
                        self.router.navigate(['schemes', 'index', list, ''], {
                            queryParamsHandling: 'preserve'
                        }));
            });
        }
    }

    ngOnDestroy(): void
    {
        this.disposed.next(true);
        this._mediaSub.unsubscribe();
    }

    trackById: TrackByFunction<PublicScheme> = (index, item) => item ? item.id : null;

    onScroll()
    {
        this.store$.dispatch(new Act.LoadNextSchemesChunk());
    }

    toggleSchemeLiked(scheme: PublicScheme)
    {
        this.store$.dispatch(scheme.liked
            ? new Act.DislikeScheme(scheme)
            : new Act.LikeScheme(scheme));
        return true;
    }

    toggleSchemeFavorited(scheme: PublicScheme)
    {
        this.store$.dispatch(scheme.favorited
            ? new Act.RemoveSchemeFromFavorites(scheme)
            : new Act.AddSchemeToFavorites(scheme));
        return true;
    }

    expand(scheme: PublicScheme)
    {
        const self = this;
        this.list$.subscribe(list =>
            self.router.navigate(['schemes', 'index', list, scheme.id], {
                queryParamsHandling: 'preserve'
            }));
    }
}
