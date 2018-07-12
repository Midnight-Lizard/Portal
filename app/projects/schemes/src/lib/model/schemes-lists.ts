import { ActivatedRouteSnapshot } from '@angular/router';

export enum SchemesList
{
    Empty = 'empty',
    Full = 'full',
    My = 'my',
    Favorites = 'fav',
    Liked = 'liked',
    MidnightLizard = 'ml',
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
