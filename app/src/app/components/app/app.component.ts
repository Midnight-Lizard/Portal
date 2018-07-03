import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { ObservableMedia, MediaChange } from '@angular/flex-layout';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material';
import { CookieService } from 'ngx-cookie-service';

import { SideService, Side } from 'core';
import { AppConstants } from '../../app.constants';

@Component({
    selector: 'ml-portal',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class AppComponent
{
    public sidenavMode: 'over' | 'side' = 'side';
    public sidenavIsOpened = true;
    protected _sidenavIsOpened_UserDefined = this.sidenavIsOpened;

    public toggleSidenav()
    {
        this._sidenavIsOpened_UserDefined = this.sidenavIsOpened = !this.sidenavIsOpened;
    }

    constructor(
        media: ObservableMedia,
        iconRegistry: MatIconRegistry,
        sanitizer: DomSanitizer,
        cookieService: CookieService,
        readonly env: SideService)
    {
        iconRegistry.addSvgIcon(
            'midnight-lizard',
            sanitizer.bypassSecurityTrustResourceUrl('assets/ml-logo.svg'));

        media.subscribe((change: MediaChange) =>
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
}
