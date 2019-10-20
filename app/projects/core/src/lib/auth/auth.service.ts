import { Injectable, Inject, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { first, delay } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';

import { User } from './user';
import { System } from './system';
import { AuthRootState } from '../store/auth/auth.state';
import * as AuthActions from '../store/auth/auth.actions';
import { SideService } from '../side/side.service';
import { AuthConstants } from './auth.constants';
import { SettingsService } from '../settings/settings.service';
import { ConsentCookieService } from '../consent/consent-cookie.service';

@Injectable({
    providedIn: 'root'
})
export class AuthService
{
    constructor(
        @Inject('ORIGIN_URL')
        private readonly baseUrl: string,
        private readonly http: HttpClient,
        cookieService: ConsentCookieService,
        settingsService: SettingsService,
        env: SideService,
        store$: Store<AuthRootState>)
    {
        const settings = env.isBrowserSide && settingsService.getSettings();
        if (settings &&
            settings.USE_AUTH === true.toString() &&
            settings.IS_STAND_ALONE !== true.toString())
        {
            store$.pipe(
                select(x => x.AUTH.user),
                delay(1000),
                first())
                .subscribe(user =>
                {
                    if (user || cookieService.get(AuthConstants.Cookies.SignedIn) === 'true')
                    {
                        store$.dispatch(new AuthActions.RefreshUser({ immediately: !user || user.expired }));
                    }
                });

            store$.pipe(
                select(x => x.AUTH.system),
                delay(1000),
                first())
                .subscribe(system =>
                {
                    store$.dispatch(new AuthActions.RefreshSystem({ immediately: !system }));
                });
        }
    }

    public refreshUser(): Observable<User>
    {
        return this.http.post<User>(this.urlJoin(this.baseUrl, 'refresh-user'), null);
    }

    public refreshSystem(): Observable<System>
    {
        return this.http.post<System>(this.urlJoin(this.baseUrl, 'refresh-system'), null);
    }

    private urlJoin(...urlParts: string[])
    {
        return urlParts.map(p => p.replace(/^\/|\/$/g, '').trim()).join('/');
    }
}
