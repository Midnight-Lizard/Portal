import { Params, ActivatedRouteSnapshot } from '@angular/router';
import { SchemeSide } from './scheme-side';

export interface SchemesFilters
{
    readonly name: string;
    readonly side: SchemeSide;
}

export function getFiltersFromRoute(route: ActivatedRouteSnapshot): SchemesFilters
{
    return {
        name: route.queryParams.q || '',
        side: route.queryParams.side ? route.queryParams.side : SchemeSide.None
    };
}

export function createRouteParamsFromFilters(filters: SchemesFilters): Params
{
    const params: Params = {};

    params.q = filters.name || '';
    params.side = filters.side;

    return params;
}

export function filtersAreEqual(first: SchemesFilters, second: SchemesFilters)
{
    return first.name === second.name && first.side === second.side;
}
