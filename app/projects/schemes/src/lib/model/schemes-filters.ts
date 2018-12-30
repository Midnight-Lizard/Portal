import { Params, ActivatedRouteSnapshot } from '@angular/router';
import { SchemeSide } from './scheme-side';
import { HueFilter } from './hue-filter';

export interface SchemesFilters
{
    readonly query: string;
    readonly side: SchemeSide;
    readonly bg: HueFilter;
}

export function getFiltersFromRoute(route: ActivatedRouteSnapshot): SchemesFilters
{
    return {
        query: route.queryParams.q || '',
        side: route.queryParams.side ? route.queryParams.side : SchemeSide.Any,
        bg: route.queryParams.bg ? route.queryParams.bg : HueFilter.Any
    };
}

export function createRouteParamsFromFilters(filters: SchemesFilters): Params
{
    const params: Params = {};

    params.q = filters.query || '';
    params.side = filters.side;
    params.bg = filters.bg;

    return params;
}

export function filtersAreEqual(first: SchemesFilters, second: SchemesFilters)
{
    return first.query === second.query &&
        first.side === second.side &&
        first.bg === second.bg;
}
