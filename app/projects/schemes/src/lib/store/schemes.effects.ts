import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { ActivatedRouteSnapshot, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { of, Observable } from 'rxjs';
import { switchMap, filter, map, withLatestFrom, catchError } from 'rxjs/operators';

import { createNavigationHandler, INavigationCallback, NavigationFailed } from 'core';
import { SchemesState, SchemesRootState } from './schemes.state';
import { SchemesAction, SchemesActionTypes as SchActTypes } from './schemes.action-sets';
import * as SchActs from './schemes.actions';
import { SchemesService } from '../backend/schemes.service';
import { getFiltersFromRoute } from '../model/schemes-filters';
import { getSchemesListFromRoute } from '../model/schemes-lists';

@Injectable()
export class SchemesEffects
{
    private readonly handleNavigation = createNavigationHandler(
        this.actions$, this.store$, (store) => store.SCHEMES.schemes);

    constructor(
        private readonly actions$: Actions<SchemesAction, typeof SchActs>,
        private readonly store$: Store<SchemesRootState>,
        private readonly schSvc: SchemesService
    ) { }

    @Effect()
    onSearchNavigated$ = this.handleNavigation(/schemes\/index/, (route, state) =>
    {
        return of(new SchActs.SchemesSearchChanged({
            filters: getFiltersFromRoute(route),
            list: getSchemesListFromRoute(route)
        }));
    });

    @Effect()
    onSearchChanged$ = this.actions$.ofType(SchActTypes.SchemesSearchChanged).pipe(
        switchMap(act => this.schSvc.getPublicSchemes(act.payload.filters, 10, null)),
        map(result => new SchActs.FirstSchemesChunkLoaded(result))
    );

    @Effect()
    loadNextChunk$ = this.actions$.ofType(SchActTypes.LoadNextSchemesChunk).pipe(
        withLatestFrom(this.store$),
        switchMap(([act, state]) => this.schSvc.getPublicSchemes(state.SCHEMES.schemes.filters, 10, state.SCHEMES.schemes.cursor)),
        map(result => new SchActs.NextSchemesChunkLoaded(result))
    );
}
