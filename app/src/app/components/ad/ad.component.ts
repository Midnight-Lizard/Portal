import { Component, ViewEncapsulation } from '@angular/core';
import { SideService } from 'core';

@Component({
    selector: 'ml-ad',
    templateUrl: './ad.component.html',
    styleUrls: ['./ad.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class AdComponent
{
    readonly scriptAttributes = { id: '_carbonads_js' };

    constructor(readonly env: SideService) { }
}
