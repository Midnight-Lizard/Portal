import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { SettingsService } from '../settings/settings.service';
import { UserImpression } from './impression';
import { empty, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ImpressionsServiceStub
{
    nextResult: Observable<any> = empty();

    constructor() { }

    public perform(impression: UserImpression)
    {
        return this.nextResult;
    }
}
