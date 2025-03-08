import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BizzcalcFundingCalculatorComponent } from './bizzcalc-funding-calculator.component';

describe('BizzcalcFundingCalculatorComponent', () => {
  let component: BizzcalcFundingCalculatorComponent;
  let fixture: ComponentFixture<BizzcalcFundingCalculatorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BizzcalcFundingCalculatorComponent]
    });
    fixture = TestBed.createComponent(BizzcalcFundingCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
