import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material';

import { nameOfClass } from 'testing';
import { NotificationMessage, NotificationLevel } from 'core';
import { DetailsBarComponent } from './details-bar.component';
import { AppTestingModule } from '../../app.testing.module';

describe(nameOfClass(DetailsBarComponent), () =>
{
    let component: DetailsBarComponent;
    let fixture: ComponentFixture<DetailsBarComponent>;

    beforeEach(async(() =>
    {
        const bottomSheetRefStub = jasmine
            .createSpyObj<MatBottomSheetRef<DetailsBarComponent>>('BottomSheetRefStub',
                Object.keys(MatBottomSheetRef.prototype));
        TestBed.configureTestingModule({
            declarations: [DetailsBarComponent],
            imports: [AppTestingModule.forRoot()],
            providers: [
                { provide: MatBottomSheetRef, useValue: bottomSheetRefStub },
                {
                    provide: MAT_BOTTOM_SHEET_DATA, useValue: {
                        id: 123,
                        level: NotificationLevel.Info,
                        isLocal: true,
                        message: 'test message',
                        data: { some: 'data' },
                        actions: [{
                            title: 'ACTION',
                            description: 'Test action',
                            route: '/test',
                            routeParams: { test: 123 }
                        }]
                    } as NotificationMessage
                }
            ]
        }).compileComponents();
    }));

    beforeEach(() =>
    {
        fixture = TestBed.createComponent(DetailsBarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () =>
    {
        expect(component).toBeTruthy();
    });
});
