import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BizzsparkComponent } from './bizzspark.component';

describe('BizzsparkComponent', () => {
  let component: BizzsparkComponent;
  let fixture: ComponentFixture<BizzsparkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BizzsparkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BizzsparkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
