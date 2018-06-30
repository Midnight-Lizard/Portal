import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { ActivatedRouteSnapshot, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { of, Observable } from 'rxjs';
import { switchMap, filter, map, withLatestFrom, catchError } from 'rxjs/operators';

import { NavState, NavRootState } from './nav.state';
import { NavAction, NavActionTypes } from './nav.action-sets';
import * as NavActions from './nav.actions';

@Injectable()
export class NavEffects
{
    constructor(
        protected readonly actions$: Actions<NavAction, typeof NavActions>,
        protected readonly store$: Store<NavRootState>,
        protected readonly router: Router
    ) { }


    @Effect() routerNavigated$ = this.actions$.ofType(NavActionTypes.RouterNavigation).pipe(
        switchMap(act =>
        {
            return of(new NavActions.RouterNavigated(act.payload));
        }));


    private handleNavigation(section: RegExp,
        callback: (route: ActivatedRouteSnapshot, state: NavState) => Observable<any>)
    {
        const route$ = this.actions$.ofType(NavActionTypes.RouterNavigation).pipe(
            filter(navAction =>
            {
                return section.test(navAction.payload.routerState.url);
            }),
            map(navAction => navAction.payload.routerState.root));

        return route$.pipe(
            withLatestFrom(this.store$),
            switchMap(([route, state]) => callback(route, state.NAV.NAV)),
            catchError(error => of(new NavActions.NavigationFailed({
                error: {
                    originalError: error,
                    source: NavActionTypes.RouterNavigation,
                    errorMessage: 'Navigation has failed.'
                }
            }))));
    }
}
