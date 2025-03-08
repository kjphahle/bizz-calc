import { TestBed } from '@angular/core/testing';

import { BizzclassService } from './bizzclass.service';

describe('BizzclassService', () => {
  let service: BizzclassService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BizzclassService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
