import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BaseAssumptionModalComponent } from './base-assumption-modal.component';

describe('BaseAssumptionModalComponent', () => {
  let component: BaseAssumptionModalComponent;
  let fixture: ComponentFixture<BaseAssumptionModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BaseAssumptionModalComponent]
    });
    fixture = TestBed.createComponent(BaseAssumptionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
