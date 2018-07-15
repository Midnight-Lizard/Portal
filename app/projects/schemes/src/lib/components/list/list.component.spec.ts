import { ComponentFixture, TestBed, inject, fakeAsync } from '@angular/core/testing';
import { InfiniteScrollModule, InfiniteScrollDirective } from 'ngx-infinite-scroll';
import { By } from '@angular/platform-browser';
import { MatButton } from '@angular/material';
import { getTestScheduler } from 'jasmine-marbles';
import { TestScheduler } from 'rxjs/testing';
import { Store } from '@ngrx/store';

import { nameOfClass, TestSchedulerStub, click } from 'testing';
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

describe(nameOfClass(SchemesListComponent), function (this: { schemes: PublicScheme[] })
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
            imports: [SchemesTestingModule.forRoot(), InfiniteScrollModule],
        }).compileComponents();
    }));

    beforeEach(fakeAsync(() =>
    {
        fixture = TestBed.createComponent(SchemesListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    beforeEach(inject([Store, SchemesService],
        (store$: Store<SchemesRootState>, schemesService: SchemesService) =>
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
            spyOn(store$, 'dispatch');
        }));

    it('should create', () =>
    {
        expect(component).toBeTruthy();
    });

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

    it(`should dispatch LoadNextSchemesChunk on window scroll`, (done: DoneFn) => inject(
        [Store], (store$: Store<SchemesRootState>) =>
        {
            fixture.debugElement
                .query(By.css('mat-grid-list')).nativeElement
                .scrollIntoView({ behavior: 'instant' });
            fixture.detectChanges();
            setTimeout(() =>
            {
                TestSchedulerStub.flush();
                expect(store$.dispatch).toHaveBeenCalledWith(new Act.LoadNextSchemesChunk());
                done();
            }, 10);
        })()
    );
});
