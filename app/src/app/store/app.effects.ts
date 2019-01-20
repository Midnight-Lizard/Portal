import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { of, Observable } from 'rxjs';
import { switchMap, filter, map, withLatestFrom, catchError } from 'rxjs/operators';

import { AppState, RootState } from './app.state';
import { AppAction, AppActionTypes } from './app.action-sets';
import * as AppActions from './app.actions';

@Injectable()
export class AppEffects
{
    constructor(
        protected readonly actions$: Actions<AppAction>,
        protected readonly store$: Store<RootState>,
        protected readonly router: Router
    ) { }
}
