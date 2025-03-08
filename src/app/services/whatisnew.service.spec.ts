import { TestBed } from '@angular/core/testing';

import { WhatisnewService } from './whatisnew.service';

describe('WhatisnewService', () => {
  let service: WhatisnewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WhatisnewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
