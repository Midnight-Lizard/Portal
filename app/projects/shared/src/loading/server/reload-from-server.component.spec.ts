import { async, inject, ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule, Store } from '@ngrx/store';

import { nameOfClass, TestingModule } from 'testing';
import { NavFeature, navReducers, navInitialState, NavRootState, ReturnUrlChanged } from 'core';
import { ReloadFromServerComponent } from './reload-from-server.component';
import { LoadingComponent } from '../normal/loading.component';
import { SharedModule } from '../../lib/shared.module';

describe(nameOfClass(ReloadFromServerComponent), () =>
{
    let component: ReloadFromServerComponent;
    let fixture: ComponentFixture<ReloadFromServerComponent>;

    beforeEach(async(() =>
    {
        TestBed.configureTestingModule({
            declarations: [ReloadFromServerComponent, LoadingComponent],
            imports: [
                SharedModule, TestingModule,
                StoreModule.forRoot({}),
                StoreModule.forFeature(NavFeature, navReducers, { initialState: navInitialState }),
            ],
            providers: [
                TestingModule.forRoot().providers!
            ]
        }).compileComponents();
    }));

    beforeEach(() =>
    {
        const spy = spyOn(ReloadFromServerComponent.prototype, 'navigate');
        fixture = TestBed.createComponent(ReloadFromServerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        spy.calls.reset();
    });

    it('should reload from server with returnUrl', inject([Store],
        (store$: Store<NavRootState>) =>
        {
            store$.dispatch(new ReturnUrlChanged({ returnUrl: 'test' }));
            expect(component.navigate).toHaveBeenCalledWith(
                jasmine.stringMatching(/returnUrl=test/));
        }));
});
