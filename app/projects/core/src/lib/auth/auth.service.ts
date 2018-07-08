import { Injectable, Inject, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { first, delay } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';

import { User } from './user';
import { AuthRootState } from '../store/auth/auth.state';
import * as AuthActions from '../store/auth/auth.actions';
import { SideService } from '../side.service';
import { AuthConstants } from './auth.constants';

@Injectable({
    providedIn: 'root'
})
export class AuthService
{
    constructor(
        @Inject('ORIGIN_URL')
        private readonly baseUrl: string,
        private readonly http: HttpClient,
        cookieService: CookieService,
        env: SideService,
        store$: Store<AuthRootState>)
    {
        if (env.isBrowserSide)
        {
            store$.pipe(
                select(x => x.AUTH.user),
                delay(1000),
                first())
                .subscribe(user =>
                {
                    if (user || cookieService.get(AuthConstants.Cookies.SignedIn) === 'true')
                    {
                        store$.dispatch(new AuthActions.RefreshUser({ immediately: !user }));
                    }
                });
        }
    }

    public refreshUser(): Observable<User>
    {
        return this.http.post<User>(this.urlJoin(this.baseUrl, 'refresh-user'), null);
    }

    private urlJoin(...urlParts: string[])
    {
        return urlParts.map(p => p.replace(/^\/|\/$/g, '').trim()).join('/');
    }
}
