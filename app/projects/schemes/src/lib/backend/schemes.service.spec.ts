import { TestBed, inject } from '@angular/core/testing';
import { TransferState } from '@angular/platform-browser';
import { Apollo } from 'apollo-angular';
import { HttpLink, HttpLinkModule } from 'apollo-angular-link-http';

import { nameOfClass, TestSchedulerStub } from 'testing';
import { SettingsService, AuthRootState } from 'core';

import { SchemesService } from './schemes.service';
import { SchemeSide } from '../model/scheme-side';
import { SchemesList } from '../model/schemes-lists';
import { searchQuery, detailsQuery } from './schemes.queries';
import { Subject, BehaviorSubject } from 'rxjs';
import { Store } from '@ngrx/store';
import { HttpClient } from '@angular/common/http';
import { HueFilter } from '../model/hue-filter';

describe(nameOfClass(SchemesService), function (this: {
    apolloStub: jasmine.SpyObj<Apollo>,
    httpLinkStub: jasmine.SpyObj<HttpLink>,
    schemesService: SchemesService
})
{
    beforeEach(() =>
    {
        this.apolloStub = jasmine.createSpyObj<Apollo>('ApolloStub',
            ['query', 'create']);
        this.apolloStub.query.and.returnValue(new Subject());

        TestBed.configureTestingModule({
            imports: [HttpLinkModule],
            providers: [
                SchemesService, SettingsService, TransferState,
                { provide: Apollo, useValue: this.apolloStub },
                { provide: HttpClient, useValue: {} },
                {
                    provide: Store, useValue: new BehaviorSubject<AuthRootState>({
                        AUTH:
                        {
                            user: null,
                            system: { access_token: '' }
                        }
                    })
                }
            ]
        });

        this.schemesService = TestBed.get(SchemesService) as SchemesService;

        TestSchedulerStub.init();
    });

    it('should use apollo to search schemes', () =>
    {
        const variables = {
            query: '231',
            side: SchemeSide.Dark,
            list: SchemesList.Full,
            bg: HueFilter.Blue,
            pageSize: 42,
            cursor: '321',
            currentUserId: '123'
        };
        this.schemesService.getPublicSchemes(
            { query: variables.query, side: variables.side, bg: variables.bg },
            variables.list, variables.pageSize,
            { claims: { sub: variables.currentUserId } } as any,
            variables.cursor)
            .subscribe().unsubscribe();
        expect(this.apolloStub.query).toHaveBeenCalledWith({
            query: searchQuery, variables
        });
    });

    it('should use apollo to get schemes details', () =>
    {
        const variables = { id: 'test-id', currentUserId: '123' };
        this.schemesService.getPublicSchemeDetails(variables.id, {
            claims: {
                sub: variables.currentUserId
            }
        } as any).subscribe().unsubscribe();
        expect(this.apolloStub.query).toHaveBeenCalledWith({
            query: detailsQuery, variables
        });
    });

});
