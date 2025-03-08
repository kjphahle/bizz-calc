import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OperatingExpensesModalComponent } from './operating-expenses-modal.component';

describe('OperatingExpensesModalComponent', () => {
  let component: OperatingExpensesModalComponent;
  let fixture: ComponentFixture<OperatingExpensesModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OperatingExpensesModalComponent],
    });
    fixture = TestBed.createComponent(OperatingExpensesModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
