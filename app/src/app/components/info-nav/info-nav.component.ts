import { MatBottomSheet, MatSnackBar } from '@angular/material';
import { Component, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { map, filter, takeUntil } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import
{
    InfoRootState, NotificationMessage, DismissAllNotifications,
    DismissNotification, NotificationLevel
} from 'core';
import { DetailsBarComponent } from '../details-bar/details-bar.component';
import { InfoBarComponent } from '../info-bar/info-bar.component';

const notificationDuration = new Map<NotificationLevel, number>([
    [NotificationLevel.Info, 5000],
    [NotificationLevel.Warning, 10000],
    [NotificationLevel.Error, 60000]
]);

@Component({
    selector: 'ml-info-nav',
    templateUrl: './info-nav.component.html',
    styleUrls: ['./info-nav.component.scss']
})
export class InfoNavComponent implements OnDestroy
{
    readonly notofications$: Observable<NotificationMessage[]>;
    private disposed = new Subject<boolean>();
    readonly msgCount$: Observable<number>;

    constructor(
        snackBar: MatSnackBar,
        private readonly store$: Store<InfoRootState>,
        private readonly bottomSheet: MatBottomSheet)
    {
        this.notofications$ = store$.pipe(select(x => x.INFO.notification.messages));
        this.msgCount$ = this.notofications$.pipe(
            map(notifications => notifications ? notifications.length : 0)
        );
        store$.pipe(
            select(x => x.INFO.notification.messages),
            map(messages => messages && messages.length ? messages[0] : null),
            filter(msg => !!msg),
            takeUntil(this.disposed)
        ).subscribe(msg => snackBar.openFromComponent(InfoBarComponent, {
            data: msg,
            duration: notificationDuration.get(msg!.level)
        }));
    }

    dismissAll()
    {
        this.store$.dispatch(new DismissAllNotifications());
    }

    openDetailsBar(msg: NotificationMessage)
    {
        this.store$.dispatch(new DismissNotification(msg));

        this.bottomSheet.open(DetailsBarComponent, {
            data: msg
        });
    }

    ngOnDestroy(): void
    {
        this.disposed.next(true);
    }
}
