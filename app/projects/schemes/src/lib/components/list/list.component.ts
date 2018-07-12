import { Component, OnDestroy, TrackByFunction, HostBinding, Inject, Optional, OnInit } from '@angular/core';
import { ObservableMedia, MediaChange } from '@angular/flex-layout';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntil, filter, map, switchMap, first } from 'rxjs/operators';
import { Subscription, Observable, Subject } from 'rxjs';
import { Store, select } from '@ngrx/store';

import { SideService } from 'core';
import { SchemesRootState } from '../../store/schemes.state';
import { PublicScheme } from '../../model/public-scheme';
import * as Act from '../../store/schemes.actions';
import { SchemeDetailsComponent } from '../details/details.component';

@Component({
    selector: 'schemes-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss']
})
export class SchemesListComponent implements OnDestroy, OnInit
{
    cols = 2;
    aspect = '4:5';
    private readonly disposed = new Subject<boolean>();
    readonly schemes$: Observable<PublicScheme[]>;
    private _mediaSub: Subscription;
    @HostBinding('class.show-loading') isLoading = false;

    constructor(
        private readonly env: SideService,
        private readonly media$: ObservableMedia,
        @Inject('MEDIA') @Optional() private readonly lastMedia: string | null,
        private readonly store$: Store<SchemesRootState>,
        private readonly route: ActivatedRoute,
        private readonly router: Router,
        private readonly dialog: MatDialog)
    {
        this.schemes$ = store$.pipe(select(s => s.SCHEMES.schemes.data));
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

        this.route.paramMap.pipe(
            map(x => x.get('id')!),
            filter(id => !!id),
            takeUntil(self.disposed)
        ).subscribe(id =>
        {
            self.dialog.open(SchemeDetailsComponent, {
                maxWidth: '85vw',
                maxHeight: '90vh'
            }).afterClosed().pipe(
                first(),
                switchMap(_ => self.store$.pipe(
                    select(x => x.SCHEMES.schemes.list),
                    first()
                ))).subscribe(list =>
                    self.router.navigate(['schemes', 'index', list, ''], {
                        queryParamsHandling: 'preserve'
                    }));
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
                    this.aspect = '100:85';
                    break;

                case 'md':
                    this.cols = 2;
                    this.aspect = '100:93';
                    break;

                case 'lg':
                    this.cols = 2;
                    this.aspect = '100:90';
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
        this.store$.pipe(
            select(x => x.SCHEMES.schemes.list),
            first()
        ).subscribe(list =>
            self.router.navigate(['schemes', 'index', list, scheme.id], {
                queryParamsHandling: 'preserve'
            }));
    }
}
