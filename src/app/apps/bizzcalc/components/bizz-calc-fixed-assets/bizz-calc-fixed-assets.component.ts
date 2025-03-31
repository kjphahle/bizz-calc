import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { IDepreciationRate } from '../../models/depreciation-rate.interface';
import { BizzCalcService } from '../../services/bizz-calc.service';
import { ICategoryList } from '../../models/category-list.interface';
import { ICategoryDepreciationRate } from '../../models/fixed-assets.interface';
import { ICustomMonths } from '../../models/custom-months';

import { FixedAssetsModalComponent } from 'src/app/apps/bizzcalc/components/setup/modals/fixed-assets-modal/fixed-assets-modal.component';


export interface IFixedAssets {
  FADescription: string;
  FACat: number;
  FACost: string;
  FAQty: number;
  FADate: string;
  FADepreciationRate: number;
  FAPurchaseMonth: string;
  PageNumber: number;
}

@Component({
    selector: 'app-bizz-calc-fixed-assets',
    templateUrl: './bizz-calc-fixed-assets.component.html',
    styleUrls: ['./bizz-calc-fixed-assets.component.scss'],
    standalone: false
})
export class BizzCalcFixedAssetsComponent implements OnInit {
  fixedAssetsForm: FormGroup;
  public categories: ICategoryList[] = [];
  public catDepreciationRates: ICategoryList[] = [];
  public defaultMonthNumber = 0;
  public baseRateCustomMonths: any[] = [];
  public fixedAssets: IFixedAssets[] = [];
  public employmentMonthNum: ICustomMonths;
  baseRateMonthNum: ICustomMonths;

  constructor(
    private formBuilder: FormBuilder,
    private bizzCalcService: BizzCalcService,
    private cdr: ChangeDetectorRef
  ) {
    this.generateFixedAssetsForm();
  }
  ngOnInit(): void {
    const startingMonth = this.bizzCalcService.getMonthNumber();
    const startMonth = startingMonth + 1;
    this.baseRateCustomMonths = this.bizzCalcService.configureMonthsArray(
      startMonth > 12 ? 1 : startMonth
    );
    console.log('*********************** ');
    console.dir(this.baseRateCustomMonths);

    const currentYear = new Date().getFullYear();
    const faDate = new Date(currentYear, +this.baseRateCustomMonths[0].monthNo);
    const formateDate = this.formatDate(faDate);
    this.fixedAssetsForm.get('FADate').setValue(formateDate);

    // this.fixedAssetsForm
    //   .get('FAPurchaseMonth')
    //   ?.setValue('mth - ' + this.baseRateCustomMonths[0]);

    this.defaultMonthNumber = this.bizzCalcService.getMonthNumber() + 1;
    this.bizzCalcService.getFixedAssetsList().subscribe({
      next: (fixedAssets) => {
        this.categories = fixedAssets;
        this.bizzCalcService.getDepreciationRates().subscribe({
          next: (depreciationRates) => {
            this.categories.forEach((x) => {
              this.fixedAssetsForm
                .get('FADepreciationRate')
                .setValue(depreciationRates[0]?.DepreciationRate);
              this.fixedAssetsForm
                .get('categoryID')
                .setValue(depreciationRates[0]?.ID);
              this.fixedAssetsForm
                .get('FACat')
                .setValue(this.categories[0].GLDescription);
              this.fixedAssetsForm.get('FADepreciationRate')?.disable();
              debugger
              depreciationRates.forEach((d) => {
                if (x.ID === d.ID) {
                  this.catDepreciationRates.push({
                    GLCode: x.GLCode,
                    GLDescription: x.GLDescription,
                    ID: x.ID,
                    DepreciationRate: d.DepreciationRate,
                  });
                }
              });
            });
            this.cdr.detectChanges();
          },
          error: (error) => {
            console.log('******************************* error', error);
          },
        });
      },
    });
  }

  onArrowCircleRightReviewMonthClicked(event: ICustomMonths): void {
    this.fixedAssetsForm
      .get('FAPurchaseMonth')
      ?.setValue('mth - ' + event?.monthNo);
    //
    this.defaultMonthNumber += 1;
    this.baseRateCustomMonths = this.bizzCalcService.configureMonthsArray(
      this.defaultMonthNumber > 12 ? 1 : this.defaultMonthNumber
    );
  }

  onArrowCircleLeftClicked(event: ICustomMonths): void {
    this.employmentMonthNum = event;
    this.fixedAssetsForm.get('FAPurchaseMonth').setValue(event?.monthNo);
  }


  private generateFixedAssetsForm(): void {
    this.fixedAssetsForm = this.formBuilder.group({
      FADescription: [
        '',
        [Validators.required, Validators.minLength(5)] // Required and minimum length of 5 characters
      ],
      FADepreciationRate: [{ value: '', disabled: true }], // Disabled field
      FACost: [
        null,
        [Validators.required, Validators.min(1)] // Required and must be greater than 1
      ],
      FAQty: [
        null,
        [Validators.required, Validators.min(1)] // Required and must be greater than 1
      ],
      FACat: ['', Validators.required], // Required field
      FADate: ['', Validators.required], // Required field
      categoryID: [null], // Optional field
      FAPurchaseMonth: ['', Validators.required], // Required field
    });
  }

