import { ActivatedRouteSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { of, Observable } from 'rxjs';
import { switchMap, filter, map } from 'rxjs/operators';

import { NavAction, NavActionTypes } from './nav.action-sets';
import * as NavActions from './nav.actions';
import { NotifyUser } from '../info/info.actions';
import { NotificationLevel } from '../info/info.state';
import { MetaService } from '../../meta/meta.service';

@Injectable()
export class NavEffects
{
    constructor(
        private readonly actions$: Actions<NavAction>,
        private readonly metaService: MetaService
    ) { }

    @Effect() refreshUser$ = this.actions$.pipe(
        ofType(NavActionTypes.NavigationFailed),
        switchMap(user => of(new NotifyUser({
            message: 'Navigation has failed',
            level: NotificationLevel.Error,
            isLocal: true,
            data: user.payload.error
        })))
    );

    @Effect() handleNavigation$ = this.actions$.pipe(
        ofType(NavActionTypes.RouterNavigation),
        map(act =>
        {
            this.metaService.updatePageMetaData(this.getLastChild(act.payload.routerState.root).data || {});
            return act;
        }),
        filter(act => !this.getLastChild(act.payload.routerState.root).data.ephemeral),
        map(act => new NavActions.ReturnUrlChanged({
            returnUrl: act.payload.routerState.url
        }))
    );

    private getLastChild(route: ActivatedRouteSnapshot): ActivatedRouteSnapshot
    {
        if (route.firstChild)
        {
            return this.getLastChild(route.firstChild);
        }
        return route;
    }
}
