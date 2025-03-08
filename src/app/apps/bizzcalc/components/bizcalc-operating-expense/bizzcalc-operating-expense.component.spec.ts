import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BizzcalcOperatingExpenseComponent } from './bizzcalc-operating-expense.component';

describe('BizzcalcOperatingExpenseComponent', () => {
  let component: BizzcalcOperatingExpenseComponent;
  let fixture: ComponentFixture<BizzcalcOperatingExpenseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BizzcalcOperatingExpenseComponent]
    });
    fixture = TestBed.createComponent(BizzcalcOperatingExpenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
