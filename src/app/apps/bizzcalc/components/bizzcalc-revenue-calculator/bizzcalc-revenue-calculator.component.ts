import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  faArrowAltCircleRight,
  faArrowCircleLeft,
} from '@fortawesome/free-solid-svg-icons';
import { BizzCalcTabs } from 'src/app/enums/apps/bizzcalc/bizzcalcTabs.enum';
import { IRevenueCalculator } from '../../models/revenue-calculator';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BizzCalcService } from '../../services/bizz-calc.service';
import { BaseAssumptionModalComponent } from '../setup/modals/base-assumption-modal/base-assumption-modal.component';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-bizzcalc-revenue-calculator',
  templateUrl: './bizzcalc-revenue-calculator.component.html',
  styleUrls: ['./bizzcalc-revenue-calculator.component.scss'],
})
export class BizzcalcRevenueCalculatorComponent {
  faArrowCircleLeft = faArrowCircleLeft;
  faArrowAltCircleRight = faArrowAltCircleRight;
  revenue_Calculator: boolean = false;
  setUpMoth = 2;
  monthIndex = this.setUpMoth;
  monthsArray = [
    {
      month: 'jan',
      index: 1,
    },
    {
      month: 'feb',
      index: 2,
    },
    {
      month: 'mar',
      index: 3,
    },
    {
      month: 'apr',
      index: 4,
    },
    {
      month: 'may',
      index: 5,
    },
    {
      month: 'jun',
      index: 6,
    },
    {
      month: 'jul',
      index: 7,
    },
    {
      month: 'aug',
      index: 8,
    },
    {
      month: 'sep',
      index: 9,
    },
    {
      month: 'oct',
      index: 10,
    },
    {
      month: 'nov',
      index: 11,
    },
    {
      month: 'dec',
      index: 12,
    },
  ];
  testMonth = [];
  configuredMonths = [];
  setUpdMonths = [
    {
      month: 'jan',
      monthNo: 1,
    },
    {
      month: 'feb',
      monthNo: 2,
    },
    {
      month: 'mar',
      monthNo: 3,
    },
    {
      month: 'apr',
      monthNo: 4,
    },
    {
      month: 'may',
      monthNo: 5,
    },
    {
      month: 'jun',
      monthNo: 6,
    },
    {
      month: 'jul',
      monthNo: 7,
    },
    {
      month: 'aug',
      monthNo: 8,
    },
    {
      month: 'sep',
      monthNo: 9,
    },
    {
      month: 'oct',
      monthNo: 10,
    },
    {
      month: 'nov',
      monthNo: 11,
    },
    {
      month: 'dec',
      monthNo: 12,
    },
  ];

  public startDate = this.bizzCalcService.setUpStartDate;

  public revenueCalculatorForm: FormGroup;

