import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MatTabGroup } from '@angular/material';

import { Screenshot } from '../../model/screenshot';

@Component({
    selector: 'schemes-slider',
    templateUrl: './slider.component.html',
    styleUrls: ['./slider.component.scss']
})
export class SchemeSliderComponent
{
    @ViewChild('tabs', { static: true })
    tabs: MatTabGroup;

    @Input()
    screenshots: Screenshot[];

    constructor()
    {
    }

    goToNext()
    {
        this.tabs.selectedIndex = ((this.tabs.selectedIndex || 0) + 1) % (this.screenshots.length);
    }

    goToPrev()
    {
        this.tabs.selectedIndex = this.tabs.selectedIndex
            ? this.tabs.selectedIndex - 1
            : this.screenshots.length - 1;
    }
}
