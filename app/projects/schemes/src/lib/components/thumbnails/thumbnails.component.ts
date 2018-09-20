import { Component, OnInit, Input } from '@angular/core';

import { Screenshot } from '../../model/screenshot';

@Component({
    selector: 'schemes-thumbnails',
    templateUrl: './thumbnails.component.html',
    styleUrls: ['./thumbnails.component.scss']
})
export class SchemesThumbnailsComponent
{
    @Input()
    screenshots: Screenshot[];

    constructor() { }
}
