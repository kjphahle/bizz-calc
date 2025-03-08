import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BizzcalcRevenueCalculatorComponent } from './bizzcalc-revenue-calculator.component';

describe('RevenueCalculatorComponent', () => {
  let component: BizzcalcRevenueCalculatorComponent;
  let fixture: ComponentFixture<BizzcalcRevenueCalculatorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BizzcalcRevenueCalculatorComponent]
    });
    fixture = TestBed.createComponent(BizzcalcRevenueCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
