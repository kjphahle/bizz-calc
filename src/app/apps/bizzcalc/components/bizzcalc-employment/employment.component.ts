import { AfterViewInit, Component, Input, SimpleChanges } from '@angular/core';
import { ICustomMonths } from '../../models/custom-months';
import {
  faArrowAltCircleRight,
  faArrowCircleLeft,
} from '@fortawesome/free-solid-svg-icons';
import { Employee } from '../../models/Employee';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BizzCalcService } from '../../services/bizz-calc.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EmploymentModalComponent } from '../setup/modals/employment-modal/employment-modal.component';
import { take } from 'rxjs/operators';
import { BaseAssumptionModalComponent } from '../setup/modals/base-assumption-modal/base-assumption-modal.component';

@Component({
  selector: 'app-employment',
  templateUrl: './employment.component.html',
  styleUrls: ['./employment.component.scss'],
})
export class EmploymentComponent implements AfterViewInit {
  @Input() public saveClicked: boolean;
  public startDate = this.bizzCalcService.setUpStartDate;
  modalRef: NgbModalRef;
  //Employment details

  initialMonthNum = 1;
  employmentMonthNum: ICustomMonths;
  pageInitialised: boolean = false;
  baseRateMonthNum: ICustomMonths;
  baseRateReviewMonth = 2;
  faArrowCircleLeft = faArrowCircleLeft;
  faArrowAltCircleRight = faArrowAltCircleRight;
  employees: Employee[] = [];
  selectedItem: any;

  public employmentForm: FormGroup;
  private pageNumber = 1;

  public customMonths: any[] = [];
  public baseRateCustomMonths: any[] = [];
  public defaultMonthNumber = 2;

