import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BizzButtonComponent } from './button.component';

describe('BizzButtonComponent', () => {
  let component: BizzButtonComponent;
  let fixture: ComponentFixture<BizzButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BizzButtonComponent]
    });
    fixture = TestBed.createComponent(BizzButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
