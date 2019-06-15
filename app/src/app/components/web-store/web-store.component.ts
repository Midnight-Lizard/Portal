import { Component, ViewChildren, QueryList, OnDestroy, ElementRef } from '@angular/core';
import { MatNavList } from '@angular/material/list';
import { MediaObserver } from '@angular/flex-layout';
import { Subscription } from 'rxjs';

import { SideService } from 'core';

@Component({
    selector: 'ml-web-store',
    templateUrl: './web-store.component.html',
    styleUrls: ['./web-store.component.scss']
})
export class WebStoreComponent implements OnDestroy
{
    private readonly _mediaSub: Subscription;

    @ViewChildren(MatNavList, { read: ElementRef }) navLinks: QueryList<ElementRef>;

    constructor(mediaObserver: MediaObserver, env: SideService)
    {
        if (env.isBrowserSide)
        {
            this._mediaSub = mediaObserver.media$.subscribe(change =>
            {
                const isSmall = change.matches && change.mqAlias === 'xs';
                if (this.navLinks)
                {
                    if (isSmall)
                    {
                        this.navLinks.forEach(nl => nl.nativeElement.setAttribute('dense', ''));
                    }
                    else
                    {
                        this.navLinks.forEach(nl => nl.nativeElement.removeAttribute('dense'));
                    }
                }
            });
        }
    }

    ngOnDestroy(): void
    {
        if (this._mediaSub)
        {
            this._mediaSub.unsubscribe();
        }
    }
}
