import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BizzbeanNavControlComponent } from './bizzbean-nav-control.component';

describe('BizzbeanNavControlComponent', () => {
  let component: BizzbeanNavControlComponent;
  let fixture: ComponentFixture<BizzbeanNavControlComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BizzbeanNavControlComponent]
    });
    fixture = TestBed.createComponent(BizzbeanNavControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
