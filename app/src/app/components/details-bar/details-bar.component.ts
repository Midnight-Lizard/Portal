import { Component, Inject } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material';

import { NotificationMessage } from 'core';

@Component({
    selector: 'ml-details-bar',
    templateUrl: './details-bar.component.html',
    styleUrls: ['./details-bar.component.scss']
})
export class DetailsBarComponent
{
    bottomSheetRef?: MatBottomSheetRef<DetailsBarComponent, boolean>;

    constructor(
        @Inject(MAT_BOTTOM_SHEET_DATA)
        readonly msg: NotificationMessage) { }

    close()
    {
        if (this.bottomSheetRef)
        {
            this.bottomSheetRef.dismiss();
        }
    }

}
