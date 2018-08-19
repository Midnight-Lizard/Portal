import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { delay, first } from 'rxjs/operators';

import { SchemesFilters } from '../model/schemes-filters';
import { PublicScheme, PublicSchemeId, PublicSchemeDetails } from '../model/public-scheme';
import { ScreenshotSize } from '../model/screenshot';
import { SchemeSide } from '../model/scheme-side';
import { SchemesList } from '../model/schemes-lists';
import { SchemesServiceStub } from './schemes.service.stub';

@Injectable()
export class SchemesService
{
    private static readonly stub = new SchemesServiceStub();

    constructor() { }

    public getPublicSchemes(filters: SchemesFilters, list: SchemesList, pageSize: number, cursor?: string | null)
    {
        return SchemesService.stub.getPublicSchemes(filters, list, pageSize, cursor);
    }

    public getPublicSchemeDetails(publicSchemeId: PublicSchemeId)
    {
        return SchemesService.stub.getPublicSchemeDetails(publicSchemeId);
    }
}