  private getCategoryIdyName(categoryName: string): number {
    const category = this.catDepreciationRates.find(c =>
      c.GLDescription === categoryName
    );
    // this.fixedAssetsForm.get('FADescription').value,
    return category.ID ?? 0;
  }

  public onAddAssetsBtnClicked(): void {
    if (this.fixedAssetsForm.valid) {
      // Add valid asset to the list
      this.fixedAssets.push({
        FADescription: this.fixedAssetsForm.get('FADescription')?.value,
        FACat: this.fixedAssetsForm.get('FACat')?.value,
        FACost: this.fixedAssetsForm.get('FACost')?.value,
        FAQty: this.fixedAssetsForm.get('FAQty')?.value,
        FADate: this.fixedAssetsForm.get('FADate')?.value,
        FADepreciationRate: this.fixedAssetsForm.get('FADepreciationRate')?.value,
        FAPurchaseMonth: this.fixedAssetsForm.get('FAPurchaseMonth')?.value,
        PageNumber: 1, // Default value
      });

      // Clear the form after successful addition
      this.fixedAssetsForm.reset();
    } else {
      // Mark all controls as touched to show validation errors in the UI
      this.fixedAssetsForm.markAllAsTouched();
    }
  }

  public onViewDataBtnClicked(): void {
    if (this.fixedAssets.length > 0) {
      console.log('Fixed Assets Data:', this.fixedAssets);

      this.bizzCalcService.showToastMessage(
        'info',
        '',
        `You have ${this.fixedAssets.length} fixed asset(s) added.`,
        3000
      );

      // Optionally, you could implement a modal or table to display this data in the UI
      // Example: Emit an event or set a variable to pass data to a table or modal.
    } else {
      this.bizzCalcService.showToastMessage(
        'warning',
        '',
        'No fixed assets to display.',
        3000
      );
    }
  }

  public onSaveBtnClicked(): void {
    // Mark all fields as touched to display validation errors
    this.fixedAssetsForm.markAllAsTouched();

    if (this.fixedAssetsForm.valid) {
      // Prepare the fixedAssets object for submission
      const fixedAssets = {
        FixedAssets: this.fixedAssets.map(asset => ({
          FADescription: asset.FADescription,
          FACat: asset.FACat,
          FACost: asset.FACost,
          FAQty: asset.FAQty,
          FADate: asset.FADate,
          FADepreciationRate: asset.FADepreciationRate,
          FAPurchaseMonth: asset.FAPurchaseMonth,
          PageNumber: asset.PageNumber,
        })),
      };

      // Call the service to save the fixed assets
      this.bizzCalcService.createFixedAssets(fixedAssets).subscribe({
        next: () => {
          this.bizzCalcService.showToastMessage(
            'success',
            'Success',
            'Fixed assets added',
            3000
          );
          // Clear the form and reset the fixedAssets array
          this.fixedAssetsForm.reset();
          this.fixedAssets = [];
        },
        error: (error) => {
          console.error('Error saving fixed assets:', error);
          this.bizzCalcService.showToastMessage(
            'error',
            'Error',
            'Failed to add fixed assets. Please try again.',
            3000
          );
        },
      });
    } else {
      // If form is invalid, show a warning message
      const invalidFields = this.getInvalidFields();
      this.bizzCalcService.showToastMessage(
        'warning',
        'Validation Error',
        `Please correct the following fields: ${invalidFields.join(', ')}`,
        5000
      );
    }
  }

  // Helper method to get the names of invalid fields
  private getInvalidFields(): string[] {
    const invalidFields: string[] = [];
    Object.keys(this.fixedAssetsForm.controls).forEach((key) => {
      const control = this.fixedAssetsForm.get(key);
      if (control && control.invalid) {
        invalidFields.push(key);
      }
    });
    return invalidFields;
  }



  onArrowCircleRightClicked(event: ICustomMonths): void {
    // this.employmentMonthNum = event;
    // this.fixedAssetsForm
    //   .get('FAPurchaseMonth')
    //   .setValue(this.employmentMonthNum.monthNo);
    // //
    // this.defaultMonthNumber += 1;
    // this.baseRateCustomMonths = this.bizzCalcService.configureMonthsArray(
    //   this.defaultMonthNumber > 12 ? 1 : this.defaultMonthNumber
    // );
    this.employmentMonthNum = event;
    this.fixedAssetsForm.get('FAPurchaseMonth').setValue(event?.monthNo);
  }

  public formatDate(date: Date): string {
    const day = date.getDate(); // Get the day of the month
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const month = monthNames[date.getMonth()]; // Get the abbreviated month name
    const year = date.getFullYear(); // Get the full year

    return `${day}-${month}-${year}`;
}

  public onCategoryChange($event: any): void {
    console.dir($event);

    this.catDepreciationRates.forEach((c) => {
      if (c.ID === $event.ID) {
        this.fixedAssetsForm
          .get('FADepreciationRate')
          .setValue(c.DepreciationRate);
          this.fixedAssetsForm.get('FACat').setValue(c.ID);
      }
    });
  }
}
