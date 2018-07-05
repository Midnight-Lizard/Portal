import { Component, OnDestroy, TrackByFunction, HostBinding, Inject, Optional } from '@angular/core';
import { ObservableMedia, MediaChange } from '@angular/flex-layout';
import { Subscription, Observable, Subject } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { takeUntil } from 'rxjs/operators';

import { SchemesFeatureState, SchemesRootState } from '../../store/schemes.state';
import { PublicScheme } from '../../model/public-scheme';
import * as Act from '../../store/schemes.actions';
import { SideService } from 'core';

@Component({
    selector: 'schemes-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss']
})
export class SchemesListComponent implements OnDestroy
{
    cols = 2;
    aspect = '4:5';
    private readonly disposed = new Subject<boolean>();
    readonly schemes$: Observable<PublicScheme[]>;
    protected readonly _mediaSub: Subscription;
    @HostBinding('class.show-loading') isLoading = false;

    constructor(
        media: ObservableMedia,
        env: SideService,
        @Inject('MEDIA') @Optional() lastMedia: string | null,
        protected readonly store$: Store<SchemesRootState>)
    {
        this.schemes$ = store$.pipe(select(s => s.SCHEMES.schemes.data));
        const self = this;
        store$.pipe(
            select(x => x.SCHEMES.schemes.done),
            takeUntil(this.disposed)
        ).subscribe(done =>
        {
            self.isLoading = !done;
        });
        this._mediaSub = media.subscribe((change: MediaChange) =>
        {
            let mq = lastMedia || 'default';
            if (env.isBrowserSide && change.matches)
            {
                mq = change.mqAlias;
            }
            switch (mq)
            {
                case 'xs':
                    this.cols = 1;
                    this.aspect = '4:5';
                    break;

                case 'sm':
                    this.cols = 1;
                    this.aspect = '100:95';
                    break;

                case 'md':
                    this.cols = 2;
                    this.aspect = '6:7';
                    break;

                case 'lg':
                    this.cols = 2;
                    this.aspect = '6:7';
                    break;

                case 'xl':
                    this.cols = 3;
                    this.aspect = '95:100';
                    break;

                default:
                    this.cols = 2;
                    this.aspect = '95:100';
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
    }

    toggleSchemeFavorited(scheme: PublicScheme)
    {
        this.store$.dispatch(scheme.favorited
            ? new Act.RemoveSchemeFromFavorites(scheme)
            : new Act.AddSchemeToFavorites(scheme));
    }
}
