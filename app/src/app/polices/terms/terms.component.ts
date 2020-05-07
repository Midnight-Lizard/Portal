import { Component } from '@angular/core';
import { SettingsService, SideService } from 'core';

@Component({
    selector: 'ml-terms',
    templateUrl: './terms.component.html',
    styleUrls: ['./terms.component.scss']
})
export class TermsComponent
{
    readonly portalUrl: string;

    constructor(settings: SettingsService, env: SideService)
    {
        if (env.isBrowserSide)
        {
            this.portalUrl = window.location.host;
        }
        else
        {
            this.portalUrl = settings.getSettings().PORTAL_URL;
        }
    }
}
