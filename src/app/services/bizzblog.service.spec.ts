import { TestBed } from '@angular/core/testing';

import { BizzblogService } from './bizzblog.service';

describe('BizzblogService', () => {
  let service: BizzblogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BizzblogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
