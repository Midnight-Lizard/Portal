import { Params, ActivatedRouteSnapshot } from '@angular/router';
import { SchemeSide } from './scheme-side';

export interface SchemesFilters
{
    readonly query: string;
    readonly side: SchemeSide;
}

export function getFiltersFromRoute(route: ActivatedRouteSnapshot): SchemesFilters
{
    return {
        query: route.queryParams.q || '',
        side: route.queryParams.side ? route.queryParams.side : SchemeSide.None,
    };
}

export function createRouteParamsFromFilters(filters: SchemesFilters): Params
{
    const params: Params = {};

    params.q = filters.query || '';
    params.side = filters.side;

    return params;
}

export function filtersAreEqual(first: SchemesFilters, second: SchemesFilters)
{
    return first.query === second.query && first.side === second.side;
}
