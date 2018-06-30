import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { AuthRootState, User } from 'core';

declare interface MenuItem
{
    link: string;
    icon: string;
    title: string;
    tooltip: string;
    class: string;
}

@Component({
    selector: 'ml-user-nav',
    templateUrl: './user-nav.component.html',
    styleUrls: ['./user-nav.component.scss']
})
export class UserNavComponent
{
    public items$: Observable<MenuItem[]>;
    public user$: Observable<User | undefined | null>;
    protected readonly noUserMenu: MenuItem[] = [
        {
            title: 'Sign in', tooltip: 'Login or create a new user',
            icon: 'vpn_key', link: '/signin', class: ''
        }
    ];

    constructor(protected readonly store$: Store<AuthRootState>)
    {
        this.user$ = store$.pipe(select(s => s.AUTH.USER.user));
        this.items$ = this.user$.pipe(
            map(user =>
            {
                if (user && !user.expired)
                {
                    return <MenuItem[]>[
                        {
                            title: 'Profile', tooltip: `Go to my profile page`,
                            icon: 'account_box', link: '/profile', class: ''
                        },
                        {
                            title: 'Sign out', tooltip: `Sign out from ${user.claims.preferred_username}`,
                            icon: 'exit_to_app', link: '/signout', class: ''
                        }
                    ];
                }
                else
                {
                    return this.noUserMenu;
                }
            }),
            startWith(this.noUserMenu));
    }
}
