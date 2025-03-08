import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FundingCalculatorComponent } from './funding-calculator.component';

describe('FundingCalculatorComponent', () => {
  let component: FundingCalculatorComponent;
  let fixture: ComponentFixture<FundingCalculatorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FundingCalculatorComponent]
    });
    fixture = TestBed.createComponent(FundingCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
