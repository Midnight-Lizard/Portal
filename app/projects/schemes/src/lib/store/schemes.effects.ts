import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of, Observable, merge } from 'rxjs';
import { switchMap, filter, map, withLatestFrom, catchError } from 'rxjs/operators';
import
{
    createNavigationHandler, NotifyUser, NotificationLevel, AuthRootState,
    NavigationFailed, NotificationAction, MetaService, ActionButtonType,
    ActionColor, ImpressionAction, ImpressionType, ImpressionsObjectType
} from 'core';
import { SchemesState, SchemesRootState } from './schemes.state';
import { SchemesAction, SchemesActionTypes as SchActTypes } from './schemes.action-sets';
import * as SchActs from './schemes.actions';
import { SchemesService } from '../backend/schemes.service';
import { getFiltersFromRoute, filtersAreEqual } from '../model/schemes-filters';
import { getSchemesListFromRoute } from '../model/schemes-lists';
import { getSchemesIdFromRoute } from '../model/public-scheme';

import { ImpressionsService } from 'core';

const signinAction: NotificationAction[] = [{
    route: '/signin',
    infoTitle: 'SIGN IN',
    detailsTitle: 'SIGN IN',
    description: 'Sign in or create a new user'
}];

@Injectable()
export class SchemesEffects
{
    private readonly handleNavigation = createNavigationHandler(
        this.actions$, this.store$, (store) => store.SCHEMES.schemes);

    constructor(
        private readonly actions$: Actions<SchemesAction>,
        private readonly store$: Store<SchemesRootState & AuthRootState>,
        private readonly schSvc: SchemesService,
        private readonly meta: MetaService,
        private readonly impressions: ImpressionsService
    ) { }

    @Effect()
    currentSchemeChangeRequested$ = this.actions$.pipe(
        ofType(SchActTypes.CurrentSchemeChangeRequested),
        withLatestFrom(this.store$),
        switchMap(([event, store]) => this.schSvc.getPublicSchemeDetails(event.payload.id, store.AUTH.user).pipe(
            map(scheme => new SchActs.CurrentSchemeChanged({ currentScheme: scheme })),
            catchError(error => of(new NotifyUser({
                message: 'Failed to retrieve color scheme details',
                correlationId: event.payload.id,
                level: NotificationLevel.Error,
                isLocal: true,
                data: error,
                actions: [{
                    infoTitle: 'RETRY',
                    detailsTitle: 'RETRY',
                    description: 'Retry to open color scheme details',
                    infoButtonType: ActionButtonType.Raised,
                    detailsButtonType: ActionButtonType.Raised,
                    color: ActionColor.Accent,
                    route: `schemes/index/${store.SCHEMES.schemes.list}/${event.payload.id}`,
                    queryParamsHandling: 'preserve'
                }]
            })))))
    );

    @Effect()
    onDetailsNavigated$ = this.handleNavigation(/schemes\/index\/\w+\/[^?]/, (route, state) =>
    {
        const schemeId = getSchemesIdFromRoute(route);
        if (schemeId && (!state.currentScheme || state.currentScheme.id !== schemeId))
        {
            return of(new SchActs.CurrentSchemeChangeRequested({ id: schemeId }));
        }
        return of();
    });

    @Effect()
    onSearchNavigated$ = this.handleNavigation(/schemes\/index/, (route, state) =>
    {
        const filters = getFiltersFromRoute(route),
            list = getSchemesListFromRoute(route);
        if (list !== state.list || !filtersAreEqual(filters, state.filters))
        {
            return of(new SchActs.SchemesSearchChanged({
                filters: filters,
                list: list
            }));
        }
        return of();
    });

    @Effect()
    onSearchChanged$ = this.actions$.pipe(
        ofType(SchActTypes.SchemesSearchChanged),
        withLatestFrom(this.store$),
        switchMap(([act, state]) => this.schSvc.getPublicSchemes(
            act.payload.filters, act.payload.list, 10, state.AUTH.user, null).pipe(
                map(result => new SchActs.FirstSchemesChunkLoaded({
                    cursor: result.cursor,
                    data: result.results,
                    done: result.done
                })),
                catchError(error => of(new NotifyUser({
                    message: 'Failed to retrieve color schemes',
                    level: NotificationLevel.Error,
                    isLocal: true,
                    data: error
                })))
            )
        )
    );

    @Effect()
    loadNextChunk$ = this.actions$.pipe(
        ofType(SchActTypes.LoadNextSchemesChunk),
        withLatestFrom(this.store$),
        switchMap(([act, state]) => this.schSvc.getPublicSchemes(
            state.SCHEMES.schemes.filters, state.SCHEMES.schemes.list, 10,
            state.AUTH.user, state.SCHEMES.schemes.cursor).pipe(
                map(result => new SchActs.NextSchemesChunkLoaded({
                    cursor: result.cursor,
                    data: result.results,
                    done: result.done
                })),
                catchError(error => of(new NotifyUser({
                    message: 'Failed to retrieve more color schemes',
                    level: NotificationLevel.Error,
                    isLocal: true,
                    data: error
                })))
            ))
    );

