import { expect as assume } from 'chai';
import { TestBed, fakeAsync, tick, inject, ComponentFixture, ComponentFixtureAutoDetect } from '@angular/core/testing';
import { NgForm, ReactiveFormsModule } from "@angular/forms";
import { By } from "@angular/platform-browser";
import { ActivatedRoute, Router, Params, NavigationExtras } from "@angular/router";
import { MatButtonToggleGroup, MatButtonToggle } from "@angular/material";
import { StoreModule, Store } from "@ngrx/store";

import { SchemesService } from "../backend/schemes.service";
import { SchemesFilters } from "../model/schemes.filters";
import { ActivatedRouteStub } from "../../test/stubs/activated-route.stub";
import { SchemesFilterComponent } from './filter.component';
import { nameof } from "../../test/utils/nameof";
import { click } from "../../test/utils/click.helper";
import { SchemesTestingModule } from "../schemes.testing-module";
import { SchemesList } from "../model/schemes.lists";
import { SchemesSide } from "../model/scheme.entry";
import { RouterStub } from "../../test/stubs/router.stub";
import { schemesReducer } from "../store/schemes.reducer";
import { initialState, SchemesFeature, RootState } from "../store/schemes.state";
import * as Act from "../store/schemes.actions";

let component: SchemesFilterComponent;
let fixture: ComponentFixture<SchemesFilterComponent>;

describe('SchemesFilterComponent', () =>
{
    beforeEach(fakeAsync(() =>
    {
        TestBed.configureTestingModule({
            declarations: [SchemesFilterComponent],
            imports: [
                SchemesTestingModule
            ],
            providers: [
                { provide: ComponentFixtureAutoDetect, useValue: true },
                { provide: Router, useClass: RouterStub }
            ]
        });
        fixture = TestBed.createComponent(SchemesFilterComponent);
        component = fixture.componentInstance;
        spyOn(TestBed.get(Router) as Router, "navigate");
    }));

    describe('Side toggle', () =>
    {
        beforeEach(fakeAsync(() =>
        {
            component.filtersForm.get("side")!.setValue(null);
            fixture.detectChanges();
            tick(300);
        }));

        for (let side in SchemesSide)
        {
            it(`should navigate correctly on [${side}] side toggle checked`, fakeAsync(inject(
                [Router], (router: Router) =>
                {
                    component.filtersForm.get("side")!.setValue(side);
                    fixture.detectChanges();
                    tick(300);
                    const expectedParams: NavigationExtras = {
                        queryParams: { sn: '', ss: side },
                        queryParamsHandling: 'merge'
                    };
                    expect(router.navigate).toHaveBeenCalledWith([], expectedParams);
                })));
        }
    });

    it('should navigate correctly when a text entered into the search box', fakeAsync(inject(
        [Router], (router: Router) =>
        {
            const testString = "test";
            component.filtersForm.get("name")!.setValue(testString);
            fixture.detectChanges();
            tick(300);
            const expectedParams: NavigationExtras = {
                queryParams: { sn: testString, ss: SchemesSide.none },
                queryParamsHandling: 'merge'
            };
            expect(router.navigate).toHaveBeenCalledWith([], expectedParams);
        })));

    it('should change form values when store filters value changes', fakeAsync(inject(
        [Store], (store$: Store<RootState>) =>
        {
            const testFiltersValue = { name: "test", side: SchemesSide.dark };
            store$.dispatch(new Act.SchemesCurrentPageLoaded({
                currPage: [], total: 0, list: SchemesList.full,
                filters: testFiltersValue,
                pageOptions: { pageIndex: 0, pageSize: 0 }
            }));
            fixture.detectChanges();
            tick(300);
            expect(component.filtersForm.value).toEqual(testFiltersValue);
        })));
});