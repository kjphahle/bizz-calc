import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BizzCalcReportsPageComponent } from './bizz-calc-reports-page.component';

describe('BizzCalcReportsPageComponent', () => {
  let component: BizzCalcReportsPageComponent;
  let fixture: ComponentFixture<BizzCalcReportsPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BizzCalcReportsPageComponent]
    });
    fixture = TestBed.createComponent(BizzCalcReportsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
