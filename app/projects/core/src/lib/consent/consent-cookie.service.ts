import { CookieService } from 'ngx-cookie-service';
import { NoConsentAction } from './no-consent.action';
import { ConsentService } from './consent.service';
import { Injectable } from '@angular/core';

@Injectable()
export class ConsentCookieService
{
    constructor(
        private readonly cookieService: CookieService,
        private readonly consentService: ConsentService)
    {
    }

    check(name: string): boolean
    {
        return this.cookieService.check(name);
    }

    get(name: string): string
    {
        return this.cookieService.get(name);
    }

    getAll(): {}
    {
        return this.cookieService.getAll();
    }

    set(name: string, value: string, noConsentAction: NoConsentAction,
        expires?: number | Date | undefined, path?: string | undefined,
        domain?: string | undefined, secure?: boolean | undefined): void
    {
        if (this.consentService.validateConsent(noConsentAction))
        {
            this.cookieService.set(name, value, expires, path, domain, secure);
        }
    }

    delete(name: string, noConsentAction: NoConsentAction,
        path?: string | undefined, domain?: string | undefined): void
    {
        if (this.consentService.validateConsent(noConsentAction))
        {
            this.cookieService.delete(name, path, domain);
        }
    }

    deleteAll(noConsentAction: NoConsentAction,
        path?: string | undefined, domain?: string | undefined): void
    {
        if (this.consentService.validateConsent(noConsentAction))
        {
            this.cookieService.deleteAll(path, domain);
        }
    }
}
