import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BizzcalcComponent } from './bizzcalc.component';

describe('BizzcalcComponent', () => {
  let component: BizzcalcComponent;
  let fixture: ComponentFixture<BizzcalcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BizzcalcComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BizzcalcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
