import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

import { Screenshot } from '../../model/screenshot';

export interface ScreenshotDialogData
{
    readonly screenshots: Screenshot[];
    readonly selectedIndex: number;
}

@Component({
    selector: 'schemes-screenshots',
    templateUrl: './screenshots.component.html',
    styleUrls: ['./screenshots.component.scss']
})
export class ScreenshotsComponent
{
    constructor(
        @Inject(MAT_DIALOG_DATA)
        readonly data: ScreenshotDialogData) { }
}
