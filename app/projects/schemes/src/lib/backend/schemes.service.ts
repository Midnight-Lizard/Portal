import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { Observable } from 'rxjs';
import { first, map, filter } from 'rxjs/operators';
import ApolloClient from 'apollo-client';

import { SettingsService, AuthRootState, User } from 'core';

import { SchemesFilters } from '../model/schemes-filters';
import { PublicScheme, PublicSchemeId, PublicSchemeDetails } from '../model/public-scheme';
import { SchemesList } from '../model/schemes-lists';
import { SchemesSearchResults } from '../model/schemes-search-results';
import
{
    searchQuery, detailsQuery, listQuery,
    likesUpdateFragment, favoritesUpdateFragment
} from './schemes.queries';
import { Store, select } from '@ngrx/store';
import { SchemesDetailsResult } from '../model/schemes-details-result';
import { SchemesListResults } from '../model/schemes-list-results';

@Injectable()
export class SchemesService
{
    private readonly apolloClient: ApolloClient<any>;
    constructor(
        httpLink: HttpLink,
        store$: Store<AuthRootState>,
        private readonly settingsService: SettingsService,
        private readonly apollo: Apollo)
    {
        const token = store$.pipe(
            select(x => x.AUTH.system),
            filter(x => !!x),
            map(x => x!.access_token),
            first());
        const uri = settingsService.getSettings().SCHEMES_QUERIER_URL;
        const http = httpLink.create({ uri });
        const auth = setContext(async () => ({
            headers: {
                Authorization: `Bearer ${await token.toPromise()}`
            }
        }));
        apollo.create({
            link: auth.concat(http),
            cache: new InMemoryCache()
        });
        this.apolloClient = apollo.getClient();
    }

    public getPublicSchemes(filters: SchemesFilters, list: SchemesList, pageSize: number, user?: User | null, cursor?: string | null)
    {
        return this.apollo.query<SchemesSearchResults>({
            query: searchQuery,
            variables: {
                query: filters.query,
                side: filters.side,
                bg: filters.bg,
                list, pageSize, cursor,
                currentUserId: user ? user.claims.sub : null
            }
        }).pipe(map(x => x.data.search));
    }

    public getFullList()
    {
        return this.apollo.query<SchemesListResults>({
            query: listQuery
        }).pipe(map(x => x.data.search));
    }

    public getPublicSchemeDetails(publicSchemeId: PublicSchemeId, user?: User | null)
    {
        return this.apollo.query<SchemesDetailsResult>({
            query: detailsQuery,
            variables: {
                id: publicSchemeId,
                currentUserId: user ? user.claims.sub : null
            }
        }).pipe(map(x => x.data.details));
    }

    public updatePublicSchemeLikes(publicScheme: PublicScheme, user: User)
    {
        this.apolloClient.writeFragment({
            fragment: likesUpdateFragment,
            id: `PublicSchemeType:${publicScheme.id}`,
            data: publicScheme,
            variables: { currentUserId: user.claims.sub }
        });
    }

    public updatePublicSchemeFavorites(publicScheme: PublicScheme, user: User)
    {
        this.apolloClient.writeFragment({
            fragment: favoritesUpdateFragment,
            id: `PublicSchemeType:${publicScheme.id}`,
            data: publicScheme,
            variables: { currentUserId: user.claims.sub }
        });
    }
}
