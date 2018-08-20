import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { Observable } from 'rxjs';
import { first, switchMap, map } from 'rxjs/operators';

import { SettingsService, AuthRootState, User } from 'core';

import { SchemesFilters } from '../model/schemes-filters';
import { PublicScheme, PublicSchemeId, PublicSchemeDetails } from '../model/public-scheme';
import { ScreenshotSize } from '../model/screenshot';
import { SchemeSide } from '../model/scheme-side';
import { SchemesList } from '../model/schemes-lists';
import { SchemesServiceStub } from './schemes.service.stub';
import { SchemesSearchResults } from '../model/schemes-search-results';
import { searchQuery, detailsQuery } from './schemes.queries';
import { Store, select } from '@ngrx/store';
import { NetworkStatus } from 'apollo-client';
import { SchemesDetailsResult } from '../model/schemes-details-result';

@Injectable()
export class SchemesService
{
    private static readonly stub = new SchemesServiceStub();

    constructor(httpLink: HttpLink,
        private readonly settingsService: SettingsService,
        private readonly apollo: Apollo)
    {
        apollo.create({
            link: httpLink.create({
                uri: settingsService.getSettings().SCHEMES_QUERIER_URL.replace('/$', '')
                    + '/query'
            }),
            cache: new InMemoryCache()
        });
    }

    public getPublicSchemes(filters: SchemesFilters, list: SchemesList, pageSize: number, user?: User | null, cursor?: string | null)
    {
        return this.apollo.query<SchemesSearchResults>({
            query: searchQuery,
            variables: {
                query: filters.query,
                side: filters.side,
                list, pageSize, cursor,
                publisherId: user ? user.claims.sub : null
            }
        }).pipe(map(x => x.data.search));
    }

    public getPublicSchemeDetails(publicSchemeId: PublicSchemeId)
    {
        return this.apollo.query<SchemesDetailsResult>({
            query: detailsQuery,
            variables: { id: publicSchemeId }
        }).pipe(map(x =>
            x.data.details));
    }
}
