import { TestBed } from '@angular/core/testing';

import { InterventiService } from './interventi.service';

describe('InterventiService', () => {
  let service: InterventiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InterventiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
