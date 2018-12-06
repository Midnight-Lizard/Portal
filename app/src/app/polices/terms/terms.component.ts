import { Component } from '@angular/core';
import { SettingsService } from 'core';

@Component({
    selector: 'ml-terms',
    templateUrl: './terms.component.html',
    styleUrls: ['./terms.component.scss']
})
export class TermsComponent
{
    readonly portalUrl: string;

    constructor(private readonly settings: SettingsService)
    {
        this.portalUrl = settings.getSettings().PORTAL_URL;
    }
}