  secondaryActiveTab: BizzCalcTabs = null;
  selectedMonth = this.monthsArray.find((x) => x.index == this.monthIndex); //[this.monthIndex];
  selectedDate = this.selectedMonth.month;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private modalService: NgbModal,
    public bizzCalcService: BizzCalcService
  ) {
    this.generateRevenueCalculatorForm();
  }

  public adjustmentMonthsInValid(): boolean {
    // return this.adjustmentMonths.controls.some(group => group.invalid && group.touched);
    return this.adjustmentMonths.controls.some(group => group.get("growthRate").invalid);
  }

  ngOnInit(): void {
    // this.populateFormWithDefaulVAlues();
    const startingMonth = this.bizzCalcService.getMonthNumber();
    this.testMonth = this.bizzCalcService.configureMonthsArray(startingMonth);
    this.configuredMonths = this.testMonth;
    console.log(this.testMonth);
  }

  private generateRevenueCalculatorForm(): void {
    this.revenueCalculatorForm = this.fb.group({
      valueSalesPerDay: ['', [Validators.required, Validators.min(1)]], // Greater than 0
      profitMargin: [
        '',
        [Validators.required, Validators.min(1), Validators.max(100)],
      ], // Between 1 and 100
      growthRate: [0, [Validators.required]],
      adjustmentMonths: this.fb.array([]),
    });

    this.setUpdMonths.forEach((month, index) => {
      const monthGroup = this.fb.group({
        adjustmentMonth: [
          { value: month.month, disabled: index === 0 },
          [Validators.min(-99), Validators.max(100)],
        ],
        growthRate: [{ value: null, disabled: index == 0 }, [Validators.min(-99), Validators.max(100)]],
        label: [month.monthNo],
      });
      this.adjustmentMonths.push(monthGroup);
    });
  }

  configureMonthsArray(startingMonth) {
    let combinedList = [];
    const adjustedMonthsArray = [...this.setUpdMonths];
    const startIndex = adjustedMonthsArray.findIndex(
      (month) => month.monthNo === startingMonth
    );

    if (startIndex !== -1) {
      const adjustedMonths = adjustedMonthsArray.splice(startIndex);
      const firstList = adjustedMonths.map((month, index) => ({
        ...month,
        monthNo: index + 1,
      }));
      combinedList = [...firstList];
      for (const month of adjustedMonthsArray) {
        combinedList.push({
          month: month.month,
          monthNo: month.monthNo + firstList.length,
        });
      }
      console.log(combinedList);
    }
    return combinedList;
  }

  incrementMonth() {
    this.monthIndex++;
    if (this.monthIndex > 0 && this.monthIndex < 13) {
      this.selectedMonth = this.monthsArray.find(
        (month) => month.index === this.monthIndex
      );
      this.selectedDate = this.selectedMonth.month;
      // this.saveFormData('incr');
    } else {
      this.monthIndex = this.monthIndex > 12 ? 12 : 1;
      this.selectedMonth = this.monthsArray.find(
        (month) => month.index === this.monthIndex
      );
      this.selectedDate = this.selectedMonth.month;
      // this.saveFormData('incr');
    }
  }
  setSecondaryActiveTab(tab: BizzCalcTabs) {
    this.secondaryActiveTab = tab;
    this.revenue_Calculator = false;
  }

  get adjustmentMonths(): FormArray {
    return this.revenueCalculatorForm.get('adjustmentMonths') as FormArray;
  }

  addAddress(): void {
    const addressGroup = this.fb.group({
      month: [0, Validators.required],
    });
    this.adjustmentMonths.push(addressGroup);
  }

  public adjustmentMonthsHasErrors = false;
  public saveFormData(incr?: any): void {
    this.adjustmentMonthsHasErrors = false;
    const adjustmentMonthsInvalid = this.adjustmentMonths.controls.some(group => group.invalid);
    if(adjustmentMonthsInvalid) {
      this.adjustmentMonthsHasErrors = true;
      return;
    }

    if (this.revenueCalculatorForm.valid) {
      const revenuePayload = this.prepareRevCalcData();
      console.log('*************************************');
      console.dir(revenuePayload);

      this.bizzCalcService.PostRevenue(revenuePayload).subscribe({
        next: (data) => {
          console.dir('****************************', data);
          this.bizzCalcService.showToastMessage(
            'contrast',
            '',
            'Revenue added successfully.',
            3000
          );
        },
        error: (error) => {
          console.dir('****************************', error);
        },
      });
    } else {
      // Mark all controls as touched to trigger ngIf validation messages
      this.revenueCalculatorForm.markAllAsTouched();

      // Optionally, you can log a message or perform other actions
      console.warn('Form is invalid. Please correct the highlighted fields.');
    }
  }
  public openModalWithDynamicContent() {
    const modalRef = this.modalService.open(BaseAssumptionModalComponent, {
      backdropClass: 'custom-backdrop',
    });

    modalRef.componentInstance.title = 'revenue calculator';
    modalRef.componentInstance.contentHtml = `
    <div class="custom-modal-content">
    <p>To determine the employment expenses of your business, enter the data required in the blue fields:</p>
    <ul>
      <li> enter the anticipated daily revenue for the first month of trading.</li>
      <li>enter the anticipated gross profit margin earned.</li>
      <li>enter the revenue % growth rate over the previous month in the appropriate month field.</li>
      <li>save the data.</li>
      <li>click on the view data button to review the calculated values.</li>
      <li>amend your decisions, if necessary.</li>
      <li>save the data.</li>
    </ul>
    </div>








    `;
  }

  private prepareRevCalcData() {
    const _adjustmentMonthsData = [];
    const adjustmentMonths: {
      adjustmentMonth: string;
      growthRate: string;
      label: number;
    }[] = this.revenueCalculatorForm.get('adjustmentMonths').value;
    adjustmentMonths.forEach((month) => {
      _adjustmentMonthsData.push({
        adjustmentMonth: month.adjustmentMonth ?? 'jan',
        growthRate:
          month.growthRate ??
          this.revenueCalculatorForm.get('growthRate').value,
      });
    });

    const revenuePayload: IRevenueCalculator = {
      ValueSalesPerDay:
        this.revenueCalculatorForm.get('valueSalesPerDay').value,
      ProfitMargin: this.revenueCalculatorForm.get('profitMargin').value,
      GrowthRate: this.revenueCalculatorForm.get('growthRate').value,
      AdjustmentMonths: _adjustmentMonthsData,
    };

    return revenuePayload;
  }

  public decrementMonth() {
    this.monthIndex--;
    if (this.monthIndex < this.setUpMoth) {
      this.monthIndex = this.setUpMoth;
    }
    if (this.monthIndex > 0 && this.monthIndex < 13) {
      this.selectedMonth = this.monthsArray.find(
        (month) => month.index === this.monthIndex
      );
      this.selectedDate = this.selectedMonth.month;
      this.saveFormData('incr');
    } else {
      this.monthIndex = this.monthIndex < 1 ? 1 : 12;
      this.selectedMonth = this.monthsArray.find(
        (month) => month.index === this.monthIndex
      );
      this.selectedDate = this.selectedMonth.month;
      this.saveFormData('incr');
    }
  }
}
