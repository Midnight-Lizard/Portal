import { TestBed } from '@angular/core/testing';

import { nameOfClass } from 'testing';

import { ImpressionsService } from './impressions.service';

describe(nameOfClass(ImpressionsService), () =>
{
    beforeEach(() => TestBed.configureTestingModule({}));

    it('should be created', () =>
    {
        const service: ImpressionsService = TestBed.get(ImpressionsService);
        expect(service).toBeTruthy();
    });
});
