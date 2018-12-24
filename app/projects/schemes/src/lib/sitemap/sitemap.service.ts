import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import { Section, Link } from 'core';

import { SchemesService } from '../backend/schemes.service';

@Injectable()
export class SchemesSiteMapService
{
    constructor(private readonly schemesService: SchemesService)
    {
    }

    getSiteMap(): Observable<Section>
    {
        return this.schemesService.getFullList().pipe(
            catchError(x => of({ results: [{ name: (x.message || x), id: 'none' }] })),
            map(x => ({
                title: 'Color Schemes',
                links: x.results
                    .sort((a, b) => (a.name || '').localeCompare(b.name))
                    .map(scheme => ({
                        title: scheme.name,
                        url: `/schemes/index/full/${scheme.id}`
                    }) as Link)
            }) as Section));
    }
}
