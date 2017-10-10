import "rxjs/add/operator/map";
import "rxjs/add/operator/groupBy";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/mergeMap";
import "rxjs/add/operator/switchMap";
import "rxjs/add/operator/throttleTime";
import "rxjs/add/operator/filter";
import "rxjs/add/operator/withLatestFrom";
import { of } from "rxjs/observable/of";
import { Observable } from "rxjs/Observable";
import { Injectable } from "@angular/core";
import { Effect, Actions } from '@ngrx/effects';
import { ActivatedRouteSnapshot, Params, Router } from "@angular/router";
import { RouterAction, ROUTER_NAVIGATION, RouterNavigationAction } from '@ngrx/router-store';
import { Store } from "@ngrx/store";

import { AppState, RootState } from "./app.state";
import { Action, ActionType } from "./app.action-sets";
import * as Act from "./app.actions";
import { AuthenticationService } from "../security/authentication.service";

@Injectable()
export class AppEffects
{
    constructor(
        protected readonly actions$: Actions<Action>,
        protected readonly store$: Store<RootState>,
        protected readonly router: Router,
        protected readonly auth: AuthenticationService
    ) { }

    @Effect() userSignedIn$ =
    this.actions$.ofType(ActionType.UserSignedIn).switchMap(act =>
    {
        if (act.payload.user.state && act.payload.user.state.returnUrl)
        {
            this.router.navigateByUrl(act.payload.user.state.returnUrl);
        }
        return of();
    });

    @Effect() userSignedOut$ =
    this.actions$.ofType(ActionType.UserSignedOut).switchMap(act =>
    {
        this.router.navigate(["/"]);
        return of();
    });

    @Effect() routerNavigated$ =
    this.actions$.ofType(ActionType.RouterNavigation)
        .filter(root => !/^sign.+/.test(root.payload.routerState.url))
        .switchMap(act =>
        {
            return of(new Act.RouterNavigated(act.payload));
        });

    @Effect() signinSilent$ =
    this.handleNavigation(/^(?!sign).+/, (route, state) => 
    {
        if (!state.user || state.user.expired)
        {
            return Observable.fromPromise(this.auth
                .signinSilent()
                .then(user =>
                {
                    if (user)
                    {
                        return new Act.UserSignedIn({ user: user });
                    }
                    return { type: "none" };
                })
                .catch(ex => new Act.SignInFailed({
                    error: { originalError: ex, source: ActionType.NavigationFailed }
                })))
        }
        return of();
    });

    @Effect() signin$ =
    this.handleNavigation(/signin/, (route, state) =>
    {
        return Observable.fromPromise(this.auth
            .signin(state.returnUrl)
            .catch(ex => new Act.SignInFailed({
                error: {
                    originalError: ex,
                    errorMessage: "Authentication failed",
                    source: ActionType.NavigationFailed
                }
            })));
    });

    @Effect() signout$ =
    this.handleNavigation(/signout/, (route, state) => Observable.fromPromise(this.auth
        .signout()
        .catch(ex => new Act.SignOutFailed({
            error: {
                originalError: ex,
                errorMessage: "Sign out failed",
                source: ActionType.NavigationFailed
            }
        }))));

    @Effect() signinCallback$ =
    this.handleNavigation(/signedin/, (route, state) => Observable.fromPromise(this.auth
        .signinCallback()
        .then(user => new Act.UserSignedIn({ user: user }))
        .catch(ex => new Act.SignInFailed({
            error: {
                originalError: ex,
                errorMessage: "Authentication failed",
                source: ActionType.NavigationFailed
            }
        }))));

    @Effect() signoutCallback$ =
    this.handleNavigation(/signedout/, (route, state) => Observable.fromPromise(this.auth
        .signoutCallback()
        .then(user => new Act.UserSignedOut())
        .catch(ex => new Act.SignOutFailed({
            error: {
                originalError: ex,
                errorMessage: "Sign out failed",
                source: ActionType.NavigationFailed
            }
        }))));

    private handleNavigation(section: RegExp,
        callback: (route: ActivatedRouteSnapshot, state: AppState) => Observable<any>)
    {
        const route$ = this.actions$.ofType(ActionType.RouterNavigation)
            .map(navAction => navAction.payload.routerState.root)
            .filter(root =>
            {
                return section.test(root.firstChild!.routeConfig!.path || "")
            });

        return route$.withLatestFrom(this.store$)
            .switchMap(([route, state]) => callback(route, state.ML))
            .catch(error => of(new Act.NavigationFailed({
                error: {
                    originalError: error, source: ActionType.RouterNavigation,
                    errorMessage: "Navigation has failed."
                }
            })));
    }
}