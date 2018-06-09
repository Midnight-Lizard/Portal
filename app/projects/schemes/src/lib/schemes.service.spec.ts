import { TestBed, inject } from '@angular/core/testing';

import { SchemesService } from './schemes.service';

describe('SchemesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SchemesService]
    });
  });

  it('should be created', inject([SchemesService], (service: SchemesService) => {
    expect(service).toBeTruthy();
  }));
});
