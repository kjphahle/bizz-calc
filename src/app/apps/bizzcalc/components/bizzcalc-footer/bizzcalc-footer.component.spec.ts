import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BizzcalcFooterComponent } from './bizzcalc-footer.component';

describe('BizzcalcFooterComponent', () => {
  let component: BizzcalcFooterComponent;
  let fixture: ComponentFixture<BizzcalcFooterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BizzcalcFooterComponent]
    });
    fixture = TestBed.createComponent(BizzcalcFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
