import { Component } from '@angular/core';
import { SettingsService } from 'core';

@Component({
    selector: 'ml-extension-privacy',
    templateUrl: './extension-privacy.component.html',
    styleUrls: ['./extension-privacy.component.scss']
})
export class ExtensionPrivacyComponent
{
    readonly portalUrl: string;

    constructor(private readonly settings: SettingsService)
    {
        this.portalUrl = settings.getSettings().PORTAL_URL;
    }
}
