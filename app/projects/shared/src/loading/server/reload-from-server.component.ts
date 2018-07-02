import { Store, select } from '@ngrx/store';
import { Component } from '@angular/core';
import { SideService, NavFeatureState } from 'core';

@Component({
    selector: 'common-reload-from-server',
    template: `<common-loading></common-loading>`
})
export class ReloadFromServerComponent
{
    constructor(
        protected readonly env: SideService,
        protected readonly store$: Store<NavFeatureState>)
    {
        if (this.env.isBrowserSide)
        {
            this.store$.pipe(select(x => x.NAV.returnUrl))
                .subscribe(returnUrl =>
                {
                    const url = new URL(window.location.href);
                    url.searchParams.set('returnUrl', returnUrl);
                    window.location.replace(url.href);
                });
        }
    }
}