    @Effect()
    likeScheme$ = this.actions$.pipe(
        ofType(SchActTypes.LikeScheme),
        withLatestFrom(this.store$),
        switchMap(([act, state]) =>
        {
            if (state.AUTH && state.AUTH.user)
            {
                return this.impressions.perform({
                    action: ImpressionAction.Add,
                    user: state.AUTH.user,
                    type: ImpressionType.Likes,
                    object: {
                        ObjectType: ImpressionsObjectType.PublicScheme,
                        AggregateId: act.payload.id
            }
                }).pipe(
                    map(correlationId => new SchActs.SchemeLiked({
                        correlationId, id: act.payload.id
                    })),
                    catchError(error => [
                    new SchActs.LikeSchemeFailed(act.payload),
                    new NotifyUser({
                        message: 'Failed to add a like to a color scheme',
                        level: NotificationLevel.Error,
                        isLocal: true, data: error
                    })]));
            }
            return [
                new SchActs.LikeSchemeFailed(act.payload),
                new NotifyUser({
                    message: 'Please sign in to be able to like color schemes',
                    level: NotificationLevel.Info,
                    isLocal: true,
                    actions: signinAction
                })];
        })
    );

    @Effect()
    dislikeScheme$ = this.actions$.pipe(
        ofType(SchActTypes.DislikeScheme),
        withLatestFrom(this.store$),
        switchMap(([act, state]) =>
        {
            if (state.AUTH && state.AUTH.user)
            {
                return this.impressions.perform({
                    action: ImpressionAction.Remove,
                    user: state.AUTH.user,
                    type: ImpressionType.Likes,
                    object: {
                        ObjectType: ImpressionsObjectType.PublicScheme,
                        AggregateId: act.payload.id
                    }
                }).pipe(
                    map(correlationId => new SchActs.SchemeDisliked({
                        correlationId, id: act.payload.id
                    })),
                    catchError(error => [
                    new SchActs.DislikeSchemeFailed(act.payload),
                    new NotifyUser({
                        message: 'Failed to remove a like from a color scheme',
                        level: NotificationLevel.Error,
                        isLocal: true, data: error
                    })]));
            }
            return [
                new SchActs.DislikeSchemeFailed(act.payload),
                new NotifyUser({
                    message: 'Please sign in to be able to manage your likes',
                    level: NotificationLevel.Info,
                    isLocal: true,
                    actions: signinAction
                })];
        })
    );

    @Effect()
    addSchemeToFavorites$ = this.actions$.pipe(
        ofType(SchActTypes.AddSchemeToFavorites),
        withLatestFrom(this.store$),
        switchMap(([act, state]) =>
        {
            if (state.AUTH && state.AUTH.user)
            {
                return this.impressions.perform({
                    action: ImpressionAction.Add,
                    user: state.AUTH.user,
                    type: ImpressionType.Favorites,
                    object: {
                        ObjectType: ImpressionsObjectType.PublicScheme,
                        AggregateId: act.payload.id
                    }
                }).pipe(
                    map(correlationId => new SchActs.SchemeAddedToFavorites({
                        correlationId, id: act.payload.id
                    })),
                    catchError(error => [
                    new SchActs.AddSchemeToFavoritesFailed(act.payload),
                    new NotifyUser({
                        message: 'Failed to add a color scheme to your favorites',
                        level: NotificationLevel.Error,
                        isLocal: true, data: error
                    })]));
            }
            return [
                new SchActs.AddSchemeToFavoritesFailed(act.payload),
                new NotifyUser({
                    message: 'Please sign in to be able to manage your favorites',
                    level: NotificationLevel.Info,
                    isLocal: true,
                    actions: signinAction
                })];
        })
    );

    @Effect()
    removeSchemeFromFavorites$ = this.actions$.pipe(
        ofType(SchActTypes.RemoveSchemeFromFavorites),
        withLatestFrom(this.store$),
        switchMap(([act, state]) =>
        {
            if (state.AUTH && state.AUTH.user)
            {
                return this.impressions.perform({
                    action: ImpressionAction.Remove,
                    user: state.AUTH.user,
                    type: ImpressionType.Likes,
                    object: {
                        ObjectType: ImpressionsObjectType.PublicScheme,
                        AggregateId: act.payload.id
                    }
                }).pipe(
                    map(correlationId => new SchActs.SchemeRemovedFromFavorites({
                        correlationId, id: act.payload.id
                    })),
                    catchError(error => [
                    new SchActs.RemoveSchemeFromFavoritesFailed(act.payload),
                    new NotifyUser({
                        message: 'Failed to remove a color scheme from your favorites',
                        level: NotificationLevel.Error,
                        isLocal: true, data: error
                    })]));
            }
            return [
                new SchActs.RemoveSchemeFromFavoritesFailed(act.payload),
                new NotifyUser({
                    message: 'Please sign in to be able to manage your favorites',
                    level: NotificationLevel.Info,
                    isLocal: true,
                    actions: signinAction
                })];
        })
    );
}
