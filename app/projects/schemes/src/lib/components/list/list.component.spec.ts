import { ComponentFixture, TestBed, inject, fakeAsync } from '@angular/core/testing';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { By } from '@angular/platform-browser';
import { MatButton, MatCard, MatDialog } from '@angular/material';
import { Store, select } from '@ngrx/store';
import { first } from 'rxjs/operators';
import { of } from 'rxjs';

import { nameOfClass, TestSchedulerStub, click, ActivatedRouteStub } from 'testing';
import { SchemesListComponent } from './list.component';
import { SchemesTestingModule } from '../../schemes.testing.module';
import { SchemeDetailsComponent } from '../details/details.component';
import { SchemesThumbnailsComponent } from '../thumbnails/thumbnails.component';
import { SchemesRootState } from '../../store/schemes.state';
import { SchemesService } from '../../backend/schemes.service';
import * as Act from '../../store/schemes.actions';
import { SchemeSide } from '../../model/scheme-side';
import { SchemesList } from '../../model/schemes-lists';
import { PublicScheme } from '../../model/public-scheme';

describe(nameOfClass(SchemesListComponent), function ()
{
    let component: SchemesListComponent;
    let fixture: ComponentFixture<SchemesListComponent>;

    beforeEach(fakeAsync(() =>
    {
        TestSchedulerStub.init();
        TestBed.overrideComponent(
            SchemesListComponent,
            {
                set: {
                    providers: [
                        { provide: 'scrollThrottleTime', useValue: 0 },
                        { provide: 'scrollContainerSelector', useValue: undefined },
                        { provide: 'searchScrollContainerSelectorFromRoot', useValue: false }]
                }
            }
        );
        TestBed.configureTestingModule({
            declarations: [
                SchemesListComponent, SchemeDetailsComponent, SchemesThumbnailsComponent
            ],
            imports: [SchemesTestingModule.forRoot(), InfiniteScrollModule]
        }).compileComponents();
    }));

    beforeEach(fakeAsync(() =>
    {
        fixture = TestBed.createComponent(SchemesListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    describe('Scheme cards', function (this: { schemes: PublicScheme[] })
    {
        beforeEach(inject([Store, SchemesService, Router],
            (store$: Store<SchemesRootState>, schemesService: SchemesService, router: Router) =>
            {
                schemesService
                    .getPublicSchemes({ name: '', side: SchemeSide.None }, SchemesList.Full, 4)
                    .subscribe(result =>
                    {
                        this.schemes = result.data;
                        store$.dispatch(new Act.FirstSchemesChunkLoaded(result));
                    });
                TestSchedulerStub.flush();
                fixture.detectChanges();
                spyOn(router, 'navigate');
                spyOn(store$, 'dispatch');
            }));

        it('should display cards for all test schemes', () =>
        {
            const cards = fixture.debugElement.queryAll(By.css('mat-card'));
            expect(cards.length).toEqual(this.schemes.length);
        });

        it(`should dispatch LikeScheme or DislikeScheme action on click`, inject(
            [Store], (store$: Store<SchemesRootState>) =>
            {
                const likeButton = fixture.debugElement
                    .queryAll(By.css('mat-card'))[0]
                    .queryAll(By.directive(MatButton))[0];
                click(likeButton);
                fixture.detectChanges();
                const expectedAction = this.schemes[0].liked
                    ? new Act.DislikeScheme(this.schemes[0])
                    : new Act.LikeScheme(this.schemes[0]);
                expect(store$.dispatch).toHaveBeenCalledWith(expectedAction);
            }));

        it(`should dispatch correct Favorites management action on click`, inject(
            [Store], (store$: Store<SchemesRootState>) =>
            {
                const favoritesButton = fixture.debugElement
                    .queryAll(By.css('mat-card'))[0]
                    .queryAll(By.directive(MatButton))[1];
                click(favoritesButton);
                fixture.detectChanges();
                const expectedAction = this.schemes[0].favorited
                    ? new Act.RemoveSchemeFromFavorites(this.schemes[0])
                    : new Act.AddSchemeToFavorites(this.schemes[0]);
                expect(store$.dispatch).toHaveBeenCalledWith(expectedAction);
            }));

        it(`should dispatch LoadNextSchemesChunk on scroll`, inject(
            [Store], (store$: Store<SchemesRootState>) =>
            {
                fixture.debugElement
                    .query(By.css('mat-grid-list')).nativeElement
                    .scrollIntoView({ behavior: 'instant', block: 'end' });
                // triggering scroll event manually since Chrome does this async
                (fixture.debugElement.nativeElement as HTMLElement)
                    .ownerDocument.defaultView
                    .dispatchEvent(new Event('scroll'));
                TestSchedulerStub.flush();
                fixture.detectChanges();
                expect(store$.dispatch).toHaveBeenCalledWith(new Act.LoadNextSchemesChunk());
            }));

        it(`should navigate to scheme details when clicked on the card`, inject(
            [Store, Router], (store$: Store<SchemesRootState>, router: Router) =>
            {
                const schemeCard = fixture.debugElement.query(By.directive(MatCard));
                click(schemeCard);
                fixture.detectChanges();
                store$.pipe(
                    select(x => x.SCHEMES.schemes.list),
                    first()
                ).subscribe(list =>
                {
                    const expectedParams: NavigationExtras = {
                        queryParamsHandling: 'preserve'
                    };
                    expect(router.navigate).toHaveBeenCalledWith(
                        ['schemes', 'index', list, this.schemes[0].id],
                        expectedParams);
                });
            }));
    });

    for (const done of [false, true, false, true])
    {
        it(`should toggle class '.show-loading' when 'done' changes to '${done}' in the store`, inject(
            [Store], (store$: Store<SchemesRootState>) =>
            {
                store$.dispatch(new Act.FirstSchemesChunkLoaded({ cursor: '', data: [], done }));
                fixture.detectChanges();
                expect(fixture.debugElement.classes['show-loading'])
                    .toBe(!done, `class '.show-loading' toggled incorrectly`);
            }));
    }

    describe('Scheme details dialog', function (this: {})
    {
        beforeEach(inject([MatDialog, Router], (dialog: MatDialog, router: Router) =>
        {
            spyOn(router, 'navigate');
            spyOn(dialog, 'open').and
                .returnValue({ beforeClose: () => of(true) });
        }));

        it(`should open scheme details when clicked on  card`, inject(
            [MatDialog, ActivatedRoute], (dialog: MatDialog, route: ActivatedRouteStub) =>
            {
                route.testParamMap = { id: 'test' };
                TestSchedulerStub.flush();
                expect(dialog.open).toHaveBeenCalledWith(
                    SchemeDetailsComponent, jasmine.any(Object));
            }));

        it(`should navigate to schemes list when dialog closes`, inject(
            [ActivatedRoute, Router, Store],
            (route: ActivatedRouteStub, router: Router, store$: Store<SchemesRootState>, ) =>
            {
                route.testParamMap = { id: 'test' };
                TestSchedulerStub.flush();
                store$.pipe(
                    select(x => x.SCHEMES.schemes.list),
                    first()
                ).subscribe(list =>
                {
                    const expectedParams: NavigationExtras = {
                        queryParamsHandling: 'preserve'
                    };
                    expect(router.navigate).toHaveBeenCalledWith(
                        ['schemes', 'index', list, ''],
                        expectedParams);
                });
            }));
    });
});
