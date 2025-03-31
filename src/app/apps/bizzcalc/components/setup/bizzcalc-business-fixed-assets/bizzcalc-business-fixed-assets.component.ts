import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BizzCalcService } from '../../../services/bizz-calc.service';
import { IFixedAssets } from '../../../models/fixed-assets.interface';
import { IDepreciationRate } from '../../../models/depreciation-rate.interface';
import { ICategoryList } from '../../../models/category-list.interface';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { FixedAssetsCategoriesModalComponent } from '../modals/fixed-assets-categories-modal/fixed-assets-categories-modal.component';
import { BaseAssumptionModalComponent } from '../modals/base-assumption-modal/base-assumption-modal.component';

@Component({
  selector: 'app-bizzcalc-business-fixed-assets',
  templateUrl: './bizzcalc-business-fixed-assets.component.html',
  styleUrls: ['./bizzcalc-business-fixed-assets.component.scss'],
  standalone: false,
})
export class BizzcalcBusinessFixedAssetsComponent implements OnInit {
  public assetsCategoryDepreciationForm: FormGroup;
  public fixedAssetArray: IFixedAssets[] = [];
  public depreciationRates: IDepreciationRate[] = [];
  public categories: ICategoryList[] = [];
  public selectedCategory!: IDepreciationRate;
  closeResult = '';
  modalRef: NgbModalRef;

  constructor(
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private bizzCalcService: BizzCalcService
  ) {}

  public userDepreciationRates = [];

  private getDepreciationRates(): void {
    this.bizzCalcService.getDepreciationRates().subscribe({
      next: (depRate) => {
        console.log(this.categories);
        this.depreciationRates = [];

        // Build depreciation rates based on categories and fetched data
        this.categories.forEach((category) => {
          depRate.forEach((rate) => {
            const categoryExists = this.depreciationRates.findIndex(
              (existingRate) => existingRate.CategoryID === rate.CategoryID
            );
            if (category.ID === rate.CategoryID && categoryExists === -1) {
              this.depreciationRates.push({
                CategoryID: +category.ID,
                GLDescription: category.GLDescription,
                ID: category.ID,
                Rate: rate.DepreciationRate,
              });
            }
          });
        });
      },
      error: (error) => {
        console.error('Error fetching depreciation rates:', error);
      },
    });
  }

  ngOnInit() {
    this.assetsCategoryDepreciationForm = this.formBuilder.nonNullable.group({
      categoryID: [null, Validators.required],
      rate: [
        null, // Default value
        [Validators.required, Validators.min(1), Validators.max(100)], // Validation rules
      ],
    });

    this.bizzCalcService.getFixedAssetsList().subscribe({
      next: (fixedAssets) => {
        this.fixedAssetArray = fixedAssets;
        this.categories = fixedAssets;
        this.assetsCategoryDepreciationForm
          .get('categoryID')
          .setValue(this.categories[0].ID);
        this.assetsCategoryDepreciationForm.get('rate').setValue(0);
      },
    });

    this.getDepreciationRates();
  }

  public onAddDepreciationRate(): void {
    // Check if the form is valid
    debugger
    if (this.assetsCategoryDepreciationForm.valid) {
      const categoryRate =
        this.assetsCategoryDepreciationForm.get('rate')?.value;

      // Update the depreciation rates array
      const depreciationRate = this.depreciationRates.filter((c) => c.CategoryID === this.selectedCategory.ID);

      debugger;

      // Show success toast message
      this.bizzCalcService.showToastMessage(
        'contrast',
        '',
        'depreciation rate added',
        3000
      );

      // Reset form after success
      // this.assetsCategoryDepreciationForm.reset();
      if (depreciationRate) {
        this.userDepreciationRates.push({
          CategoryID: depreciationRate[0].ID,
          GLDescription: depreciationRate[0].GLDescription,
          Rate: categoryRate,
        });
      }
    } else {
      // Mark all fields as touched to trigger validation
      this.assetsCategoryDepreciationForm.markAllAsTouched();
    }
  }

  public onViewDataBtnClicked(): void {
    // Open the modal for fixed assets categories
    this.modalRef = this.modalService.open(
      FixedAssetsCategoriesModalComponent,
      {
        ariaLabelledBy: 'modal-basic-title',
        backdropClass: 'custom-backdrop',
      }
    );

    // Pass depreciation rates to the modal
    this.modalRef.componentInstance.depreciationRates = this.userDepreciationRates;
    // Handle modal result
    this.modalRef.result.then(
      (result: { mode: number; data: IDepreciationRate }) => {
        alert(result.mode);
        if (result.mode === 0) {
          // Handle mode 0: Remove an item based on GLDescription
          this.depreciationRates = this.depreciationRates.filter(
            (item) => item.GLDescription !== result.data.GLDescription
          );
        } else if (result.mode === 1) {
          // Handle mode 1: Update rate in the form
          this.assetsCategoryDepreciationForm
            .get('rate')
            .setValue(result.data.Rate);
        }
      },
      (result) => {
        alert(result.mode);
        console.log('Modal dismissed:', result);
        if (result.mode === 0) {
          // Handle mode 0: Remove an item based on GLDescription
          this.userDepreciationRates = this.userDepreciationRates.filter(
            (item) => item.GLDescription !== result.data.GLDescription
          );
        } else if (result.mode === 1) {
          // Handle mode 1: Update rate in the form
          this.assetsCategoryDepreciationForm
            .get('rate')
            .setValue(result.data.Rate);
        } else {
          alert("heloo")
          this.assetsCategoryDepreciationForm
            .get('rate')
            .setValue(result.data.Rate);
        }
      }
    );
  }

  public openModalWithDynamicContent() {
    const modalRef = this.modalService.open(BaseAssumptionModalComponent, {
      backdropClass: 'custom-backdrop',
    });

    modalRef.componentInstance.title = 'fixed asset depreciation rates';
    modalRef.componentInstance.contentHtml = `
    <div class="custom-modal-content">
    <p>The app has predetermined fixed asset categories. Scroll through each category and set a depreciation rate based on your requirements. These categories are applied to the purchases of each item in the fixed assets step of the app.

    </p>
    <ul>
      <li>click on the view data button to review and amend your decisions, if necessary.</li>
      <li> save the data.</li>

    </ul>
    </div>
    `;
  }

  public onSaveClicked(): void {
    if (this.assetsCategoryDepreciationForm.valid) {
      this.bizzCalcService
        .createDepreciationAsset(this.userDepreciationRates)
        .subscribe({
          next: () => {
            this.bizzCalcService.showToastMessage(
              'contrast',
              '',
              'Fixed assets added.',
              3000
            );

            // Reset the form after successful submission
            // this.assetsCategoryDepreciationForm.reset();
          },
        });
    } else {
      // Mark all fields as touched to trigger validation errors
      this.assetsCategoryDepreciationForm.markAllAsTouched();
    }
  }

  public onCategoryChange($event: any): void {
    if ($event) {
      this.assetsCategoryDepreciationForm.get('rate').setValue(null);
      this.assetsCategoryDepreciationForm
        .get('categoryID')
        .setValue($event?.ID);
      this.selectedCategory = $event as IDepreciationRate;
      // hceck if value exist
      const depreciationRate = this.depreciationRates.find(
        (f) => f.CategoryID === $event.ID
      );
      if (!depreciationRate && $event) {
        this.depreciationRates.push({
          CategoryID: $event.ID,
          GLDescription: $event.GLDescription,
          Rate: 0,
        });
      }
    }
  }

  private createHolidayGroup() {}
}
