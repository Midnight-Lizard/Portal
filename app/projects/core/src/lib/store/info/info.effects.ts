import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';

import { InfoRootState } from './info.state';
import { InfoAction } from './info.action-sets';

@Injectable()
export class InfoEffects
{
    private readonly refreshInterval: number;
    constructor(
        protected readonly actions$: Actions<InfoAction>,
        protected readonly store$: Store<InfoRootState>)
    {
    }
}
