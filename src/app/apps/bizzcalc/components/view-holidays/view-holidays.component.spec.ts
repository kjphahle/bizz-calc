import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewHolidaysComponent } from './view-holidays.component';

describe('ViewHolidaysComponent', () => {
  let component: ViewHolidaysComponent;
  let fixture: ComponentFixture<ViewHolidaysComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewHolidaysComponent]
    });
    fixture = TestBed.createComponent(ViewHolidaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
