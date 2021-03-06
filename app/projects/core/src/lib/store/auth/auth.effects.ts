﻿import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of, interval, Observable, timer } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';

import { AuthRootState } from './auth.state';
import { AuthAction, AuthActionTypes } from './auth.action-sets';
import * as AuthActions from './auth.actions';
import { AuthService } from '../../auth/auth.service';
import { SettingsService } from '../../settings/settings.service';
import { Settings } from '../../settings/settings';
import { InfoActionTypes } from '../info/info.action-sets';
import { NotifyUser } from '../info/info.actions';
import { NotificationLevel } from '../info/info.state';

@Injectable()
export class AuthEffects
{
    private readonly userRefreshInterval: number;
    private readonly systemRefreshInterval: number;
    constructor(
        protected readonly actions$: Actions<AuthAction>,
        protected readonly store$: Store<AuthRootState>,
        protected readonly auth: AuthService,
        protected readonly settingsService: SettingsService)
    {
        const settings = this.settingsService.getSettings();
        this.userRefreshInterval = +settings.PORTAL_USER_AUTH_REFRESH_INTERVAL;
        this.systemRefreshInterval = +settings.PORTAL_SYSTEM_AUTH_REFRESH_INTERVAL;
    }

    @Effect() refreshUser$ = this.actions$.pipe(
        ofType(AuthActionTypes.RefreshUser),
        switchMap(act => timer(act.payload.immediately ? 0 : this.userRefreshInterval, this.userRefreshInterval)),
        switchMap(i => this.auth.refreshUser().pipe(
            map(user => new AuthActions.UserChanged(user)),
            catchError(error =>
            {
                return [
                    new AuthActions.UserChanged(null),
                    new NotifyUser({
                        message: 'Failed to refresh user tokens',
                        level: NotificationLevel.Error,
                        isLocal: true,
                        data: error
                    })
                ];
            })
        ))
    );

    @Effect() refreshSystem$ = this.actions$.pipe(
        ofType(AuthActionTypes.RefreshSystem),
        switchMap(act => timer(act.payload.immediately ? 0 : this.systemRefreshInterval, this.systemRefreshInterval)),
        switchMap(i => this.auth.refreshSystem().pipe(
            map(system => new AuthActions.SystemChanged(system)),
            catchError(error =>
            {
                return [
                    new AuthActions.SystemChanged(null),
                    new NotifyUser({
                        message: 'Failed to refresh system tokens',
                        level: NotificationLevel.Error,
                        isLocal: true,
                        data: error
                    })
                ];
            })
        ))
    );
}
