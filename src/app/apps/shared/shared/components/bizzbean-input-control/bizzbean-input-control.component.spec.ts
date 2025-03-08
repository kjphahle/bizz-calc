import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BizzbeanInputControlComponent } from './bizzbean-input-control.component';

describe('BizzbeanInputControlComponent', () => {
  let component: BizzbeanInputControlComponent;
  let fixture: ComponentFixture<BizzbeanInputControlComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BizzbeanInputControlComponent]
    });
    fixture = TestBed.createComponent(BizzbeanInputControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
