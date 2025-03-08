import { Component, OnInit,EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BizzCalcService } from '../../../services/bizz-calc.service';
import {
  CalendarMonthChangeEvent,
  CalendarYearChangeEvent,
} from 'primeng/calendar';
import { IBusinessDetails } from '../../../models/business-details.interface';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { CalendarCellViewModel } from 'ngx-bootstrap/datepicker/models';
import { Router } from '@angular/router';
// import { ConfirmationService, MessageService } from 'primeng/api';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { BaseAssumptionModalComponent } from '../modals/base-assumption-modal/base-assumption-modal.component';


@Component({
    selector: 'app-bizzcalc-business-details',
    templateUrl: './bizzcalc-business-details.component.html',
    styleUrls: ['./bizzcalc-business-details.component.scss'],
    standalone: false
})
export class BizzcalcBusinessDetailsComponent implements OnInit {
  public businessDetailsForm: FormGroup;
  public currentDate = `${
    new Date().getDate() +
    '-' +
    new Date().getMonth() +
    '-' +
    new Date().getFullYear()
  }`;
  public bsConfig: Partial<BsDatepickerConfig>;

  

  public minDate = new Date();
  versions = [
    {
      name: 'LEARN',
      number: 1,
    },
    {
      name: 'MY DREAM',
      number: 2,
    },
    {
      name: 'BREAK THAT CONSTRAINT',
      number: 3,
    },
    {
      name: 'WHEN THIS HAPPENS',
      number: 4,
    },
  ];

  constructor(
    private formBuilder: FormBuilder,
   private router: Router,
   private modalService: NgbModal,
    private bizzCalcService: BizzCalcService
  ) {
    // this.bizzCalcService.getBusinessDetails().subscribe({
    //   next: (businessDetails) => {},
    // });

    this.bizzCalcService.businessDetails$.subscribe({
      next: (businessDetails) => {
        this.updateBusinessDetailsForm(businessDetails);
      },
    });
    this.bizzCalcService.setScenarioName('LEARN');
  }
  @Input() showLeftIcon: boolean = true;
  @Input() showRightIcon: boolean = true;

  @Output() rightIconClick = new EventEmitter<void>();

  onRightIconClicked(): void {
    this.rightIconClick.emit();
    this.goToDaysWorked(); // Emit the event
  }

  onLeftIconClicked(): void {
    this.rightIconClick.emit();
    this.goToDaysWorked(); // Emit the event
  }
  public onOpenCalendarMonth(container) {
    container.monthSelectHandler = (event: any): void => {
      container._store.dispatch(container._actions.select(event.date));
      this.bizzCalcService.setUpStartDate = event.date;
    };
    container.setViewMode('month');
  }

  public onDateValueChange(event: Date): void {
    // this.bizzCalcService.setScenarioStartDate(event);
    this.bizzCalcService.setUpStartDate = event;
  }

  public onScenarioNameChange(scenarioName: any): void {
    this.bizzCalcService.setScenarioName(scenarioName);
  }

  public getNonFirstDaysOfMonth(): Date[] {
    const disabledDates: Date[] = [];
    const today = new Date();
    const year = today.getFullYear();
    // Disable all days except the first day of the month for each month in the current year
    for (let month = 0; month < 12; month++) {
      const daysInMonth = new Date(year, month + 1, 0).getDate(); // Get number of days in month
      for (let day = 2; day <= daysInMonth; day++) {
        disabledDates.push(new Date(year, month, day));
      }
    }
    return disabledDates;
  }

  confirm() {
    // this.confirmationService.confirm({
    //   message: 'Are you sure you want to proceed?',
    //   header: 'Confirmation',
    //   icon: 'pi pi-exclamation-triangle',
    //   accept: () => {
    //     // Action to perform when confirmed
    //     console.log('Confirmed');
    //   },
    //   reject: () => {
    //     // Action to perform when rejected
    //     console.log('Rejected');
    //   },
    // });
  }

  public goToDaysWorked() {
    this.router.navigate(['/main/bizzcalc/setup/days-worked']);
  }

  private updateBusinessDetailsForm(businessDetails: IBusinessDetails): void {
    const [month, year] = businessDetails.StartMonth.split('/');
    const date = new Date(+year, +month - 1, 1);
    this.businessDetailsForm.patchValue({
      BusinessName: businessDetails.CompanyName,
      ProjectMonth: month,
      ProjectYear: year,
      ProjectDate: date ?? new Date(),
      ProjectStatus: businessDetails.ProjectStatus,
    });
  }

  ngOnInit(): void {
    this.businessDetailsForm = this.formBuilder.nonNullable.group({
      BusinessName: ['', Validators.required],
     
      VersionNumber: ['LEARN', Validators.required],
      ProjectDate: [new Date(), Validators.required],
      ProjectMonth: ['04', Validators.required],
      ProjectYear: ['2024', Validators.required],
      ProjectStatus: [true, Validators.required],
    });
  }

  ShowTooltip(): void {
  }

  public onMonthChanged($event: CalendarMonthChangeEvent): void {
  }

  public onYearChanged($event: CalendarYearChangeEvent): void {
  }

  public onSaveBtnClicked(): void {
    // Mark all fields as touched to display validation errors
    this.businessDetailsForm.markAllAsTouched();
  
    if (this.businessDetailsForm.valid) {
      console.log("Valid");
  
      // Extract form values
      const businessDetails = this.businessDetailsForm.value;
  
      // Create payload for API
      const businessDetailsData = {
        BusinessName: businessDetails.BusinessName,
        ScenarionName: businessDetails.VersionNumber,
        StartMonth: `${businessDetails.ProjectMonth}/${businessDetails.ProjectYear}`,
      };
  
      // Call service to save data
      this.bizzCalcService.createBusinessDetails(businessDetailsData).subscribe({
        next: (response) => {
          this.bizzCalcService.showToastMessage(
            '',
            '',
            'business details added successfully',
            3000
          );
          this.confirm(); // Proceed with next action after successful save
        },
        error: (error) => {
          console.error('Error saving business details:', error);
          this.bizzCalcService.showToastMessage(
            '',
            '',
            'failed to add business details Please try again.',
            3000
          );
        },
      });
    } else {
      // Get list of invalid fields
      console.log("please fill all fields");
    }
  }

  public openModalWithDynamicContent() {
    const modalRef = this.modalService.open(BaseAssumptionModalComponent, {
      backdropClass: 'custom-backdrop',
    });
  
    modalRef.componentInstance.title = 'business details';
    modalRef.componentInstance.contentHtml = `
   
    <div class="custom-modal-content">
    
    <p>Consider your business name carefully because it cannot be changed.
    </p>
    <p>There are four business scenarios, as listed in the dropdown menu. 
      Each scenario is named for an intended purpose as described in a downloadable 
      video called Learn how to Earn access to CAPITAL.</p>
      <p> The app only recognizes complete months. In other words, all transactions 
      will be assumed to start on the first day of each month. This will apply to 
      all expenses and depreciation calculations. The start month will be recognized 
      as the first month of trading. So, if you chose to start your business in March,
       March will be recognized as month 1. April will be month 2 and so on.
      </p>
    <ul>
      
     
    </ul>
    </div>
 
    `;
  }
  
  // Helper method to get invalid field names
  private getInvalidFields(): string[] {
    const invalidFields: string[] = [];
    Object.keys(this.businessDetailsForm.controls).forEach((key) => {
      const control = this.businessDetailsForm.get(key);
      if (control && control.invalid) {
        invalidFields.push(key);
      }
    });
    return invalidFields;
  }
}