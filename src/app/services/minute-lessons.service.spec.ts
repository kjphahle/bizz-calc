import { TestBed } from '@angular/core/testing';

import { MinuteLessonsService } from './minute-lessons.service';

describe('MinuteLessonsService', () => {
  let service: MinuteLessonsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MinuteLessonsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
