import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BizzcalcSetupComponent } from './bizzcalc-setup.component';

describe('BizzcalcSetupComponent', () => {
  let component: BizzcalcSetupComponent;
  let fixture: ComponentFixture<BizzcalcSetupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BizzcalcSetupComponent]
    });
    fixture = TestBed.createComponent(BizzcalcSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
