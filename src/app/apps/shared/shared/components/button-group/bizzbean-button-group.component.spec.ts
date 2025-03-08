import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BizzbeanButtonGroupComponent } from './bizzbean-button-group.component';

describe('BizzbeanButtonGroupComponent', () => {
  let component: BizzbeanButtonGroupComponent;
  let fixture: ComponentFixture<BizzbeanButtonGroupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BizzbeanButtonGroupComponent]
    });
    fixture = TestBed.createComponent(BizzbeanButtonGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
