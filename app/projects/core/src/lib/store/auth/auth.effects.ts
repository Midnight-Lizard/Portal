import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { ofType } from '@ngrx/effects';
import { of, interval, Observable, timer } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';

import { AuthRootState } from './auth.state';
import { AuthAction, AuthActionTypes } from './auth.action-sets';
import * as AuthActions from './auth.actions';
import { AuthService } from '../../auth/auth.service';
import { SettingsService } from '../../settings/settings.service';
import { Settings } from '../../settings/settings';

@Injectable()
export class AuthEffects
{
    private readonly refreshInterval: number;
    constructor(
        protected readonly actions$: Actions<AuthAction, typeof AuthActions>,
        protected readonly store$: Store<AuthRootState>,
        protected readonly auth: AuthService,
        protected readonly settingsService: SettingsService)
    {
        this.refreshInterval = +this.settingsService.getSettings().PORTAL_AUTH_REFRESH_INTERVAL;
    }

    @Effect() refreshUser$ = this.actions$.ofType(AuthActionTypes.RefreshUser).pipe(
        switchMap(act => timer(act.payload.immediately ? 0 : this.refreshInterval, this.refreshInterval)),
        switchMap(i => this.auth.refreshUser()),
        map(user => new AuthActions.UserChanged({ user })),
        catchError(error =>
        {
            console.error(error);
            return of(new AuthActions.UserChanged({ user: null }));
        })
    );
}
