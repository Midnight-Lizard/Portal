import { Store, select } from '@ngrx/store';
import { Component, AfterViewInit } from '@angular/core';
import { SideService, NavRootState } from 'core';

@Component({
    selector: 'common-reload-from-server',
    template: `<common-loading></common-loading>`
})
export class ReloadFromServerComponent implements AfterViewInit
{
    constructor(
        protected readonly env: SideService,
        protected readonly store$: Store<NavRootState>)
    {
    }

    ngAfterViewInit(): void
    {
        if (this.env.isBrowserSide)
        {
            const self = this;
            this.store$.pipe(select(x => x.NAV.NAV.returnUrl))
                .subscribe(returnUrl =>
                {
                    const url = new URL(window.location.href);
                    url.searchParams.set('returnUrl', returnUrl);
                    self.navigate(url);
                });
        }
    }

    public navigate(url: URL)
    {
        window.location.replace(url.href);
    }
}
