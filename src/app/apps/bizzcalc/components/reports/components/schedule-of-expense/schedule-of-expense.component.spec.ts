import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleOfExpenseComponent } from './schedule-of-expense.component';

describe('ScheduleOfExpenseComponent', () => {
  let component: ScheduleOfExpenseComponent;
  let fixture: ComponentFixture<ScheduleOfExpenseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ScheduleOfExpenseComponent]
    });
    fixture = TestBed.createComponent(ScheduleOfExpenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
