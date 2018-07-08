import { Component, Inject, ViewEncapsulation, OnDestroy } from '@angular/core';
import { ObservableMedia, MediaChange } from '@angular/flex-layout';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry, MatSnackBar } from '@angular/material';
import { CookieService } from 'ngx-cookie-service';
import { Store, select } from '@ngrx/store';
import { map, filter, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { SideService, Side, InfoRootState } from 'core';
import { AppConstants } from '../../app.constants';
import { InfoBarComponent } from '../info-bar/info-bar.component';

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
    private disposed = new Subject<boolean>();

    constructor(
        media: ObservableMedia,
        iconRegistry: MatIconRegistry,
        sanitizer: DomSanitizer,
        cookieService: CookieService,
        snackBar: MatSnackBar,
        store$: Store<InfoRootState>,
        readonly env: SideService)
    {
        iconRegistry.addSvgIcon(
            'midnight-lizard',
            sanitizer.bypassSecurityTrustResourceUrl('assets/ml-logo.svg'));

        store$.pipe(
            select(x => x.INFO.notification.messages),
            map(messages => messages && messages.length ? messages[0] : null),
            filter(msg => !!msg),
            takeUntil(this.disposed)
        ).subscribe(msg =>
        {
            const snackBarRef = snackBar.openFromComponent(InfoBarComponent, { data: msg });
            snackBarRef.instance.snackBarRef = snackBarRef;
        });

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

    public toggleSidenav()
    {
        this._sidenavIsOpened_UserDefined = this.sidenavIsOpened = !this.sidenavIsOpened;
    }

    ngOnDestroy(): void
    {
        this.disposed.next(true);
    }
}
