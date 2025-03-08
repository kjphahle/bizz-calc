import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BizzbeanFormLabelComponent } from './bizzbean-form-label.component';

describe('BizzbeanFormLabelComponent', () => {
  let component: BizzbeanFormLabelComponent;
  let fixture: ComponentFixture<BizzbeanFormLabelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BizzbeanFormLabelComponent]
    });
    fixture = TestBed.createComponent(BizzbeanFormLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
