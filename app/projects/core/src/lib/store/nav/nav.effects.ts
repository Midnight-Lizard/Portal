import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { of, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { NavAction, NavActionTypes } from './nav.action-sets';
import * as NavActions from './nav.actions';

@Injectable()
export class NavEffects
{
    constructor(
        protected readonly actions$: Actions<NavAction, typeof NavActions>
    ) { }


    @Effect() routerNavigated$ = this.actions$.ofType(NavActionTypes.RouterNavigation).pipe(
        switchMap(act =>
        {
            return of(new NavActions.RouterNavigated(act.payload));
        }));
}
