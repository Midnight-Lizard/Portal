import { Component } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Section } from 'core';
import { SchemesSiteMapService } from 'schemes';

import { routes } from '../app.routing.module';

@Component({
    selector: 'ml-sitemap',
    templateUrl: './sitemap.component.html',
    styleUrls: ['./sitemap.component.scss']
})
export class SiteMapComponent
{
    readonly sitemap$ = new Array<Observable<Section>>();

    constructor(schemesSiteMap: SchemesSiteMapService)
    {
        this.sitemap$.push(
            of(this.getMainRoutes()),
            schemesSiteMap.getSiteMap()
        );
    }

    getMainRoutes()
    {
        return {
            title: 'Home',
            links: routes
                .filter(x => x.path && !x.path.includes('*') && !x.loadChildren && x.children)
                .map(x => ({ title: x.children![0].data!.title, url: `/${x.path}` }))
        };
    }
}
