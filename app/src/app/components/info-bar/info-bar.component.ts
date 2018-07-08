import { Component, Inject } from '@angular/core';
import { NotificationMessage, NotificationLevel } from 'core';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef, MatBottomSheet } from '@angular/material';
import { DetailsBarComponent } from '../details-bar/details-bar.component';

@Component({
    selector: 'ml-info-bar',
    templateUrl: './info-bar.component.html',
    styleUrls: ['./info-bar.component.scss']
})
export class InfoBarComponent
{
    snackBarRef?: MatSnackBarRef<InfoBarComponent>;

    constructor(
        @Inject(MAT_SNACK_BAR_DATA)
        readonly msg: NotificationMessage,
        private readonly bottomSheet: MatBottomSheet)
    {
    }

    close()
    {
        if (this.snackBarRef)
        {
            this.snackBarRef.dismiss();
        }
    }

    showDetails()
    {
        const bottomSheetRef = this.bottomSheet.open(DetailsBarComponent, {
            data: this.msg
        });
        bottomSheetRef.instance.bottomSheetRef = bottomSheetRef;
        this.close();
    }
}
