import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BizzbeanActionButtonsComponent } from './bizzbean-action-buttons.component';

describe('BizzbeanActionButtonsComponent', () => {
  let component: BizzbeanActionButtonsComponent;
  let fixture: ComponentFixture<BizzbeanActionButtonsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BizzbeanActionButtonsComponent]
    });
    fixture = TestBed.createComponent(BizzbeanActionButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
