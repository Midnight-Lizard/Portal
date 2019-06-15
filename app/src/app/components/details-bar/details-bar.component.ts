import { Component, Inject } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';

import { NotificationMessage } from 'core';

@Component({
    selector: 'ml-details-bar',
    templateUrl: './details-bar.component.html',
    styleUrls: ['./details-bar.component.scss'],
})
export class DetailsBarComponent
{
    public readonly lineBreaksRegExp = /\\n|\\r|<br\/>/g;

    constructor(
        @Inject(MAT_BOTTOM_SHEET_DATA)
        readonly msg: NotificationMessage,
        private readonly bottomSheetRef: MatBottomSheetRef<DetailsBarComponent, boolean>) { }

    close()
    {
        this.bottomSheetRef.dismiss();
    }

}
