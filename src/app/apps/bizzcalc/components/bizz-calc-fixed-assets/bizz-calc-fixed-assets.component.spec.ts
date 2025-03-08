import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BizzCalcFixedAssetsComponent } from './bizz-calc-fixed-assets.component';

describe('BizzCalcFixedAssetsComponent', () => {
  let component: BizzCalcFixedAssetsComponent;
  let fixture: ComponentFixture<BizzCalcFixedAssetsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BizzCalcFixedAssetsComponent]
    });
    fixture = TestBed.createComponent(BizzCalcFixedAssetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
