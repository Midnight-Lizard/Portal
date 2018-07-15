import { fakeAsync, ComponentFixture, TestBed, tick, inject } from '@angular/core/testing';
import { Router, NavigationExtras } from '@angular/router';
import { Store } from '@ngrx/store';

import { nameOfClass } from 'testing';
import { SchemesFilterComponent } from './filter.component';
import { SchemesTestingModule } from '../../schemes.testing.module';
import { SchemeSide } from '../../model/scheme-side';
import { SchemesRootState } from '../../store/schemes.state';
import { SchemesSearchChanged } from '../../store/schemes.actions';
import { SchemesList } from '../../model/schemes-lists';

describe(nameOfClass(SchemesFilterComponent), function (this: { router: Router })
{
    let component: SchemesFilterComponent;
    let fixture: ComponentFixture<SchemesFilterComponent>;

    beforeEach(fakeAsync(() =>
    {
        TestBed.configureTestingModule({
            declarations: [SchemesFilterComponent],
            imports: [SchemesTestingModule.forRoot()],
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

    it('should create', () =>
    {
        expect(component).toBeTruthy();
    });

    describe('Side toggle', function (this: { router: Router })
    {
        beforeEach(fakeAsync(() =>
        {
            component.filtersForm.get('side')!.setValue(null);
            fixture.detectChanges();
            tick(300);
            this.router = TestBed.get(Router);
        }));

        for (const side of Object.values(SchemeSide))
        {
            it(`should navigate correctly on [${side}] side toggle checked`, fakeAsync(() =>
            {
                component.filtersForm.get('side')!.setValue(side);
                fixture.detectChanges();
                tick(300);
                const expectedParams: NavigationExtras = {
                    queryParams: { q: '', side },
                    queryParamsHandling: 'merge'
                };
                expect(this.router.navigate).toHaveBeenCalledWith([], expectedParams);
            }));
        }
    });

    it('should navigate correctly when a text entered into the search box', fakeAsync(() =>
    {
        const testString = 'test';
        component.filtersForm.get('name')!.setValue(testString);
        fixture.detectChanges();
        tick(300);
        const expectedParams: NavigationExtras = {
            queryParams: { q: testString, side: SchemeSide.None },
            queryParamsHandling: 'merge'
        };
        expect(this.router.navigate).toHaveBeenCalledWith([], expectedParams);
    }));

    it('should change form values when filters value changes in the store', fakeAsync(inject(
        [Store], (store$: Store<SchemesRootState>) =>
        {
            const testFiltersValue = { name: 'test', side: SchemeSide.Dark };
            store$.dispatch(new SchemesSearchChanged({
                list: SchemesList.Full,
                filters: testFiltersValue
            }));
            fixture.detectChanges();
            tick(300);
            expect(component.filtersForm.value).toEqual(testFiltersValue);
        })));
});
