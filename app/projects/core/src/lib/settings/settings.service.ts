import { TransferState, makeStateKey } from '@angular/platform-browser';
import { Injectable, Inject, Optional } from '@angular/core';

import { Settings, defaultSettings } from './settings';

@Injectable({
    providedIn: 'root'
})
export class SettingsService
{
    private readonly settingsKey = makeStateKey<Settings>('settings');

    constructor(state: TransferState,
        @Inject('SETTINGS') @Optional()
        private settings: Settings | null)
    {
        if (settings)
        {
            state.set(this.settingsKey, settings);
        }
        else
        {
            this.settings = state.get(this.settingsKey, defaultSettings);
        }
    }

    public getSettings(): Settings
    {
        return { ...this.settings! };
    }
}
