import { Actions, ofType } from '@ngrx/effects';
import { ActivatedRouteSnapshot, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { of, Observable, ObservableInput } from 'rxjs';
import { switchMap, filter, map, withLatestFrom, catchError } from 'rxjs/operators';

import { NavAction, NavActionTypes } from './nav.action-sets';
import * as NavActions from './nav.actions';
import { ActionsUnion, ActionsModule } from '../strong-actions';

export interface IStateSelector<TRootState, TState>
{
    // tslint:disable-next-line:callable-types
    (rootState: TRootState): TState;
}

export interface INavigationCallback<TState, TResult>
{
    // tslint:disable-next-line:callable-types
    (route: ActivatedRouteSnapshot, state: TState): ObservableInput<TResult>;
}

export function createNavigationHandler<
    TAction extends ActionsUnion<TModule>,
    TModule extends ActionsModule,
    TRootState, TState>(
        actions$: Actions<TAction>,
        store$: Store<TRootState>,
        stateSelector: IStateSelector<TRootState, TState>)
{
    return <TResult>(section: RegExp, callback: INavigationCallback<TState, TResult>) =>
    {
        const route$ = (actions$ as any as Actions<NavAction>)
            .pipe(
                ofType(NavActionTypes.RouterNavigation),
                filter(navAction =>
                {
                    return section.test(navAction.payload.routerState.url);
                }),
                map(navAction => navAction.payload.routerState.root));

        return route$.pipe(
            withLatestFrom(store$),
            switchMap(([route, state]) => callback(route, stateSelector(state))),
            catchError(error => of(new NavActions.NavigationFailed({ error }))));
    };
}

