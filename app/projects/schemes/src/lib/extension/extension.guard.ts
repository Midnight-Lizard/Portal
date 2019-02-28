import { CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';

import { ExtensionService } from './extension.service';

@Injectable()
export class ExtensionGuard implements CanActivate
{
    constructor(private readonly extension: ExtensionService)
    {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean
    {
        switch (route.routeConfig && route.routeConfig.path)
        {
            case 'apply': this.extension.applyPublicScheme(route.queryParams.id); break;
            case 'set-as-default': this.extension.setPublicSchemeAsDefault(route.queryParams.id); break;
            default: break;
        }
        return false;
    }
}
