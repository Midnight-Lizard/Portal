import { RouterStateSnapshot } from '@angular/router';
import
{
    RouterNavigationAction,
    RouterNavigationPayload,
    ROUTER_NAVIGATION
} from '@ngrx/router-store';

export declare interface ActionErrorPayload { error: any; }

export class RouterNavigation implements RouterNavigationAction
{
    readonly type = ROUTER_NAVIGATION;
    readonly payload: RouterNavigationPayload<RouterStateSnapshot>;
    constructor() { }
}

export class NavigationFailed
{
    readonly type = 'NavigationFailed';
    constructor(readonly payload: ActionErrorPayload) { }
}

export class ReturnUrlChanged
{
    readonly type = 'ReturnUrlChanged';
    constructor(readonly payload: Readonly<{
        returnUrl: string
    }>) { }
}
