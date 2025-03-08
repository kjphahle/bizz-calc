import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BizzclassComponent } from './bizzclass.component';

describe('BizzclassComponent', () => {
  let component: BizzclassComponent;
  let fixture: ComponentFixture<BizzclassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BizzclassComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BizzclassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
