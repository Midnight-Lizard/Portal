import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { SettingsService } from '../settings/settings.service';
import { UserImpression } from './impression';
import { Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ImpressionsServiceStub
{
    nextResult: Observable<string> = of('correlation-id');

    constructor() { }

    public perform(impression: UserImpression)
    {
        return this.nextResult;
    }
}
