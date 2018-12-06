import { Component } from '@angular/core';
import { SettingsService } from 'core';

@Component({
    selector: 'ml-privacy',
    templateUrl: './privacy.component.html',
    styleUrls: ['./privacy.component.scss']
})
export class PrivacyComponent
{
    readonly portalUrl: string;

    constructor(private readonly settings: SettingsService)
    {
        this.portalUrl = settings.getSettings().PORTAL_URL;
    }
}
