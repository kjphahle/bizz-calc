import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BizzCalcLandingPageComponent } from './bizz-calc-landing-page.component';

describe('BizzCalcLandingPageComponent', () => {
  let component: BizzCalcLandingPageComponent;
  let fixture: ComponentFixture<BizzCalcLandingPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BizzCalcLandingPageComponent]
    });
    fixture = TestBed.createComponent(BizzCalcLandingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
