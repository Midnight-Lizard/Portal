import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { hot, cold } from 'jasmine-marbles';
import { Observable } from 'rxjs';

import { nameOfClass, TestSchedulerStub } from 'testing';
import { InfoActionTypes, NotifyUser } from 'core';
import { SchemesTestingModule } from '../schemes.testing.module';
import * as Act from './schemes.actions';
import { SchemesAction as Action, SchemesActionTypes as ActionType } from './schemes.action-sets';
import { SchemesEffects } from './schemes.effects';
import { SchemesService } from '../backend/schemes.service';

describe(nameOfClass(SchemesEffects), function ()
{
    let effects: SchemesEffects;
    let actions$: Observable<Action>;

    beforeEach(() =>
    {
        const serviceStub = jasmine.createSpyObj<SchemesService>('schemesServiceStub',
            Object.keys(SchemesService.prototype));
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
                const testId = 'test', testLikes = 123;

                actions$ = hot('-a', { a: new Act.LikeScheme({ id: testId }) });
                // schemesService.likeScheme.and.returnValue(cold('-r|', { r: { likes: testLikes } }));

                const nextAction = cold('-(en)', {
                    e: new Act.LikeSchemeFailed({ id: testId }),
                    n: jasmine.any(NotifyUser)
                });
                expect(effects.likeScheme$).toBeObservable(nextAction);
            });
    });
});
