import { TestBed } from '@angular/core/testing';

import { BizzappsService } from './bizzapps.service';

describe('BizzappsService', () => {
  let service: BizzappsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BizzappsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});