import { CookieService } from 'ngx-cookie-service';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { NoConsentAction } from './no-consent.action';
import { DismissNotification, NotifyUser } from '../store/info/info.actions';
import { NotificationLevel, ActionColor, ActionButtonType } from '../store/info/info.state';

@Injectable()
export class ConsentService
{
    private readonly _cookieName = 'consent';
    private readonly notificationIds = new Set<number>();

    constructor(
        private readonly cookieService: CookieService,
        private readonly store$: Store<{}>)
    {

    }

    acceptConsent()
    {
        this.cookieService.set(this._cookieName, 'ok', 99999);
        this.notificationIds.forEach(id =>
        {
            this.store$.dispatch(new DismissNotification({ id }));
        });
        this.notificationIds.clear();
    }

    validateConsent(noConsentAction: NoConsentAction, callbackUrl?: string)
    {
        if (this.cookieService.check(this._cookieName))
        {
            return true;
        }
        if (noConsentAction === NoConsentAction.SkipOperationAndNotifyUser)
        {
            const id = Math.random();
            this.notificationIds.add(id);
            this.store$.dispatch(new NotifyUser({
                id,
                level: NotificationLevel.Info,
                message: 'We use cookies to improve your experience on our website.',
                // tslint:disable-next-line:max-line-length
                data: 'A cookie is a small file that can be placed on your device that allows us to recognise and remember you. It is sent to your browser and stored on your computer’s hard drive or tablet or mobile device. When you visit our sites, we may collect information from you automatically through cookies or similar technology.',
                isLocal: true,
                actions: [{
                    infoTitle: 'PRIVACY',
                    detailsTitle: 'PRIVACY POLICY',
                    description: 'Open Website Privacy Policy',
                    route: '/privacy',
                    color: ActionColor.Normal,
                    infoButtonType: ActionButtonType.Basic,
                    detailsButtonType: ActionButtonType.Basic
                }, {
                    infoTitle: 'ALLOW AND CONTINUE',
                    detailsTitle: 'ALLOW COOKIES AND CONTINUE',
                    description: 'Allow to use cookies and continue',
                    route: '/accept-consent',
                    queryParams: { callbackUrl },
                    color: ActionColor.Accent,
                    infoButtonType: ActionButtonType.Raised,
                    detailsButtonType: ActionButtonType.Raised
                }]
            }));
        }
        return false;
    }
}
