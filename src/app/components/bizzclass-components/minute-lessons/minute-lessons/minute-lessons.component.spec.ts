import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinuteLessonsComponent } from './minute-lessons.component';

describe('MinuteLessonsComponent', () => {
  let component: MinuteLessonsComponent;
  let fixture: ComponentFixture<MinuteLessonsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MinuteLessonsComponent]
    });
    fixture = TestBed.createComponent(MinuteLessonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
