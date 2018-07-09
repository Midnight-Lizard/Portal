import { MAT_SNACK_BAR_DATA, MatSnackBarRef, MatBottomSheet } from '@angular/material';
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
    snackBarRef?: MatSnackBarRef<InfoBarComponent>;

    constructor(
        @Inject(MAT_SNACK_BAR_DATA)
        readonly msg: NotificationMessage,
        private readonly bottomSheet: MatBottomSheet,
        private readonly store$: Store<InfoRootState>)
    {
        const self = this;
        store$.pipe(
            select(x => x.INFO.notification.messages),
            takeUntil(this.disposed$),
            skip(1),
            take(1)
        ).subscribe(x => self.snackBarRef && self.snackBarRef.dismiss());
    }

    close()
    {
        this.dismissMessage();
        if (this.snackBarRef)
        {
            this.snackBarRef.dismiss();
        }
    }

    showDetails()
    {
        this.dismissMessage();
        const bottomSheetRef = this.bottomSheet.open(DetailsBarComponent, {
            data: this.msg
        });
        bottomSheetRef.instance.bottomSheetRef = bottomSheetRef;
        this.close();
    }

    private dismissMessage()
    {
        this.store$.dispatch(new DismissNotification(this.msg));
    }

    ngOnDestroy(): void
    {
        this.disposed$.next(true);
    }
}
