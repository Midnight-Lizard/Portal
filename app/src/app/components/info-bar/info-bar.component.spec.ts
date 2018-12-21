import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material';

import { NotificationMessage, NotificationLevel } from 'core';
import { nameOfClass } from 'testing';
import { InfoBarComponent } from './info-bar.component';
import { AppTestingModule } from '../../app.testing.module';

describe(nameOfClass(InfoBarComponent), () =>
{
    let component: InfoBarComponent;
    let fixture: ComponentFixture<InfoBarComponent>;

    beforeEach(async(() =>
    {
        const snackBarRefStub = jasmine.createSpyObj<MatSnackBarRef<InfoBarComponent>>(
            'SnackBarRefStub',
            Object.keys(MatSnackBarRef.prototype) as Array<keyof MatSnackBarRef<InfoBarComponent>>);
        TestBed.configureTestingModule({
            declarations: [InfoBarComponent],
            imports: [AppTestingModule.forRoot()],
            providers: [
                {
                    provide: MAT_SNACK_BAR_DATA, useValue: {
                        id: 123,
                        level: NotificationLevel.Info,
                        isLocal: true,
                        message: 'test message',
                        data: { some: 'data' },
                        actions: [{
                            infoTitle: 'ACTION',
                            detailsTitle: 'ACTION',
                            description: 'Test action',
                            route: '/test',
                            routeParams: { test: 123 }
                        }]
                    } as NotificationMessage
                },
                { provide: MatSnackBarRef, useValue: snackBarRefStub }
            ]
        }).compileComponents();
    }));

    beforeEach(() =>
    {
        fixture = TestBed.createComponent(InfoBarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () =>
    {
        expect(component).toBeTruthy();
    });
});
