import { Component, OnDestroy, TrackByFunction, HostBinding } from '@angular/core';
import { ObservableMedia, MediaChange } from '@angular/flex-layout';
import { Store, select } from '@ngrx/store';
import { Subscription, Observable, Subject } from 'rxjs';

import { SchemesFeatureState, SchemesRootState } from '../../store/schemes.state';
import { PublicScheme as SchemeEntry } from '../../model/public-scheme';
import * as Act from '../../store/schemes.actions';
import { takeUntil } from 'rxjs/operators';

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
    readonly schemes$: Observable<SchemeEntry[] | undefined>;
    protected readonly _mediaSub: Subscription;
    @HostBinding('class.show-loading') isLoading = false;

    constructor(media: ObservableMedia,
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
            switch (change.mqAlias)
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
                    this.aspect = '95:100';
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

    trackById: TrackByFunction<SchemeEntry> = (index, item) => item ? item.id : null;

    onScroll()
    {
        this.store$.dispatch(new Act.LoadNextSchemesChunk());
    }
}
