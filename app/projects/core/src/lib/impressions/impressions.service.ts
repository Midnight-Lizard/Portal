import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { SettingsService } from '../settings/settings.service';
import { UserImpression } from './impression';

const apiVersion = '1.0';
const schemaVersion = '10.2.0';

@Injectable({
    providedIn: 'root'
})
export class ImpressionsService
{
    private readonly commanderUrl: string;
    constructor(
        private readonly http: HttpClient,
        private readonly settings: SettingsService)
    {
        this.commanderUrl = this.settings.getSettings().IMPRESSIONS_COMMANDER_URL;
    }

    public perform(impression: UserImpression)
    {
        const headers = new HttpHeaders()
            .set('Authorization', `Bearer ${impression.user.access_token}`)
            .set('schema-version', schemaVersion)
            .set('api-version', apiVersion);

        return this.http.post<string>(
            this.urlJoin(this.commanderUrl, impression.type, impression.action),
            impression.object, { headers });
    }

    private urlJoin(...urlParts: string[])
    {
        return urlParts.map(p => p.replace(/^\/|\/$/g, '').trim()).join('/');
    }
}
