import { fakeAsync, ComponentFixture, TestBed, tick, inject } from '@angular/core/testing';
import { Router, NavigationExtras } from '@angular/router';
import { Store } from '@ngrx/store';

import { nameOfClass, TestSchedulerStub, TestingModule } from 'testing';
import { SchemesFilterComponent } from './filter.component';
import { SchemesTestingModule } from '../../schemes.testing.module';
import { SchemeSide } from '../../model/scheme-side';
import { SchemesRootState } from '../../store/schemes.state';
import { SchemesSearchChanged } from '../../store/schemes.actions';
import { SchemesList } from '../../model/schemes-lists';
import { HueFilter } from '../../model/hue-filter';

describe(nameOfClass(SchemesFilterComponent), function (this: { router: Router })
{
    let component: SchemesFilterComponent;
    let fixture: ComponentFixture<SchemesFilterComponent>;

    beforeEach(fakeAsync(() =>
    {
        TestSchedulerStub.init();
        TestBed.configureTestingModule({
            declarations: [SchemesFilterComponent],
            imports: [SchemesTestingModule.forRoot(), TestingModule.forRoot()],
        }).compileComponents();
    }));

    beforeEach(() =>
    {
        fixture = TestBed.createComponent(SchemesFilterComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        this.router = TestBed.get(Router);
        spyOn(this.router, 'navigate');
    });

    describe('Side toggle', function (this: { router: Router })
    {
        beforeEach(fakeAsync(() =>
        {
            component.filtersForm.get('side')!.setValue(null);
            fixture.detectChanges();
            TestSchedulerStub.flush();
            this.router = TestBed.get(Router);
        }));

        for (const side of Object.values(SchemeSide))
        {
            it(`should navigate correctly on [${side}] side toggle checked`, () =>
            {
                component.filtersForm.get('side')!.setValue(side);
                fixture.detectChanges();
                TestSchedulerStub.flush();
                const expectedParams: NavigationExtras = {
                    queryParams: { q: '', side, bg: HueFilter.Any },
                    queryParamsHandling: 'merge'
                };
                expect(this.router.navigate).toHaveBeenCalledWith([], expectedParams);
            });
        }
    });

    describe('Hue toggle', function (this: { router: Router })
    {
        beforeEach(fakeAsync(() =>
        {
            component.filtersForm.get('bg')!.setValue(null);
            fixture.detectChanges();
            TestSchedulerStub.flush();
            this.router = TestBed.get(Router);
        }));

        for (const hue of Object.values(HueFilter))
        {
            it(`should navigate correctly on [${hue}] hue toggle checked`, () =>
            {
                component.filtersForm.get('bg')!.setValue(hue);
                fixture.detectChanges();
                TestSchedulerStub.flush();
                const expectedParams: NavigationExtras = {
                    queryParams: { q: '', side: SchemeSide.Any, bg: hue },
                    queryParamsHandling: 'merge'
                };
                expect(this.router.navigate).toHaveBeenCalledWith([], expectedParams);
            });
        }
    });

    it('should navigate correctly when a text entered into the search box', () =>
    {
        const testString = 'test';
        component.filtersForm.get('query')!.setValue(testString);
        fixture.detectChanges();
        TestSchedulerStub.flush();
        const expectedParams: NavigationExtras = {
            queryParams: { q: testString, side: SchemeSide.Any, bg: HueFilter.Any },
            queryParamsHandling: 'merge'
        };
        expect(this.router.navigate).toHaveBeenCalledWith([], expectedParams);
    });

    it('should change form values when filters value changes in the store', inject(
        [Store], (store$: Store<SchemesRootState>) =>
        {
            const testFiltersValue = { query: 'test', side: SchemeSide.Dark, bg: HueFilter.Any };
            store$.dispatch(new SchemesSearchChanged({
                list: SchemesList.Full,
                filters: testFiltersValue
            }));
            fixture.detectChanges();
            expect(component.filtersForm.value).toEqual(testFiltersValue);
        }));
});
