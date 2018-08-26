import { CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { ConsentService } from './consent.service';

@Injectable()
export class AcceptConsentGuard implements CanActivate
{
    constructor(private readonly consentService: ConsentService)
    {

    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean
    {
        this.consentService.acceptConsent();
        return false;
    }
}
