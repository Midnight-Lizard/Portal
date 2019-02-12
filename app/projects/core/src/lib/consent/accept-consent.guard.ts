import { CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { ConsentService } from './consent.service';

@Injectable()
export class AcceptConsentGuard implements CanActivate
{
    constructor(
        private readonly consentService: ConsentService,
        private readonly router: Router)
    {

    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean
    {
        this.consentService.acceptConsent();
        if (route.queryParams.callbackUrl)
        {
            this.router.navigateByUrl(route.queryParams.callbackUrl);
        }
        return false;
    }
}
