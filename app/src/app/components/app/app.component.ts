import { Component, ViewEncapsulation, OnDestroy } from '@angular/core';
import { ObservableMedia, MediaChange } from '@angular/flex-layout';
import { Subscription } from 'rxjs';

import { SideService, ConsentCookieService, NoConsentAction } from 'core';
import { SvgIconService } from 'shared';
import { AppConstants } from '../../app.constants';

@Component({
    selector: 'ml-portal',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnDestroy
{
    public sidenavMode: 'over' | 'side' = 'side';
    public sidenavIsOpened = true;
    protected _sidenavIsOpened_UserDefined = this.sidenavIsOpened;
    private readonly mediaSubscription: Subscription;

    constructor(
        media: ObservableMedia,
        cookieService: ConsentCookieService,
        iconService: SvgIconService,
        readonly env: SideService)
    {
        iconService.registerSvgIcons();
        this.mediaSubscription = media.subscribe((change: MediaChange) =>
        {
            if (env.isBrowserSide)
            {
                cookieService.set(AppConstants.Cookies.Media, change.mqAlias,
                    NoConsentAction.SilentlySkipOperation, 30, '/');
            }
            if (/xs|sm/.test(change.mqAlias))
            {
                this.sidenavIsOpened = false;
                this.sidenavMode = 'over';
            }
            else
            {
                this.sidenavIsOpened = this._sidenavIsOpened_UserDefined;
                this.sidenavMode = 'side';
            }
        });
    }

    public toggleSidenav()
    {
        this._sidenavIsOpened_UserDefined =
            this.sidenavIsOpened = !this.sidenavIsOpened;
    }

    ngOnDestroy(): void
    {
        this.mediaSubscription.unsubscribe();
    }
}
