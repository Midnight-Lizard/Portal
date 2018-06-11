import { TransferState, makeStateKey } from '@angular/platform-browser';
import { Injectable } from '@angular/core';

import { Settings } from './settings';

@Injectable({
    providedIn: 'root'
})
export class SettingsService
{
    private readonly settingsKey = makeStateKey<Settings>('settings');

    constructor(private readonly state: TransferState)
    {
    }

    public getSettings()
    {
        return this.state.get(this.settingsKey, {
            identityUrl: 'http://192.168.1.47:7002'
        });
    }

    public setSettings(settings: Settings)
    {
        this.state.set(this.settingsKey, settings);
    }
}
