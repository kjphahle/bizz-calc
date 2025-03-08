import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BizzmoneyComponent } from './bizzmoney.component';

describe('BizzmoneyComponent', () => {
  let component: BizzmoneyComponent;
  let fixture: ComponentFixture<BizzmoneyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BizzmoneyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BizzmoneyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
