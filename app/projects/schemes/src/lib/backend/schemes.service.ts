import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { Observable } from 'rxjs';
import { first, switchMap, map } from 'rxjs/operators';

import { SettingsService, AuthRootState, User } from 'core';

import { SchemesFilters } from '../model/schemes-filters';
import { PublicScheme, PublicSchemeId, PublicSchemeDetails } from '../model/public-scheme';
import { SchemesList } from '../model/schemes-lists';
import { SchemesSearchResults } from '../model/schemes-search-results';
import { searchQuery, detailsQuery } from './schemes.queries';
import { Store, select } from '@ngrx/store';
import { SchemesDetailsResult } from '../model/schemes-details-result';

@Injectable()
export class SchemesService
{
    client: Observable<void>;


    constructor(
        httpLink: HttpLink,
        store$: Store<AuthRootState>,
        private readonly settingsService: SettingsService,
        private readonly apollo: Apollo)
    {
        this.client = store$.pipe(
            select(x => x.AUTH.system),
            map(system =>
            {
                if (system)
                {
                    const uri = settingsService.getSettings().SCHEMES_QUERIER_URL.replace(/\/$/, '') + '/query';
                    const http = httpLink.create({ uri });
                    const auth = setContext((_, __) => ({
                        headers: {
                            Authorization: `Bearer ${system.access_token}`
                        }
                    }));
                    apollo.create({
                        link: auth.concat(http),
                        cache: new InMemoryCache()
                    });
                }
            }),
            first()
        );
    }

    public getPublicSchemes(filters: SchemesFilters, list: SchemesList, pageSize: number, user?: User | null, cursor?: string | null)
    {
        return this.client.pipe(switchMap(() =>
            this.apollo.query<SchemesSearchResults>({
                query: searchQuery,
                variables: {
                    query: filters.query,
                    side: filters.side,
                    list, pageSize, cursor,
                    publisherId: user ? user.claims.sub : null
                }
            }).pipe(map(x => x.data.search))));
    }

    public getPublicSchemeDetails(publicSchemeId: PublicSchemeId)
    {
        return this.client.pipe(switchMap(() =>
            this.apollo.query<SchemesDetailsResult>({
                query: detailsQuery,
                variables: { id: publicSchemeId }
            }).pipe(map(x => x.data.details))));
    }
}
