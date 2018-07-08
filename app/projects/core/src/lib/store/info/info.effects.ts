import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of, interval, Observable, timer } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';

import { InfoRootState } from './info.state';
import { InfoAction, InfoActionTypes } from './info.action-sets';
import * as AuthActions from './info.actions';

@Injectable()
export class InfoEffects
{
    private readonly refreshInterval: number;
    constructor(
        protected readonly actions$: Actions<InfoAction, typeof AuthActions>,
        protected readonly store$: Store<InfoRootState>)
    {
    }
}
