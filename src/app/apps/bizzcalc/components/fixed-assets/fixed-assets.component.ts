import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { IDepreciationRate } from '../../models/depreciation-rate.interface';
import { BizzCalcService } from '../../services/bizz-calc.service';
import { ICategoryList } from '../../models/category-list.interface';
import { ICategoryDepreciationRate } from '../../models/fixed-assets.interface';
import { ICustomMonths } from '../../models/custom-months';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { FixedAssetsModalComponent } from 'src/app/apps/bizzcalc/components/setup/modals/fixed-assets-modal/fixed-assets-modal.component';
import { BaseAssumptionModalComponent } from'src/app/apps/bizzcalc/components/setup/modals/base-assumption-modal/base-assumption-modal.component';

@Component({
  selector: 'app-fixed-assets',
  templateUrl: './fixed-assets.component.html',
  styleUrls: ['./fixed-assets.component.scss']
})
export class FixedAssetsComponent {
  fixedAssetsForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private bizzCalcService: BizzCalcService,
    private cdr: ChangeDetectorRef,
    private modalService: NgbModal
  ) {
    this.generateFixedAssetsForm();
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

  public openModalWithDynamicContent() {
    const modalRef = this.modalService.open(BaseAssumptionModalComponent, {
      backdropClass: 'custom-backdrop',
    });
  
    modalRef.componentInstance.title = 'fixed assets';
    modalRef.componentInstance.contentHtml = `
    <div class="custom-modal-content">
    <p>Fixed Assets are those assets required for production of income.
    </p>
    <ul>
      <li> use the slider to select the month of purchase.</li>
      <li>describe the asset purchased.</li>
      <li>state the number of units purchased
      .</li>
      <li>enter the item’s cost including installation expenses
      .</li>
      <li>from the slider, select the asset category – the depreciation rate will appear
      .</li>
      <li>save the data after each addition.</li>
    <li>click on the view data button to review and amend your decisions, if necessary.
    </li>
    </ul>
    </div>
   `;
  }
  
}




