import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HolidaysModalComponent } from './fixed-assets-modal.component';

describe('HolidaysModalComponent', () => {
  let component: HolidaysModalComponent;
  let fixture: ComponentFixture<HolidaysModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HolidaysModalComponent]
    });
    fixture = TestBed.createComponent(HolidaysModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
