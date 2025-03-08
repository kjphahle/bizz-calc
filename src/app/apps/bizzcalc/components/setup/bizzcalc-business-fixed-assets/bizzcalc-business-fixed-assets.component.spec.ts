import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BizzcalcBusinessFixedAssetsComponent } from './bizzcalc-business-fixed-assets.component';

describe('BizzcalcBusinessFixedAssetsComponent', () => {
  let component: BizzcalcBusinessFixedAssetsComponent;
  let fixture: ComponentFixture<BizzcalcBusinessFixedAssetsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BizzcalcBusinessFixedAssetsComponent]
    });
    fixture = TestBed.createComponent(BizzcalcBusinessFixedAssetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
