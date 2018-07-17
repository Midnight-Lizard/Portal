import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { MatSnackBar, MatMenu, MatMenuTrigger } from '@angular/material';
import { By } from '@angular/platform-browser';

import { nameOfClass, click } from 'testing';
import { InfoRootState, NotifyUser, NotificationLevel, NotificationMessage, DismissAllNotifications } from 'core';
import { InfoNavComponent } from './info-nav.component';
import { AppTestingModule } from '../../app.testing.module';
import { InfoBarComponent } from '../info-bar/info-bar.component';

describe(nameOfClass(InfoNavComponent), function (this: { testNotification: NotificationMessage })
{
    let component: InfoNavComponent;
    let fixture: ComponentFixture<InfoNavComponent>;

    beforeEach(async(() =>
    {
        TestBed.configureTestingModule({
            declarations: [InfoNavComponent],
            imports: [AppTestingModule.forRoot()]
        }).compileComponents();
    }));

    beforeEach(() =>
    {
        fixture = TestBed.createComponent(InfoNavComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    beforeEach(inject([Store, MatSnackBar],
        (store$: Store<InfoRootState>, snackBar: MatSnackBar) =>
        {
            spyOn(snackBar, 'openFromComponent');
            this.testNotification = {
                id: 123,
                level: NotificationLevel.Info,
                isLocal: true,
                message: 'test message'
            };
            store$.dispatch(new NotifyUser(this.testNotification));
        }));

    it('should open info-bar when new notification arrives', inject([MatSnackBar],
        (snackBar: MatSnackBar) =>
        {
            expect(snackBar.openFromComponent).toHaveBeenCalledWith(InfoBarComponent, {
                data: this.testNotification,
                duration: jasmine.any(Number)
            });
        }));

    it('should dispatch DismissAllNotifications when dismissAll called', inject(
        [Store, MatSnackBar],
        (store$: Store<InfoRootState>, snackBar: MatSnackBar) =>
        {
            spyOn(store$, 'dispatch');
            component.dismissAll();
            expect(store$.dispatch).toHaveBeenCalledWith(jasmine.any(DismissAllNotifications));
        }));
});
