import { Component, Input, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators,ValidationErrors  } from '@angular/forms';
import { BizzCalcService } from '../../../services/bizz-calc.service';
import { IDaysWorked, IHoliday } from '../../../models/days-worked.interface';
import { map, take } from 'rxjs/operators';
import {
  ModalDismissReasons,
  NgbActiveModal,
  NgbModal,
  NgbModalOptions,
  NgbModalRef,
} from '@ng-bootstrap/ng-bootstrap';
import { HolidaysModalComponent } from '../modals/holidays-modal/holidays-modal.component';
import { DatePipe } from '@angular/common';
import { BaseAssumptionModalComponent } from '../modals/base-assumption-modal/base-assumption-modal.component';


@Component({
  selector: 'app-bizzcalc-business-days-worked',
  templateUrl: './bizzcalc-business-days-worked.component.html',
  styleUrls: ['./bizzcalc-business-days-worked.component.scss'],
  providers: [DatePipe],
})
export class BizzcalcBusinessDaysWorkedComponent implements OnInit {
  closeResult = '';
  modalRef: NgbModalRef;
  @Input() user: string;
  errorMessage: string = '';
  public nonworkingDaysForm: FormGroup;
  public holidaysForm: FormGroup;
  public daysWorked: IDaysWorked;
  public holidays: IHoliday[] = [];
  private pageNumber = 1;
  public currentDate = `${
    new Date().getDate() +
    '-' +
    new Date().getMonth() +
    '-' +
    new Date().getFullYear()
  }`;
  public minDate = new Date();
  public startHolidayMinDate = new Date();

  constructor(
    private formBuilder: FormBuilder,
    private bizzCalcService: BizzCalcService,
    private modalService: NgbModal
  ) {
    // Non-working days form
    this.nonworkingDaysForm = this.formBuilder.nonNullable.group({
      Day1: [true, Validators.required],
      Day2: [true, Validators.required],
      Day3: [true, Validators.required],
      Day4: [true, Validators.required],
      Day5: [true, Validators.required],
      Day6: [true, Validators.required],
      Day7: [true, Validators.required],
    }, { validators: this.atLeastOneWeekendDaySelected }); // Add validator here

    // Holidays form
    this.holidaysForm = this.formBuilder.group({
      HolidayName: ['', Validators.required],
      HolidayStartDt: [
        this.bizzCalcService.setUpStartDate,
        Validators.required,
      ],
      HolidayEndDt: [this.bizzCalcService.setUpStartDate, Validators.required],
      PageNumber: [''],
      // Ensure 'required' validator is added
    });
  }


  // Simple form-level validator
  private atLeastOneWeekendDaySelected(formGroup: FormGroup): ValidationErrors | null {
    const day6 = formGroup.get('Day6')?.value;
    const day7 = formGroup.get('Day7')?.value;
    return day6 || day7 ? null : { weekendDayRequired: true };
  }

  public onModalClose() {
    console.log('mmmmmmm');
    this.modalRef.close();
  }



