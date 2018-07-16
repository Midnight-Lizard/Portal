import { ComponentFixture, TestBed, inject, fakeAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MatButton } from '@angular/material';
import { Store } from '@ngrx/store';

import { nameOfClass, TestSchedulerStub, click } from 'testing';
import { SchemeDetailsComponent } from './details.component';
import { SchemesTestingModule } from '../../schemes.testing.module';
import { SchemesService } from '../../backend/schemes.service';
import * as Act from '../../store/schemes.actions';
import { SchemesRootState } from '../../store/schemes.state';
import { PublicSchemeDetails } from '../../model/public-scheme';

describe(nameOfClass(SchemeDetailsComponent), function ()
{
    let component: SchemeDetailsComponent;
    let fixture: ComponentFixture<SchemeDetailsComponent>;

    beforeEach(fakeAsync(() =>
    {
        TestSchedulerStub.init();
        TestBed.configureTestingModule({
            declarations: [SchemeDetailsComponent],
            imports: [SchemesTestingModule.forRoot()]
        }).compileComponents();
    }));

    beforeEach(() =>
    {
        fixture = TestBed.createComponent(SchemeDetailsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });


    describe('After Scheme loaded', function (this: { scheme: PublicSchemeDetails })
    {
        beforeEach(inject([Store, SchemesService],
            (store$: Store<SchemesRootState>, schemesService: SchemesService) =>
            {
                schemesService
                    .getPublicSchemeDetails('test')
                    .subscribe(result =>
                    {
                        this.scheme = result;
                        store$.dispatch(new Act.CurrentSchemeChanged({ currentScheme: result }));
                    });
                TestSchedulerStub.flush();
                fixture.detectChanges();
                spyOn(store$, 'dispatch');
            }));

        it(`should dispatch LikeScheme or DislikeScheme action on click`, inject(
            [Store], (store$: Store<SchemesRootState>) =>
            {
                const likeButton = fixture.debugElement
                    .queryAll(By.directive(MatButton))[0];
                click(likeButton);
                fixture.detectChanges();
                const expectedAction = this.scheme.liked
                    ? new Act.DislikeScheme(this.scheme)
                    : new Act.LikeScheme(this.scheme);
                expect(store$.dispatch).toHaveBeenCalledWith(expectedAction);
            }));

        it(`should dispatch correct Favorites management action on click`, inject(
            [Store], (store$: Store<SchemesRootState>) =>
            {
                const favoritesButton = fixture.debugElement
                    .queryAll(By.directive(MatButton))[1];
                click(favoritesButton);
                fixture.detectChanges();
                const expectedAction = this.scheme.favorited
                    ? new Act.RemoveSchemeFromFavorites(this.scheme)
                    : new Act.AddSchemeToFavorites(this.scheme);
                expect(store$.dispatch).toHaveBeenCalledWith(expectedAction);
            }));

        it(`should not display loading when there is a scheme`, inject(
            [Store], (store$: Store<SchemesRootState>) =>
            {
                expectLoadingElementDisplayToBe(fixture, 'none');
            }));
    });

    it(`should display loading when there is no scheme`, inject(
        [Store], (store$: Store<SchemesRootState>) =>
        {
            expectLoadingElementDisplayToBe(fixture, 'block');
        }));
});

function expectLoadingElementDisplayToBe(fixture: ComponentFixture<SchemeDetailsComponent>, display: string)
{
    const loadingElement = fixture.debugElement.query(By.css('common-loading')).nativeElement as HTMLElement;
    const computedStyle = loadingElement.ownerDocument.defaultView.getComputedStyle(loadingElement);
    expect(computedStyle.display).toBe(display);
}
