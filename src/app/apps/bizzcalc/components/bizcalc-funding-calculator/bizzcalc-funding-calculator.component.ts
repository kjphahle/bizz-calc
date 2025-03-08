import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FundingCalculator } from '../../models/FundingCalculator';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BizzCalcService } from '../../services/bizz-calc.service';
import { BaseAssumptionModalComponent } from '../setup/modals/base-assumption-modal/base-assumption-modal.component';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
@Component({
    selector: 'app-bizzcalc-funding-calculator',
    templateUrl: './bizzcalc-funding-calculator.component.html',
    styleUrls: ['./bizzcalc-funding-calculator.component.scss'],
    standalone: false
})
export class BizzcalcFundingCalculatorComponent {
  fundingCalculatorForm: FormGroup;
 

  constructor(private router: Router, private bizzCalcService: BizzCalcService,private modalService: NgbModal) {
    this.fundingCalculatorForm = new FormGroup({
      Floats: new FormControl('', [Validators.required,Validators.min(0)],),
      Deposits: new FormControl('', [Validators.required,Validators.min(0)]),
      PettyCash: new FormControl('', [Validators.required,Validators.min(0)]),
      InventoryDays: new FormControl('',  [Validators.required, Validators.min(0), Validators.max(90)],),
      ReceivablesDays: new FormControl('', [Validators.required, Validators.min(0), Validators.max(90)],),
      PayablesDays: new FormControl('', [Validators.required,Validators.min(0),Validators.max(90),]),
    });
    
  }

  public goToBaseAssumptions() {
    this.router.navigate([
      '/main/bizzcalc/funding-calculator-base-assumptions',
    ]);
  }

  public openModalWithDynamicContent() {
    const modalRef = this.modalService.open(BaseAssumptionModalComponent, {
      backdropClass: 'custom-backdrop',
    });

    if (!modalRef) {
      console.error('Modal failed to open');
      return;
    }

    modalRef.componentInstance.title = 'funding calculator';
    modalRef.componentInstance.contentHtml = `
      <div class="custom-modal-content">
        <p>Enter the values required for the two net operating asset elements.</p>
        <P>working capital days</p>
        <ul>
          <li>Enter the number of days anticipated for each working capital element.</li>
          
          <li>
          enter the number of days anticipated for each working capital element .</li>
          </ul>
        <P>other assets</p>
        <ul>
        <li>
        enter the balance sheet value for each asset category .</li>

        <li>click on the view data button to review and amend your decisions, if necessary</li>
        <li>save the data.</li>
      </ul>
      </div>`;
  }

  public onSaveClicked(): void {
    // Mark all fields as touched to trigger validation feedback
    this.fundingCalculatorForm.markAllAsTouched();
  
    // Check if the form is valid and required fields are filled
    if (this.fundingCalculatorForm.valid && !this.isFieldEmpty()) {
      const fundingCalculator = this.fundingCalculatorForm.value;
  
      this.bizzCalcService.PostFundingCalculator(fundingCalculator).subscribe({
        next: () => {
          this.bizzCalcService.showToastMessage(
            '',
            '',
            'funding calculator added successfully.',
            3000
          );
        },
        error: (err) => {
          console.error('Error posting data:', err);
        },
      });
    } else {
      // Show a validation error message if form is invalid
      this.bizzCalcService.showToastMessage(
        '',
        '',
        'Please fill in all required fields.',
        3000
      );
    }
  }
  
  // Example custom check for empty fields
  private isFieldEmpty(): boolean {
    return (
      !this.fundingCalculatorForm.get('Floats')?.value ||
      !this.fundingCalculatorForm.get('Deposits')?.value
    );
    }
  }
  ``
  