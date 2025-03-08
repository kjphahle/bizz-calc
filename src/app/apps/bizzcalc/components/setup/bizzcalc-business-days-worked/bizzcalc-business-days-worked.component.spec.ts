import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BizzcalcBusinessDaysWorkedComponent } from './bizzcalc-business-days-worked.component';

describe('BizzcalcBusinessDaysWorkedComponent', () => {
  let component: BizzcalcBusinessDaysWorkedComponent;
  let fixture: ComponentFixture<BizzcalcBusinessDaysWorkedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BizzcalcBusinessDaysWorkedComponent]
    });
    fixture = TestBed.createComponent(BizzcalcBusinessDaysWorkedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
