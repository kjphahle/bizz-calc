import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmploymentModalComponent } from './employment-modal.component';

describe('EmploymentModalComponent', () => {
  let component: EmploymentModalComponent;
  let fixture: ComponentFixture<EmploymentModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmploymentModalComponent]
    });
    fixture = TestBed.createComponent(EmploymentModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
