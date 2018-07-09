import { MatBottomSheet } from '@angular/material';
import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { InfoRootState, NotificationMessage, DismissAllNotifications, DismissNotification } from 'core';
import { DetailsBarComponent } from '../details-bar/details-bar.component';

@Component({
    selector: 'ml-info-nav',
    templateUrl: './info-nav.component.html',
    styleUrls: ['./info-nav.component.scss']
})
export class InfoNavComponent
{
    readonly notofications$: Observable<NotificationMessage[]>;
    readonly msgCount$: Observable<number>;

    constructor(
        private readonly store$: Store<InfoRootState>,
        private readonly bottomSheet: MatBottomSheet)
    {
        this.notofications$ = store$.pipe(select(x => x.INFO.notification.messages));
        this.msgCount$ = this.notofications$.pipe(
            map(notifications => notifications ? notifications.length : 0)
        );
    }

    dismissAll()
    {
        this.store$.dispatch(new DismissAllNotifications());
    }

    openDetailsBar(msg: NotificationMessage)
    {
        this.store$.dispatch(new DismissNotification(msg));

        const bottomSheetRef = this.bottomSheet.open(DetailsBarComponent, {
            data: msg
        });
        bottomSheetRef.instance.bottomSheetRef = bottomSheetRef;
    }

}
