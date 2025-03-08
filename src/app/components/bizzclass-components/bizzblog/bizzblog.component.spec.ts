import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BizzblogComponent } from './bizzblog.component';

describe('BizzblogComponent', () => {
  let component: BizzblogComponent;
  let fixture: ComponentFixture<BizzblogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BizzblogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BizzblogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
