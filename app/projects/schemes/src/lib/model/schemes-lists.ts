import { ActivatedRouteSnapshot } from '@angular/router';

export enum SchemesList
{
    Empty = 'empty',
    Full = 'full',
    UserSchemes = 'my',
    Favorites = 'fav',
    LikedSchemes = 'liked',
    Original = 'ml',
    Community = 'com'
}


export function getSchemesListFromRoute(route: ActivatedRouteSnapshot): SchemesList
{
    let index = route;
    while (index.firstChild)
    {
        index = index.firstChild;
    }
    return index.params.list || SchemesList.Full;
}
