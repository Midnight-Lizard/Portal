import { TestBed, inject } from '@angular/core/testing';
import { TransferState } from '@angular/platform-browser';
import { Apollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular-link-http';

import { nameOfClass } from 'testing';
import { SettingsService } from 'core';

import { SchemesService } from './schemes.service';
import { SchemeSide } from '../model/scheme-side';
import { SchemesList } from '../model/schemes-lists';
import { searchQuery, detailsQuery } from './schemes.queries';
import { Subject } from 'rxjs';

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
        this.httpLinkStub = jasmine.createSpyObj<HttpLink>('HttpLinkStub',
            Object.keys(HttpLink.prototype));
        this.apolloStub.query.and.returnValue(new Subject());

        TestBed.configureTestingModule({
            providers: [
                SchemesService, SettingsService, TransferState,
                { provide: Apollo, useValue: this.apolloStub },
                { provide: HttpLink, useValue: this.httpLinkStub }
            ]
        });

        this.schemesService = TestBed.get(SchemesService) as SchemesService;

    });

    it('should create apollo client', () =>
    {
        expect(this.apolloStub.create).toHaveBeenCalledTimes(1);
    });

    it('should create HttpLink for GraphQL Api endpoint', () =>
    {
        expect(this.httpLinkStub.create).toHaveBeenCalledWith({ uri: jasmine.stringMatching(/query/) });
    });

    it('should use apollo to search schemes', () =>
    {
        const variables = {
            query: '231',
            side: SchemeSide.Dark,
            list: SchemesList.Full,
            pageSize: 42,
            cursor: '321',
            publisherId: '123'
        };
        this.schemesService.getPublicSchemes(
            { query: variables.query, side: variables.side },
            variables.list, variables.pageSize,
            { claims: { sub: variables.publisherId } } as any,
            variables.cursor);
        expect(this.apolloStub.query).toHaveBeenCalledWith({
            query: searchQuery, variables
        });
    });

    it('should use apollo to get schemes details', () =>
    {
        const variables = { id: 'test-id' };
        this.schemesService.getPublicSchemeDetails(variables.id);
        expect(this.apolloStub.query).toHaveBeenCalledWith({
            query: detailsQuery, variables
        });
    });

});
