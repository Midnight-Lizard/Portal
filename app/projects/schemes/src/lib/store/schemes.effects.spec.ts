import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { cold, hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';

import { InfoActionTypes, NotifyUser } from 'core';
import { nameOfClass, TestSchedulerStub } from 'testing';
import { SchemesTestingModule } from '../schemes.testing.module';
import { SchemesAction as Action, SchemesActionTypes as ActionType } from './schemes.action-sets';
import * as Act from './schemes.actions';
import { SchemesEffects } from './schemes.effects';


describe(nameOfClass(SchemesEffects), function ()
{
    let effects: SchemesEffects;
    let actions$: Observable<Action>;

    beforeEach(() =>
    {
        TestBed.configureTestingModule({
            imports: [SchemesTestingModule.forRoot()],
            providers: [
                SchemesEffects,
                provideMockActions(() => actions$)
            ]
        });
        TestSchedulerStub.init();
        effects = TestBed.get(SchemesEffects) as SchemesEffects;
    });

    describe(ActionType.LikeScheme, () =>
    {
        it(`should dispatch ${ActionType.LikeSchemeFailed} and ${
            InfoActionTypes.NotifyUser} actions when user is not signed in`, () =>
            {
                const testId = 'test';

                actions$ = hot('-l', { l: new Act.LikeScheme({ id: testId }) });

                const nextAction = cold('-(en)', {
                    e: new Act.LikeSchemeFailed({ id: testId }),
                    n: jasmine.any(NotifyUser)
                });
                expect(effects.likeScheme$).toBeObservable(nextAction);
            });
    });

    describe(ActionType.AddSchemeToFavorites, () =>
    {
        it(`should dispatch ${ActionType.AddSchemeToFavoritesFailed} and ${
            InfoActionTypes.NotifyUser} actions when user is not signed in`, () =>
            {
                const testId = 'test';

                actions$ = hot('-a', { a: new Act.AddSchemeToFavorites({ id: testId }) });

                const nextAction = cold('-(en)', {
                    e: new Act.AddSchemeToFavoritesFailed({ id: testId }),
                    n: jasmine.any(NotifyUser)
                });
                expect(effects.addSchemeToFavorites$).toBeObservable(nextAction);
            });
    });
});
