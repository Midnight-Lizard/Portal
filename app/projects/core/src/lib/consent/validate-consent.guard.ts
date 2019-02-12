import { CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { ConsentService } from './consent.service';
import { NoConsentAction } from './no-consent.action';

@Injectable()
export class ValidateConsentGuard implements CanActivate
{
    constructor(private readonly consentService: ConsentService)
    {

    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean
    {
        return this.consentService.validateConsent(
            NoConsentAction.SkipOperationAndNotifyUser,
            state.url);
    }
}
