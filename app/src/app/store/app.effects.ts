import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { ActivatedRouteSnapshot, Params, Router } from '@angular/router';
import { RouterAction, ROUTER_NAVIGATION, RouterNavigationAction } from '@ngrx/router-store';
import { Store } from '@ngrx/store';
import { ofType } from '@ngrx/effects';
import { of, from, Observable } from 'rxjs';
import { switchMap, filter, map, withLatestFrom, catchError } from 'rxjs/operators';

import { AppState, RootState } from './app.state';
import { Action, ActionType } from './app.action-sets';
import * as Act from './app.actions';
import { AuthService } from 'core';

@Injectable()
export class AppEffects
{
    constructor(
        protected readonly actions$: Actions<Action>,
        protected readonly store$: Store<RootState>,
        protected readonly router: Router,
        protected readonly auth: AuthService
    ) { }

    @Effect() userSignedIn$ = this.actions$.pipe(
        ofType(ActionType.UserSignedIn),
        switchMap(act =>
        {
            if (act.payload.user.state && act.payload.user.state.returnUrl)
            {
                this.router.navigateByUrl(act.payload.user.state.returnUrl);
            }
            return of();
        }));

    @Effect() userSignedOut$ = this.actions$.pipe(
        ofType(ActionType.UserSignedOut),
        switchMap(act =>
        {
            this.router.navigate(['/']);
            return of();
        }));

    @Effect() routerNavigated$ = this.actions$.pipe(
        ofType(ActionType.RouterNavigation),
        filter(root => !/^sign.+/.test(root.payload.routerState.url)),
        switchMap(act =>
        {
            return of(new Act.RouterNavigated(act.payload));
        }));

    @Effect() signinSilent$ =
        this.handleNavigation(/^(?!sign).+/, (route, state) =>
        {
            if (!state.user || state.user.expired)
            {
                return from(this.auth
                    .signinSilent()
                    .then(user =>
                    {
                        if (user)
                        {
                            return new Act.UserSignedIn({ user: user });
                        }
                        return { type: 'none' };
                    })
                    .catch(ex => new Act.SignInFailed({
                        error: { originalError: ex, source: ActionType.NavigationFailed }
                    })));
            }
            return of();
        });

    @Effect() signin$ =
        this.handleNavigation(/signin/, (route, state) =>
        {
            return from(this.auth
                .signin(state.returnUrl)
                .catch(ex => new Act.SignInFailed({
                    error: {
                        originalError: ex,
                        errorMessage: 'Authentication failed',
                        source: ActionType.NavigationFailed
                    }
                })));
        });

    @Effect() signout$ =
        this.handleNavigation(/signout/, (route, state) => from(this.auth
            .signout()
            .catch(ex => new Act.SignOutFailed({
                error: {
                    originalError: ex,
                    errorMessage: 'Sign out failed',
                    source: ActionType.NavigationFailed
                }
            }))));

    @Effect() signinCallback$ =
        this.handleNavigation(/signedin/, (route, state) => from(this.auth
            .signinCallback()
            .then(user => new Act.UserSignedIn({ user: user }))
            .catch(ex => new Act.SignInFailed({
                error: {
                    originalError: ex,
                    errorMessage: 'Authentication failed',
                    source: ActionType.NavigationFailed
                }
            }))));

    @Effect() signoutCallback$ =
        this.handleNavigation(/signedout/, (route, state) => from(this.auth
            .signoutCallback()
            .then(user => new Act.UserSignedOut())
            .catch(ex => new Act.SignOutFailed({
                error: {
                    originalError: ex,
                    errorMessage: 'Sign out failed',
                    source: ActionType.NavigationFailed
                }
            }))));

    private handleNavigation(section: RegExp,
        callback: (route: ActivatedRouteSnapshot, state: AppState) => Observable<any>)
    {
        const route$ = this.actions$.pipe(
            ofType(ActionType.RouterNavigation),
            map(navAction => navAction.payload.routerState.root),
            filter(root =>
            {
                if (root.firstChild && root.firstChild.routeConfig)
                {
                    return section.test(root.firstChild.routeConfig.path || '');
                }
                return false;
            }));

        return route$.pipe(
            withLatestFrom(this.store$),
            switchMap(([route, state]) => callback(route, state.ML)),
            catchError(error => of(new Act.NavigationFailed({
                error: {
                    originalError: error,
                    source: ActionType.RouterNavigation,
                    errorMessage: 'Navigation has failed.'
                }
            }))));
    }
}
