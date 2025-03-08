import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BizzCalcService } from '../../../services/bizz-calc.service';
import { IDaysWorked, IHoliday } from '../../../models/days-worked.interface';
import { take } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  faCalculator,
  faArrowCircleLeft,
  faArrowAltCircleRight,
  faCalendar,
  faCamera,
  faChartLine,
  faCoins,
  faGear,
  faPencilAlt,
  faScroll,
  faTruck,
  faUsers,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { ICustomMonths } from '../../../models/custom-months';
// import { Employee } from '../../../models/Employee';

export interface Root {
  UserId: number;
  Employees: Employee[];
}

export interface Employee {
  EmploymentMonth: string;
  JobTitle?: string;
  NumberOfEmployees: number;
  EmployeeSalary: number;
  ReviewMonth: string;
  ReviewPercentage: number;
  PageNumber: number;
}

@Component({
  selector: 'app-bizzcalc-base-assumption',
  templateUrl: './bizzcalc-base-assumption.component.html',
  styleUrls: ['./bizzcalc-base-assumption.component.scss'],
})
export class BizzcalcBaseAssumptionComponent implements OnChanges, OnInit {
  @Input() public saveClicked: boolean;
  public startDate = this.bizzCalcService.setUpStartDate;
  //Employment details
  initialMonthNum = 1;
  employmentMonthNum: ICustomMonths;
  baseRateMonthNum: ICustomMonths;
  baseRateReviewMonth = this.initialMonthNum + 1;
  faArrowCircleLeft = faArrowCircleLeft;
  faArrowAltCircleRight = faArrowAltCircleRight;
  employees: Employee[] = [];
  selectedItem: any;

  public employmentForm: FormGroup;
  private pageNumber = 1;

  public customMonths: any[] = [];
  public baseRateCustomMonths: any[] = [];
  public defaultMonthNumber = 0;

  constructor(
    private formBuilder: FormBuilder,
    private bizzCalcService: BizzCalcService,
    private modalService: NgbModal
  ) {
    this.bizzCalcService.getDaysWorked().subscribe();
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['saveClicked'].currentValue === true) {
      if (this.employmentForm.valid) {
        const _employees = { UserId: 82452, Employees: this.employees };
        this.bizzCalcService.PostEmployees(_employees).subscribe({
          next: (response) => {
            console.log(response);
            this.bizzCalcService.showToastMessage(
              'success',
              '',
              'Employment details saved successfully.',
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

  public preventNonNumericInput(event: KeyboardEvent): void {
    const allowedKeys = ['Backspace', 'ArrowLeft', 'ArrowRight', 'Delete', 'Tab'];
  
    // Allow special keys like backspace, arrow keys, delete, and tab
    if (allowedKeys.includes(event.key)) {
      return;
    }
  
    // Allow only numeric keys (0-9)
    if (!/^[0-9]$/.test(event.key)) {
      event.preventDefault();
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
      EmploymentMonth: ['mth - ' + this.initialMonthNum, Validators.required],
      NumberOfEmployees: [
        null, // Default value
        [0,Validators.required, Validators.min(1), Validators.max(100)], // Validation rules
      ],
      EmployeeSalary: [0, Validators.required],
      ReviewMonth: [this.baseRateReviewMonth, Validators.required],
    
      ReviewPercentage: [
        null, // Default value
        [0,Validators.required, Validators.min(0), Validators.max(100)], // Validation rules
      ],
      PageNumber: [0, Validators.required],
    });

    const startingMonth = this.bizzCalcService.getMonthNumber();
    this.customMonths =
      this.bizzCalcService.configureMonthsArray(startingMonth);
    const startMonth = startingMonth + 1;
    this.baseRateCustomMonths = this.bizzCalcService.configureMonthsArray(
      startMonth > 12 ? 1 : startMonth
    );

    this.defaultMonthNumber = this.bizzCalcService.getMonthNumber() + 1;

  }

  onArrowCircleRightClicked(event: ICustomMonths): void {
    this.employmentMonthNum = event;
    this.employmentForm
      .get('EmploymentMonth')
      .setValue('mth - ' + this.employmentMonthNum.monthNo);
    //
    this.defaultMonthNumber += 1;
    this.baseRateCustomMonths = this.bizzCalcService.configureMonthsArray(
      this.defaultMonthNumber > 12 ? 1 : this.defaultMonthNumber
    );

    // if (this.initialMonthNum < 12) {
    //   this.employmentMonthNum = event;
    //   this.employmentForm
    //     .get('EmploymentMonth')
    //     .setValue('mth - ' + this.initialMonthNum);
    //   if (this.baseRateReviewMonth > 11) {
    //     this.baseRateReviewMonth = 1;
    //   } else {
    //     this.baseRateReviewMonth++;
    //   }
    //   this.employmentForm.get('ReviewMonth').setValue(this.baseRateReviewMonth);
    // }
  }

  onArrowCircleLeftClicked(event: ICustomMonths): void {
    this.employmentMonthNum = event;
    this.employmentForm
      .get('EmploymentMonth')
      .setValue('mth - ' + this.employmentMonthNum.monthNo);
      // this.defaultMonthNumber -= 1;
      // this.baseRateCustomMonths = this.bizzCalcService.configureMonthsArray(
      //   this.defaultMonthNumber > 12 ? 1 : this.defaultMonthNumber
      // );

  }

  onBaseRateArrowCircleRightClicked(event: ICustomMonths): void {
    this.baseRateMonthNum = event;
    this.employmentForm
      .get('EmploymentMonth')
      .setValue('mth - ' + this.baseRateMonthNum.monthNo);
  }

  onBaseRateArrowCircleLeftClicked(event: ICustomMonths): void {
    this.baseRateMonthNum = event;
    this.employmentForm
      .get('EmploymentMonth')
      .setValue('mth - ' + this.baseRateMonthNum.monthNo);
  }

  public onAddPositionClicked(): void {
    if (this.employmentForm.valid) {
      this.employmentForm.get('PageNumber').setValue(this.initialMonthNum);
      const _employees = {
        JobTitle: this.employmentForm.get('jobTitle').value,
        EmploymentMonth: this.employmentForm.get('EmploymentMonth').value,
        NumberOfEmployees: this.employmentForm.get('NumberOfEmployees').value,
        EmployeeSalary: this.employmentForm.get('EmployeeSalary').value,
        ReviewMonth: this.employmentForm.get('ReviewMonth').value,
        ReviewPercentage: this.employmentForm.get('ReviewPercentage').value,
        PageNumber: this.employmentForm.get('PageNumber').value,
      };
      this.employees.push(_employees);
      this.bizzCalcService.showToastMessage(
        'contrast',
        '',
        'job title added.',
        3000
      );
    }
  }

  
  public onSaveBtnClicked(): void {
    //   alert('businessDaysWorked ');
    //   console.dir(businessDaysWorked);
    //   this.bizzCalcService
    //     .createDaysWorked(businessDaysWorked)
    //     .pipe(take(1))
    //     .subscribe({
    //       next: (data) => {
    //         // TODO: Create a toast
    //         alert('Success toast:');
    //       },
    //     });
  }
  public ShowTooltip(): void {
  }

  public convertDateFormat(dateString: string): string {
    const date = new Date(dateString);
    const day = ('0' + date.getDate()).slice(-2); // Ensure two digits
    const month = ('0' + (date.getMonth() + 1)).slice(-2); // Months are zero-based
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }
}
