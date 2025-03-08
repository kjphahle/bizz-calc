import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NextPrevButtonComponent } from './next-prev-button.component';

describe('NextPrevButtonComponent', () => {
  let component: NextPrevButtonComponent;
  let fixture: ComponentFixture<NextPrevButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NextPrevButtonComponent]
    });
    fixture = TestBed.createComponent(NextPrevButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
