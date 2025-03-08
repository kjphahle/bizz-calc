import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BizzcalcHeaderComponent } from './bizzcalc-header.component';

describe('BizzcalcHeaderComponent', () => {
  let component: BizzcalcHeaderComponent;
  let fixture: ComponentFixture<BizzcalcHeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BizzcalcHeaderComponent]
    });
    fixture = TestBed.createComponent(BizzcalcHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
