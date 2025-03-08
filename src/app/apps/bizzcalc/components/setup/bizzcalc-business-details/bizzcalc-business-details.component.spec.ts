import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BizzcalcBusinessDetailsComponent } from './bizzcalc-business-details.component';

describe('BizzcalcBusinessDetailsComponent', () => {
  let component: BizzcalcBusinessDetailsComponent;
  let fixture: ComponentFixture<BizzcalcBusinessDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BizzcalcBusinessDetailsComponent]
    });
    fixture = TestBed.createComponent(BizzcalcBusinessDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
