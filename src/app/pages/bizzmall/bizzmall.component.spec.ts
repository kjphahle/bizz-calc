import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BizzmallComponent } from './bizzmall.component';

describe('BizzmallComponent', () => {
  let component: BizzmallComponent;
  let fixture: ComponentFixture<BizzmallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BizzmallComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BizzmallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
