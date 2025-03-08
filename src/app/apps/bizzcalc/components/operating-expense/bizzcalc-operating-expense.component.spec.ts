import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperatingExpenseComponent } from './bizzcalc-operating-expense.component';

describe('OperatingExpenseComponent', () => {
  let component: OperatingExpenseComponent;
  let fixture: ComponentFixture<OperatingExpenseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OperatingExpenseComponent]
    });
    fixture = TestBed.createComponent(OperatingExpenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
