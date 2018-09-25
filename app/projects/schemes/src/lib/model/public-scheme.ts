import { Publisher } from './publisher';
import { Screenshot } from './screenshot';
import { ActivatedRouteSnapshot } from '@angular/router';

export declare type PublicSchemeId = string;

export interface PublicScheme
{
    readonly id: PublicSchemeId;
    readonly publisher: Publisher;
    readonly name: string;
    readonly screenshots: Screenshot[];
    readonly liked: boolean;
    readonly likes: number;
    readonly favorited: boolean;
}

export interface PublicSchemeDetails extends PublicScheme
{
    readonly description: string;
    readonly generation: number;
    readonly colorScheme: any;
}

export function getSchemesIdFromRoute(route: ActivatedRouteSnapshot): PublicSchemeId | null
{
    let index = route;
    while (index.firstChild)
    {
        index = index.firstChild;
    }
    return index.params.id || null;
}
