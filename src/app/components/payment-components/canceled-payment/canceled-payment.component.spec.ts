import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CanceledPaymentComponent } from './canceled-payment.component';

describe('CanceledPaymentComponent', () => {
  let component: CanceledPaymentComponent;
  let fixture: ComponentFixture<CanceledPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CanceledPaymentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CanceledPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
