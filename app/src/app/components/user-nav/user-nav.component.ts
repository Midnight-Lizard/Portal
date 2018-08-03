import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { AuthRootState, User } from 'core';

declare interface MenuItem
{
    link?: string;
    externalLink?: string;
    icon: string;
    title: string;
    tooltip: string;
}
const noUserMenu: MenuItem[] = [
    {
        title: 'Sign in', tooltip: 'Login or create a new user',
        icon: 'vpn_key', link: '/signin'
    }
];

@Component({
    selector: 'ml-user-nav',
    templateUrl: './user-nav.component.html',
    styleUrls: ['./user-nav.component.scss']
})
export class UserNavComponent
{
    public items$: Observable<MenuItem[]>;
    public user$: Observable<User | undefined | null>;

    constructor(protected readonly store$: Store<AuthRootState>)
    {
        this.user$ = store$.pipe(select(s => s.AUTH.user));
        this.items$ = this.user$.pipe(
            map(user =>
            {
                if (user && !user.expired)
                {
                    return <MenuItem[]>[
                        {
                            title: 'Profile', tooltip: `Go to my profile page`,
                            icon: 'account_box', externalLink: user.claims.profile
                        },
                        {
                            title: 'Sign out', tooltip: `Sign out from ${user.claims.name}`,
                            icon: 'exit_to_app', link: '/signout'
                        }
                    ];
                }
                else
                {
                    return noUserMenu;
                }
            }),
            startWith(noUserMenu));
    }
}
