import { Component } from '@angular/core';
import { SettingsService, SideService } from 'core';

@Component({
    selector: 'ml-privacy',
    templateUrl: './privacy.component.html',
    styleUrls: ['./privacy.component.scss']
})
export class PrivacyComponent
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
