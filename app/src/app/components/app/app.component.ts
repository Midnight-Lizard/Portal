import { Component, ViewEncapsulation, OnDestroy, Inject, Optional } from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
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
        @Inject('MEDIA') @Optional()
        private readonly lastMedia: string | null,
        mediaObserver: MediaObserver,
        cookieService: ConsentCookieService,
        iconService: SvgIconService,
        readonly env: SideService)
    {
        iconService.registerSvgIcons();
        console.log(`lastMedia: ${lastMedia}`);
        this.mediaSubscription = mediaObserver.media$.subscribe((change: MediaChange) =>
        {
            console.log(change);
            let mq = this.lastMedia || 'sm';
            if (env.isBrowserSide)
            {
                cookieService.set(AppConstants.Cookies.Media, change.mqAlias,
                    NoConsentAction.SilentlySkipOperation, 30, '/');
                mq = change.mqAlias;
            }
            if (/xs|sm/.test(mq))
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
