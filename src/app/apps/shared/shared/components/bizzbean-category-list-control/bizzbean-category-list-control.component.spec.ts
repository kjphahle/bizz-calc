import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BizzbeanCategoryListControlComponent } from './bizzbean-category-list-control.component';

describe('BizzbeanCategoryListControlComponent', () => {
  let component: BizzbeanCategoryListControlComponent;
  let fixture: ComponentFixture<BizzbeanCategoryListControlComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BizzbeanCategoryListControlComponent]
    });
    fixture = TestBed.createComponent(BizzbeanCategoryListControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
