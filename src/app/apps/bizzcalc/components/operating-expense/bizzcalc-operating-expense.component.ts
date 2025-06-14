import { Component, effect, OnInit } from '@angular/core';
import { Expense, Expense2 } from '../../models/Expense';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { BizzCalcService } from '../../services/bizz-calc.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
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
import { ICustomMonths } from '../../models/custom-months';
import { ICategoryList } from '../../models/category-list.interface';
import { OperatingExpensesModalComponent } from '../setup/modals/operating-expenses-modal/operating-expenses-modal.component';
import { Employee } from '../../models/Employee';
import { BaseAssumptionModalComponent } from '../setup/modals/base-assumption-modal/base-assumption-modal.component';

@Component({
    selector: 'app-bizzcalc-operating-expense',
    templateUrl: './bizzcalc-operating-expense.component.html',
    styleUrls: ['./bizzcalc-operating-expense.component.scss'],
    standalone: false
})
export class OperatingExpenseComponent implements OnInit {

  modalRef: NgbModalRef;
  faArrowCircleLeft = faArrowCircleLeft;
  faArrowAltCircleRight = faArrowAltCircleRight;
  operatingExpenseForm: FormGroup;
  expenses: Expense2[] = [];
  expense!: Expense2;
  selectedItem: any;
  public customMonths: any[] = [];
  public baseRateCustomMonths: any[] = [];
  public categories: ICategoryList[] = [];
  baseRateMonthNum: ICustomMonths;

  constructor(
    private formBuilder: FormBuilder,
    private bizzCalcService: BizzCalcService,
    private modalService: NgbModal
  ) {
  }

  employees: Employee[] = [];

  public onViewDataBtnClicked(): void {
    this.modalRef = this.modalService.open(OperatingExpensesModalComponent, {
      ariaLabelledBy: 'modal-basic-title',
      backdropClass: 'custom-backdrop',
    });
    this.modalRef.componentInstance.expenses = this.expenses;
    this.modalRef.result.then(
      (reason: { mode: number; data: Expense2 }) => {
        if (reason.mode === 0) {
          this.expenses = this.expenses.filter(
            (item) => item.GLID !== reason.data.GLID
          );
        } else if (reason.mode === 1) {
          // Handle additional logic for mode 1 if required
        }
      },
      (reason: { mode: number; data: Expense2 }) => {
        if (reason.mode === 0) {
          this.expenses = this.expenses.filter(
            (item) => item.GLID !== reason.data.GLID
          );
        } else if (reason.mode === 1) {
          // Example code for setting employment form values
          // Uncomment and adapt this section if needed for your form:
          // this.employmentForm.get('jobTitle').setValue(reason.data.jobTitle);
          // this.employmentForm
          //   .get('EmploymentMonth')
          //   .setValue(reason.data.employmentMonth);
          // this.employmentForm
          //   .get('EmploymentReviewMonth')
          //   .setValue(reason.data.employmentReviewMonth);
          // this.employmentForm
          //   .get('NumberOfEmployees')
          //   .setValue(reason.data.numberOfEmployees);
          // this.employmentForm
          //   .get('EmployeeSalary')
          //   .setValue(reason.data.employeeSalary);
          // this.employmentForm
          //   .get('ReviewMonth')
          //   .setValue(reason.data.reviewMonth);
          // this.employmentForm
          //   .get('ReviewPercentage')
          //   .setValue(reason.data.reviewPercentage);
          // this.employmentForm
          //   .get('PageNumber')
          //   .setValue(reason.data.pageNumber);
        }
      }
    );
  }


  public onSaveBtnClicked(): void {
    // Mark all fields as touched to trigger validation errors if any
    this.operatingExpenseForm.markAllAsTouched();

    if (this.operatingExpenseForm.valid) {
      const expenses = {
        Expenses: this.expenses,
      };

      this.bizzCalcService.PostOperatingExpense(expenses).subscribe({
        next: (data) => {
          this.bizzCalcService.showToastMessage(
            'contrast',
            '',
            'Operating expense saved',
            3000
          );
        },
        error: (err) => {
          console.error('Error posting data:', err);
          this.bizzCalcService.showToastMessage(
            'error',
            '',
            'Failed to save operating expense. Please try again.',
            3000
          );
        },
      });
    } else {
      this.bizzCalcService.showToastMessage(
        '',
        '',
        'Please fill in all required fields correctly',
        3000
      );
    }
  }


