import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';
import { Component, Inject, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { skip, take, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { NotificationMessage, DismissNotification, InfoRootState } from 'core';
import { DetailsBarComponent } from '../details-bar/details-bar.component';

@Component({
    selector: 'ml-info-bar',
    templateUrl: './info-bar.component.html',
    styleUrls: ['./info-bar.component.scss']
})
export class InfoBarComponent implements OnDestroy
{
    private readonly disposed$ = new Subject<boolean>();

    constructor(
        @Inject(MAT_SNACK_BAR_DATA)
        readonly msg: NotificationMessage,
        snackBarRef: MatSnackBarRef<InfoBarComponent>,
        private readonly bottomSheet: MatBottomSheet,
        private readonly store$: Store<InfoRootState>)
    {
        store$.pipe(
            select(x => x.INFO.notification.messages),
            takeUntil(this.disposed$),
            skip(1),
            take(1)
        ).subscribe(x => snackBarRef.dismiss());
    }

    showMessageDetails()
    {
        this.dismissMessage();
        this.bottomSheet.open(DetailsBarComponent, {
            data: this.msg
        });
    }

    dismissMessage()
    {
        this.store$.dispatch(new DismissNotification(this.msg));
    }

    ngOnDestroy(): void
    {
        this.disposed$.next(true);
    }
}