  constructor(
    private formBuilder: FormBuilder,
    private bizzCalcService: BizzCalcService,
    private modalService: NgbModal
  ) {
    this.bizzCalcService.getDaysWorked().subscribe();
  }
  ngAfterViewInit(): void {
    this.pageInitialised = true;
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['saveClicked'].currentValue === true) {
      if (this.employmentForm.valid) {
        const _employees = { UserId: 82452, Employees: this.employees };
        this.bizzCalcService.PostEmployees(_employees).subscribe({
          next: (response) => {
            console.log(response);
            this.bizzCalcService.showToastMessage(
              '',
              '',
              'employment details saved successfully',
              3000
            );
          },
          error: (error) => {
            console.error(error);
            this.bizzCalcService.showToastMessage(
              '',
              '',
              error.message,
              3000
            );
          },
        });
      }
    }
  }

  openDeleteModal(employee: any, content: any) {
    this.selectedItem = employee;
    this.selectedItem.type = employee?.jobTitle ? 'employee' : 'expense';
    this.modalService.open(content);
  }

  deleteEmployee() {
    // const index = this.employees.findIndex(
    //   (employee) => employee.Id === this.selectedItem?.Id
    // );
    // if (index !== -1) {
    //   this.employees.splice(index, 1);
    // }
    // this.modalService.dismissAll();
    // this.selectedItem = {};
  }

  saveEmployee() {
    // Access the input data and perform your desired actions
    // const idExists = this.employees.some(
    //   (employee) => employee.Id === this.employee.Id
    // );
    // if (idExists) {
    //   console.log('Employee with the same ID already exists');
    //   this.employee = {} as Employee;
    //   return;
    // }
    // let IdCounter = this.employees.length + 1;
    // this.employee.Id = IdCounter;
    // this.employees.push(this.employee);
    // console.log(this.employee);
    // this.employee = {} as Employee;
    // Add your logic to save the data or perform any other operations
  }

  ngOnInit(): void {
    this.employmentForm = this.formBuilder.nonNullable.group({
      jobTitle: ['', Validators.required],
      EmploymentMonth: [this.initialMonthNum, Validators.required],
      EmploymentReviewMonth: [this.initialMonthNum + 1, Validators.required],
      NumberOfEmployees: [
        null,
        [Validators.required, Validators.min(1), Validators.max(100)],
      ],
      EmployeeSalary: [null, [Validators.required, Validators.min(1)]],
      ReviewMonth: [this.baseRateReviewMonth, Validators.required],
      ReviewPercentage: [0, [Validators.min(-99), Validators.max(100)]],

      PageNumber: [0, Validators.required],
    });

    const startingMonth = this.bizzCalcService.getMonthNumber();
    this.customMonths =
      this.bizzCalcService.configureMonthsArray(startingMonth);

    this.employmentMonthNum = this.customMonths[0];
    const startMonth = startingMonth + 1;
    this.baseRateCustomMonths = this.bizzCalcService.configureMonthsArray(
      startMonth > 12 ? 1 : startMonth
    );

    this.initialMonthNum = this.baseRateCustomMonths[0].monthNo;

    this.defaultMonthNumber = this.bizzCalcService.getMonthNumber() + 1;
  }

  onArrowCircleRightReviewMonthClicked(event: ICustomMonths): void {
    if (this.pageInitialised) {
      const value = this.employmentForm.get('EmploymentReviewMonth')?.value;
      this.employmentForm.get('EmploymentReviewMonth')?.setValue(value + 1);
      this.baseRateReviewMonth = value + 1;

      // employmentForm.get('ReviewMonth')
      //
      // this.defaultMonthNumber += 1;
      // this.baseRateCustomMonths = this.bizzCalcService.configureMonthsArray(
      //   this.defaultMonthNumber > 12 ? 1 : this.defaultMonthNumber
      // );
    }
  }

  preventNonNumericInput(event: KeyboardEvent): void {
    const allowedKeys = ['Backspace', 'ArrowLeft', 'ArrowRight', 'Tab', '-']; // Add '-' for negative numbers
    const key = event.key;

    // Allow navigation and editing keys
    if (allowedKeys.includes(key)) {
      return;
    }

    // Prevent non-numeric input
    if (!/^\d$/.test(key)) {
      event.preventDefault();
    }
  }


  onArrowCircleLeftReviewMonthClicked(event: ICustomMonths): void {
    if (this.pageInitialised) {
      const currentMonth = this.employmentForm
        .get('EmploymentReviewMonth')
        .value;
      this.employmentForm.get('EmploymentReviewMonth')?.setValue(currentMonth -1);
      this.baseRateReviewMonth = currentMonth - 1;
    }
  }

  onArrowCircleRightClicked(event: ICustomMonths): void {
    this.employmentMonthNum = event;
    this.employmentForm
      .get('EmploymentMonth')
      .setValue(this.employmentMonthNum.monthNo);
    //
    // this.baseRateCustomMonths = this.bizzCalcService.configureMonthsArray(
    //   this.baseRateReviewMonth > 12 ? 1 : this.baseRateReviewMonth
    // );
    const currentEmploymentMonth = this.employmentForm.get('EmploymentMonth')?.value;
    if(currentEmploymentMonth !== 12) {
      this.employmentForm.get('EmploymentReviewMonth')?.setValue(currentEmploymentMonth + 1);
    }
    this.baseRateReviewMonth += 1;
  }

  onArrowCircleLeftClicked(event: ICustomMonths): void {
    if (this.pageInitialised) {
      this.employmentMonthNum = event;
      this.employmentForm
        .get('EmploymentMonth')
        .setValue(this.employmentMonthNum?.monthNo);
      this.baseRateReviewMonth -= 1;
      // this.defaultMonthNumber -= 1;
      // this.baseRateCustomMonths = this.bizzCalcService.configureMonthsArray(
      //   this.defaultMonthNumber > 12 ? 1 : this.defaultMonthNumber
      // );

      const EmploymentMonth = this.employmentForm.get('EmploymentMonth')?.value;
      if(EmploymentMonth > 0) {
        this.employmentForm.get('EmploymentReviewMonth')?.setValue(EmploymentMonth + 1);
      }
    }
  }

  onBaseRateArrowCircleRightClicked(event: ICustomMonths): void {
    if (this.pageInitialised) {
      this.baseRateMonthNum = event;
      this.employmentForm
        .get('EmploymentMonth')
        .setValue('mth - ' + this.baseRateMonthNum.monthNo);
    }
  }

  onBaseRateArrowCircleLeftClicked(event: ICustomMonths): void {
    if (this.pageInitialised) {
      this.baseRateMonthNum = event;
      this.employmentForm
        .get('EmploymentMonth')
        .setValue('mth - ' + this.baseRateMonthNum.monthNo);
    }
  }

  public onAddPositionClicked(): void {
    if (this.employmentForm.valid) {
      // Add or update employee in the list
      const employee = this.createEmployeeFromForm();
      const empIndex = this.employees.findIndex(e => e.EmployeeName === employee.EmployeeName);

      if (empIndex !== -1) {
        this.employees[empIndex] = employee;
        this.showToast('Employee updated successfully.');
      } else {
        this.employees.push(employee);
        this.showToast('employee added ');
      }

      // Clear the form after successful addition
      this.employmentForm.reset();
    } else {
      // Mark all controls as touched to show validation errors
      this.employmentForm.markAllAsTouched();
    }
  }


  private createEmployeeFromForm(): Employee {
    return {
      EmployeeName: this.employmentForm.get('jobTitle')?.value,
      MonthEmployed: this.employmentForm.get('EmploymentMonth')?.value,
      Amount: this.employmentForm.get('EmployeeSalary')?.value,
      Qty: this.employmentForm.get('NumberOfEmployees')?.value,
      AdjustmentPerc: this.employmentForm.get('ReviewPercentage')?.value,
      ReviewMonth: this.employmentForm.get('EmploymentReviewMonth')?.value,
      pageNumber: this.employmentForm.get('PageNumber')?.value,
    };
  }

  private showToast(message: string, type: 'success' | 'error' | '' = ''): void {
    this.bizzCalcService.showToastMessage(type, '', message, 3000);
  }


  public openModalWithDynamicContent() {
    const modalRef = this.modalService.open(BaseAssumptionModalComponent, {
      backdropClass: 'custom-backdrop',
    });

    modalRef.componentInstance.title = 'employment';
    modalRef.componentInstance.contentHtml = `
    <div class="custom-modal-content">
    <p>To determine the employment expenses of your business, enter the data required in the blue fields.</p>

    <ul>
      <li>
      from the slider, select the month of employment.</li>
      <li>name the job title – for example, accountant.</li>
      <li>state how many employees will fill that position.</li>
      <li>set the monthly cost-to-company.</li>
      <li>select the review month from the slider for that job title and apply a % change to the base rate (not mandatory).</li>
      <li>click on the view data button to review and amend your decisions, if necessary.</li>
      <li>save the data.</li>
    </ul>
    </div>



    `;
  }



  public onViewBaseAssumption(): void {
  // Hardcoded modal message
  const hardcodedMessage = `employment
To determine the employment expenses of your business, enter the data required in the blue fields.
from the slider, select the month of employment
name the job title – for example, accountant
state how many employees will fill that position
set the monthly cost-to-company
select the review month from the slider for that job title and apply a % change to the base rate (not mandatory)
click on the view data button to review and amend your decisions, if necessary
save the data`;

  // Open modal with hardcoded message
  this.modalRef = this.modalService.open(EmploymentModalComponent, {
    ariaLabelledBy: 'modal-basic-title',
    backdropClass: 'custom-backdrop',
  });

  // Pass hardcoded message to the modal component
  this.modalRef.componentInstance.message = hardcodedMessage;

  // Handle modal result
  this.modalRef.result
    .then((reason: { mode: number; data: any }) => {
      console.dir(reason);
      if (reason.mode === 0) {
        this.employees = this.employees.filter(
          (item) => item.EmployeeName !== reason.data.EmployeeName
        );
      } else if (reason.mode === 1) {
        this.employmentForm.get('jobTitle').setValue(reason.data.EmployeeName);
        this.employmentForm
          .get('EmploymentMonth')
          .setValue(reason.data.MonthEmployed);
        this.employmentForm
          .get('EmploymentReviewMonth')
          .setValue(reason.data.ReviewMonth);
        this.employmentForm
          .get('ReviewMonth')
          .setValue(reason.data.ReviewMonth);
        this.employmentForm
          .get('NumberOfEmployees')
          .setValue(reason.data.Qty);
        this.employmentForm
          .get('EmployeeSalary')
          .setValue(reason.data.Amount);
        this.employmentForm
          .get('ReviewMonth')
          .setValue(reason.data.MonthEmployed);
        this.employmentForm
          .get('ReviewPercentage')
          .setValue(reason.data.AdjustmentPerc);
        this.employmentForm
          .get('PageNumber')
          .setValue(reason.data.pageNumber);
      }
    })
    .catch((reason: any) => {
      console.error('Modal dismissed:', reason);
    });
}


  public onViewDataBtnClicked(): void {
    // if(this.employmentForm.invalid || this.employees.length === 0){
    //   return;
    // }
    this.modalRef = this.modalService.open(EmploymentModalComponent, {
      ariaLabelledBy: 'modal-basic-title',
      backdropClass: 'custom-backdrop',
    });

    this.modalRef.componentInstance.employees = this.employees;
    this.modalRef.result.then( (reason: { mode: number; data: any }) => {
      console.dir(reason)
    }
    ).catch((reason: any) => {
        if (reason.mode === 0) {
          this.employees = this.employees.filter(
            (item) => item.EmployeeName !== reason.data.EmployeeName
          );
        } else if (reason.mode === 1) {
          this.employmentForm.get('jobTitle').setValue(reason.data.EmployeeName);
          this.employmentForm
            .get('EmploymentMonth')
            .setValue(reason.data.MonthEmployed);
          this.employmentForm
            .get('EmploymentReviewMonth')
            .setValue(reason.data.ReviewMonth);
            this.employmentForm
            .get('ReviewMonth')
            .setValue(reason.data.ReviewMonth);
          this.employmentForm
            .get('NumberOfEmployees')
            .setValue(reason.data.Qty);
          this.employmentForm
            .get('EmployeeSalary')
            .setValue(reason.data.Amount);
          this.employmentForm
            .get('ReviewMonth')
            .setValue(reason.data.MonthEmployed);
          this.employmentForm
            .get('ReviewPercentage')
            .setValue(reason.data.AdjustmentPerc);
          this.employmentForm
            .get('PageNumber')
            .setValue(reason.data.pageNumber);
        }
    })
  }

  public onSaveBtnClicked(): void {
    console.log('Is form valid:', this.employmentForm.valid); // Log form validity

    if (!this.employmentForm.valid) {
      this.employmentForm.markAllAsTouched();
      console.log('Form is invalid. Please check the fields.'); // Log invalid form message
      return;
    }

    if (this.employees.length === 0) {
      console.log('No employees to process.');
      this.bizzCalcService.showToastMessage(
        'info',
        '',
        'No employees to process.',
        3000
      );
      return;
    }

    const employees = this.formatEmployees();
    this.bizzCalcService
      .PostEmployees(employees)
      .pipe(take(1))
      .subscribe({
        next: (data) => {
          this.bizzCalcService.showToastMessage(
            'contrast',
            '',
            'Employees details added.',
            3000
          );
        },
        error: (err) => {
          console.error('Error posting employee details:', err);
          this.bizzCalcService.showToastMessage(
            'error',
            '',
            'Failed to add employee details.',
            3000
          );
        },
      });
  }



  private formatEmployees() {
    const employees = [];
    this.employees.forEach((e, i) => {
      employees.push({
        EmployeeName: e.EmployeeName,
        MonthEmployed: e.MonthEmployed,
        Amount: e.Amount,
        Qty: e.Qty,
        AdjustmentPerc: e.AdjustmentPerc,
        ReviewMonth: e.ReviewMonth,
        PageNumber: i +1,
      });
    });
    return { Employees: employees };
  }

  public ShowTooltip(): void {}

  public convertDateFormat(dateString: string): string {
    const date = new Date(dateString);
    const day = ('0' + date.getDate()).slice(-2); // Ensure two digits
    const month = ('0' + (date.getMonth() + 1)).slice(-2); // Months are zero-based
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }
}
