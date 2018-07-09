import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material';

import { Screenshot } from '../../model/screenshot';
import { ScreenshotsComponent, ScreenshotDialogData } from '../screenshots/screenshots.component';

@Component({
    selector: 'schemes-thumbnails',
    templateUrl: './thumbnails.component.html',
    styleUrls: ['./thumbnails.component.scss']
})
export class ThumbnailsComponent
{
    @Input()
    screenshots: Screenshot[];

    constructor(private readonly dialog: MatDialog) { }

    expand(index: number = 0)
    {
        this.dialog.open(ScreenshotsComponent, {
            // maxHeight: '80%',
            maxWidth: '70%',
            data: {
                screenshots: this.screenshots,
                selectedIndex: index
            } as ScreenshotDialogData
        });
    }
}
