import { RouterStateSnapshot } from '@angular/router';
import
{
    RouterNavigationAction,
    RouterNavigationPayload,
    ROUTER_NAVIGATION
} from '@ngrx/router-store';

import { ActionError } from './nav.state';

export declare interface ActionErrorPayload { error: ActionError; }

export class RouterNavigation implements RouterNavigationAction
{
    readonly type = ROUTER_NAVIGATION;
    readonly payload: RouterNavigationPayload<RouterStateSnapshot>;
    constructor() { }
}

export class RouterNavigated
{
    readonly type = 'RouterNavigated';
    constructor(readonly payload: RouterNavigationPayload<RouterStateSnapshot>) { }
}

export class NavigationFailed
{
    readonly type = 'NavigationFailed';
    constructor(readonly payload: ActionErrorPayload) { }
}
