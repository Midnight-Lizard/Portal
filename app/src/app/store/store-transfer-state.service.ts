import { Injectable, OnDestroy } from '@angular/core';
import { TransferState } from '@angular/platform-browser';
import { Store, select } from '@ngrx/store';
import { STORE_STATE_KEY } from './app.state';
import { Subscription } from 'rxjs';

@Injectable()
export class StoreTransferStateService implements OnDestroy
{
    private readonly storeSub: Subscription;
    constructor(state: TransferState, store$: Store<{}>)
    {
        this.storeSub = store$.pipe(select(x => x))
            .subscribe(store => state.set(STORE_STATE_KEY, store));
    }

    ngOnDestroy(): void
    {
        if (this.storeSub && typeof this.storeSub.unsubscribe === 'function')
        {
            this.storeSub.unsubscribe();
        }
    }
}
