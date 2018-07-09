import { Component, ViewEncapsulation, OnDestroy } from '@angular/core';
import { ObservableMedia, MediaChange } from '@angular/flex-layout';
import { CookieService } from 'ngx-cookie-service';
import { Subscription } from 'rxjs';

import { SideService } from 'core';
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
        cookieService: CookieService,
        readonly env: SideService)
    {
        this.mediaSubscription = media.subscribe((change: MediaChange) =>
        {
            if (env.isBrowserSide)
            {
                cookieService.set(AppConstants.Cookies.Media, change.mqAlias, 30);
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
        this._sidenavIsOpened_UserDefined = this.sidenavIsOpened = !this.sidenavIsOpened;
    }

    ngOnDestroy(): void
    {
        this.mediaSubscription.unsubscribe();
    }
}
