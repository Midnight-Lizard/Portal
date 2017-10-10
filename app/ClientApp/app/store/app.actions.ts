import { RouterNavigationAction, RouterNavigationPayload, ROUTER_NAVIGATION } from "@ngrx/router-store";
import { RouterStateSnapshot } from "@angular/router";
import { User } from "oidc-client";

import { ExternalModule } from "../../external/external.module";
import { ActionError } from "./app.state";


export declare type CommandAction = undefined;

export declare type ActionErrorPayload = { error: ActionError };

export class RouterNavigation implements RouterNavigationAction
{
    readonly type = ROUTER_NAVIGATION;
    readonly payload: RouterNavigationPayload<RouterStateSnapshot>;
    constructor() { }
}

export class RouterNavigated
{
    readonly type = "RouterNavigated";
    constructor(readonly payload: RouterNavigationPayload<RouterStateSnapshot>) { }
}

export class NavigationFailed
{
    readonly type = "NavigationFailed";
    constructor(readonly payload: ActionErrorPayload) { }
}

export class UserSignedIn
{
    readonly type = "UserSignedIn";
    constructor(readonly payload: {
        user: User
    }) { }
}

export class UserSignedOut
{
    readonly type = "UserSignedOut";
    constructor() { }
}

export class SignInFailed
{
    readonly type = "SignInFailed";
    constructor(readonly payload: ActionErrorPayload) { }
}

export class SignOutFailed
{
    readonly type = "SignOutFailed";
    constructor(readonly payload: ActionErrorPayload) { }
}

export class ExternalModuleScriptDownloded
{
    readonly type = "ExternalModuleScriptDownloded";
    constructor(readonly payload: {
        moduleName: ExternalModule,
        script: string
    }) { }
}
