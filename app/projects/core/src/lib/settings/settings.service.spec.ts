import { TestBed, inject } from '@angular/core/testing';
import { TransferState } from '@angular/platform-browser';

import { nameOfClass } from 'testing';
import { SettingsService } from './settings.service';
import { defaultSettings } from './settings';

describe(nameOfClass(SettingsService), () =>
{
    beforeEach(() =>
    {
        TestBed.configureTestingModule({
            providers: [SettingsService,
                {
                    provide: TransferState, useValue: new Map<string, any>([
                        ['settings', defaultSettings]])
                }]
        });
    });

    it('should be created', inject([SettingsService], (service: SettingsService) =>
    {
        expect(service).toBeTruthy();
    }));
});
