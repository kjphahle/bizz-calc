import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BizzCalcIndexComponent } from './bizz-calc-index.component';

describe('BizzCalcIndexComponent', () => {
  let component: BizzCalcIndexComponent;
  let fixture: ComponentFixture<BizzCalcIndexComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BizzCalcIndexComponent]
    });
    fixture = TestBed.createComponent(BizzCalcIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