  private openModal(holidays: IHoliday[]): void {
    this.modalRef = this.modalService.open(HolidaysModalComponent, {
      ariaLabelledBy: 'modal-basic-title',
      backdropClass: 'custom-backdrop',
    });
    this.modalRef.componentInstance.holidays = holidays;
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  ngOnInit(): void {
    this.bizzCalcService.showToastMessage(
      'contrast',
      '',
      'holiday added',
      3000
    );

    this.bizzCalcService.getBusinessDetails().subscribe({
      next: (days) => {
        this.updateDaysWorked(days);
        // this.holidaysForm.get("updateDaysWorked").setValue(days.);
      },
    });


    this.holidaysForm.get("HolidayStartDt").valueChanges.subscribe({next: date => {
      this.holidaysForm.get("HolidayEndDt").setValue(date);
    }})

    // alert(this.bizzCalcService.setUpStartDate);

    // this.bizzCalcService.scenarioStartDate$.subscribe({next: date => {
    //   console.log("****************************************");
    //   // this.minDate = date;
    //   // this.minDate = date;
    //   //const currentDate = new Date();
    //   const tempDate = this.datePipe.transform(date, 'yyyy-MM-dd');
    //   this.minDate = new Date(tempDate);
    //   // alert("Constructor B");
    //   // this.holidaysForm.get('HolidayStartDt').setValue(this.minDate);
    // }});
  }

  private updateDaysWorked(days: any): void {
    this.nonworkingDaysForm
      .get('Day1')
      ?.setValue(days.Day1 === 1 ? true : false);
    this.nonworkingDaysForm
      .get('Day2')
      ?.setValue(days.Day2 === 1 ? true : false);
    this.nonworkingDaysForm
      .get('Day3')
      ?.setValue(days.Day3 === 1 ? true : false);
    this.nonworkingDaysForm
      .get('Day4')
      ?.setValue(days.Day4 === 1 ? true : false);
    this.nonworkingDaysForm
      .get('Day5')
      ?.setValue(days.Day5 === 1 ? true : false);
    this.nonworkingDaysForm
      .get('Day6')
      ?.setValue(days.Day6 === 1 ? true : false);
    this.nonworkingDaysForm
      .get('Day7')
      ?.setValue(days.Day7 === 1 ? true : false);
  }

  public isAddingHoliday: boolean = false;

  public onAddHolidayClicked(): void {
    if (this.isAddingHoliday) return; // Prevent multiple clicks
    this.isAddingHoliday = true; // Set loading state

    const holiday = this.holidaysForm.value;

    // Validate form
    if (this.holidaysForm.valid) {
      // Check for duplicate holiday
      const isDuplicate = this.holidays.some(
        (h) => h.HolidayName === holiday.HolidayName
      );
      if (isDuplicate) {
        this.bizzCalcService.showToastMessage(
          '',
          '',
          'This holiday already exists.',
          3000
        );
        this.isAddingHoliday = false; // Reset loading state
        return;
      }

      // Validate date range
      if (new Date(holiday.HolidayEndDt) < new Date(holiday.HolidayStartDt)) {
        this.bizzCalcService.showToastMessage(
          'error',
          '',
          'End date cannot be earlier than start date.',
          3000
        );
        this.isAddingHoliday = false; // Reset loading state
        return;
      }

      // Add holiday
      this.holidays.push({
        HolidayName: holiday.HolidayName,
        DateStart: this.convertDateFormat(holiday.HolidayStartDt),
        DateEnd: this.convertDateFormat(holiday.HolidayEndDt),
        PageNumber: this.pageNumber.toString(),
      });
      this.pageNumber++;
      // this.holidaysForm.reset(); // Reset form

      // Show success message
      this.bizzCalcService.showToastMessage(
        'contrast',
        '',
        'holiday added successfully',
        3000
      );
    } else {
      // Show error message for invalid form

    }

    this.isAddingHoliday = false; // Reset loading state
  }

  public onViewDataBtnClicked(content: string): void {

    this.modalRef = this.modalService.open(HolidaysModalComponent, {
      ariaLabelledBy: 'modal-basic-title',
      backdropClass: 'custom-backdrop',
    });

    this.bizzCalcService.getBusinessDays().subscribe({
      next: (data) => {
        console.dir(data);
      },
      error: (err) => {
        console.dir(err);
      }
      ,
    });

    // https://api.asone.global/api/BizzBean/v1/relay/BBholidays

    this.modalRef.componentInstance.holidays = this.holidays;
    this.modalRef.result.then(
      (reason: { mode: number; data: IHoliday }) => {
        if (reason.mode === 0) {
          this.holidays = this.holidays.filter(
            (item) => item.HolidayName !== reason.data.HolidayName
          );
        } else if (reason.mode === 1) {
          this.holidaysForm
            .get('HolidayName')
            .setValue(reason.data.HolidayName);
          this.holidaysForm
            .get('HolidayStartDt')
            .setValue(this.convertDateFormat(reason.data.HolidayStartDt));
          this.holidaysForm
            .get('HolidayEndDt')
            .setValue(this.convertDateFormat(reason.data.HolidayEndDt));
          this.holidaysForm.get('PageNumber').setValue(reason.data.PageNumber);
        }
      },
      (reason: { mode: number; data: IHoliday }) => {
        if (reason.mode === 0) {
          this.holidays = this.holidays.filter(
            (item) => item.HolidayName !== reason.data.HolidayName
          );
        } else if (reason.mode === 1) {
          this.holidaysForm
            .get('HolidayName')
            .setValue(reason.data.HolidayName);
          this.holidaysForm
            .get('HolidayStartDt')
            .setValue(reason.data.HolidayStartDt);
          this.holidaysForm
            .get('HolidayEndDt')
            .setValue(reason.data.HolidayEndDt);
          this.holidaysForm.get('PageNumber').setValue(reason.data.PageNumber);
        }
      }
    );
    // this.bizzCalcService.getHolidays().subscribe({
    //   next: (data) => {
    //     console.log('--------------------------');
    //     console.dir(data);
    //     debugger;
    //     this.openModal(data.Holiday);
    //   },
    // });
  }

  public showError: boolean = false; // Flag to control error message display
  public errorMsg: string = ''; // Dynamic error message

  public isSaving: boolean = false;

  public onSaveBtnClicked(): void {
    if (this.isSaving) return; // Prevent multiple clicks

    this.isSaving = true; // Set loading state

    const nonWorkingDays = this.nonworkingDaysForm.value;

    if (!nonWorkingDays.Day1 && !nonWorkingDays.Day2 && !nonWorkingDays.Day3 && !nonWorkingDays.Day4 && !nonWorkingDays.Day5 && !nonWorkingDays.Day6 && !nonWorkingDays.Day7) {
      this.showValidationError('At least one day must be checked.');
      this.isSaving = false; // Reset loading state
      return;
    }


    this.showError = false;

    const businessDaysWorked = {
      Day1: nonWorkingDays.Day1,
      Day2: nonWorkingDays.Day2,
      Day3: nonWorkingDays.Day3,
      Day4: nonWorkingDays.Day4,
      Day5: nonWorkingDays.Day5,
      Day6: nonWorkingDays.Day6,
      Day7: nonWorkingDays.Day7,
      Holidays: this.holidays,
    } as IDaysWorked;

    console.dir(businessDaysWorked);

    this.bizzCalcService
      .createDaysWorked(businessDaysWorked)
      .pipe(take(1))
      .subscribe({
        next: () => {
          this.bizzCalcService.showToastMessage(
            'success',
            '',
            'Business days added successfully',
            3000
          );
          this.isSaving = false; // Reset loading state
          // this.nonworkingDaysForm.reset(); // Reset form
        },
        error: (error) => {
          console.error('Error adding business days:', error);
          this.bizzCalcService.showToastMessage(
            '',
            '',
            'failed to add business days ',
            3000
          );
          this.isSaving = false; // Reset loading state
        },
      });
  }
  public openModalWithDynamicContent() {
    const modalRef = this.modalService.open(BaseAssumptionModalComponent, {
      backdropClass: 'custom-backdrop',
    });

    modalRef.componentInstance.title = 'days not worked calculation';
    modalRef.componentInstance.contentHtml = `
    <div class="custom-modal-content">


      <p>Uncheck the days of the week on which you chose not to work. Add
      the holidays you also chose not to work. These holidays may include
      public holidays and an annual shut down.</p>
      <p> The revenue and gross profit calculation is determined by
      the number of days in each month of the year.
      </p>


    </div>
    `;
  }
  // Helper method to display validation error
  private showValidationError(message: string): void {
    this.showError = true;
    this.errorMessage = message;
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