  public openModalWithDynamicContent() {
    const modalRef = this.modalService.open(BaseAssumptionModalComponent, {
      backdropClass: 'custom-backdrop',
    });

    modalRef.componentInstance.title = 'operating expense';
    modalRef.componentInstance.contentHtml = `
    <div class="custom-modal-content">
    <p>    To determine the operating expenses of your business, enter the data required in the blue fields.</p>

    <ul>
      <li>
      scroll through the pre-determined expense list and select those appropriate to your business.</li>

      <li>enter the monthly base value for the expense.</li>
      <li> use the slider to choose the month of review and insert a rate %.</li>

      <li>click on the view data button to review and amend your decisions, if necessary.</li>
      <li>save the data.</li>
    </ul>
    </div> `;
  }

  public reviewMonth = this.bizzCalcService.reviewMonth;

  private generateOperatingExpenseForm(): void {
    this.operatingExpenseForm = this.formBuilder.group({
      GLID: [''],
      AdjustmentMonth: ["" +this.reviewMonth()],
      Adjustment: ['', [Validators.required, Validators.min(-99), Validators.max(100)]],
      Allocation: ['', [Validators.required, Validators.min(1)]],
    });
  }
  ngOnInit(): void {
    const startingMonth = this.bizzCalcService.businessStartMonth();
    const reviewMonth = this.bizzCalcService.reviewMonth();
    const startMonth = startingMonth + 1;
    this.baseRateCustomMonths = this.bizzCalcService.configureMonthsArray(
      startMonth > 12 ? 1 : startMonth,
    );

    this.bizzCalcService.getExpensesList().subscribe({
      next: (fixedAssets) => {
        this.categories = fixedAssets;
      },
    });

    this.generateOperatingExpenseForm();
  }

  public operatingExpenseMonth = 1;
  onArrowCircleRightClicked(event: ICustomMonths): void {
    let month = event.monthNo;
    if(this.operatingExpenseMonth > 13) {
      // month = 1;
      this.operatingExpenseMonth += 1;
    }
    this.operatingExpenseForm.get('AdjustmentMonth').setValue('' + this.operatingExpenseMonth);
  }

  public leftClicked = false;
  onArrowCircleLeftClicked(event: ICustomMonths): void {

    if(this.operatingExpenseMonth !== 0) {
      // let month = event.monthNo;
      this.operatingExpenseMonth -= 1;
    }
    this.baseRateMonthNum = event;
    this.operatingExpenseForm.get('AdjustmentMonth').setValue('' + this.operatingExpenseMonth);
  }



  public onCategoryChange($event: any): void {
    this.operatingExpenseForm.get('GLID').setValue($event?.ID);
  }

  saveExpense() {
    if (this.operatingExpenseForm.valid) {
      const idExists = this.expenses.some(
        (expense) => expense.GLID === this.expense.GLID
      );
      if (!idExists) {
        this.expense = {} as Expense2;
        const opExpense = this.operatingExpenseForm.value;
        this.expenses.push(opExpense);
        this.bizzCalcService.showToastMessage(
          'contrast',
          '',
          'operating expense added',
          3000
        );
      }
    } else {
      this.operatingExpenseForm.markAllAsTouched();
      // this.bizzCalcService.showToastMessage(
      //   '',
      //   '',
      //   'please fix the errors in the form',
      //   3000
      // );
    }
  }


  deleteExpense() {
    // const index = this.expenses.findIndex(
    //   (expense) =>
    //     expense.Id === this.selectedItem?.Id &&
    //     this.selectedItem.type === 'expense'
    // );
    // if (index !== -1) {
    //   this.expenses.splice(index, 1);
    // }
    // this.modalService.dismissAll();
  }
  editExpense(expense) {
    this.expense = expense;
  }

  get adjustmentCtrl() {
    return this.operatingExpenseForm.get("Adjustment")
  }

  get adjustmentMonthCtrl() {
    return this.operatingExpenseForm.get("AdjustmentMonth")
  }

  get GLIDCtrl() {
    return this.operatingExpenseForm.get("GLID")
  }
}
