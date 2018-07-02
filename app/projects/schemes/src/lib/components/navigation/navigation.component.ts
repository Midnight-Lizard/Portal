import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AuthRootState, User } from 'core';

@Component({
    selector: 'schemes-nav',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.scss']
})
export class SchemesNavigationComponent
{
    protected readonly user$: Observable<User | null | undefined>;

    constructor(store$: Store<AuthRootState>)
    {
        this.user$ = store$.pipe(select(x => x.AUTH.USER.user));
    }
}
