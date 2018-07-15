import { TestBed, inject } from '@angular/core/testing';

import { nameOfClass } from 'testing';
import { SchemesService } from './schemes.service';

describe(nameOfClass(SchemesService), () =>
{
    beforeEach(() =>
    {
        TestBed.configureTestingModule({
            providers: [SchemesService]
        });
    });

    it('should be created', inject([SchemesService], (service: SchemesService) =>
    {
        expect(service).toBeTruthy();
    }));
});
