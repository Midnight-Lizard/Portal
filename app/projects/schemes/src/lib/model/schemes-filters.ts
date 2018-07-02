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
        name: route.queryParams.sn || '',
        side: route.queryParams.ss ? route.queryParams.ss : SchemeSide.None
    };
}

export function createRouteParamsFromFilters(filters: SchemesFilters): Params
{
    const params: Params = {};

    params.sn = filters.name || '';
    params.ss = filters.side;

    return params;
}

export function filtersAreEqual(first: SchemesFilters, second: SchemesFilters)
{
    return first.name === second.name && first.side === second.side;
}
