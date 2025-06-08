import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FundingCalculator } from '../../models/FundingCalculator';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BizzCalcService } from '../../services/bizz-calc.service';
import { BaseAssumptionModalComponent } from '../setup/modals/base-assumption-modal/base-assumption-modal.component';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { FundingCalculatorModalComponent } from '../setup/modals/funding-calculator-modal/funding-calculator-modal.component';
import { accountDetails } from '../../models/accountDetails';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-bizzcalc-funding-calculator',
  templateUrl: './bizzcalc-funding-calculator.component.html',
  styleUrls: ['./bizzcalc-funding-calculator.component.scss'],
  standalone: false,
})
export class BizzcalcFundingCalculatorComponent {
  modalRef: NgbModalRef;
  fundingCalculatorForm: FormGroup;
  accountDetails: accountDetails[] = [];

  constructor(
    private router: Router,
    private bizzCalcService: BizzCalcService,
    private modalService: NgbModal
  ) {
    this.getWorkingCapitalReport();

    this.fundingCalculatorForm = new FormGroup({
      InventoryDays: new FormControl(0, [
        Validators.required,
        Validators.min(0),
        Validators.max(90),
      ]),
      ReceivablesDays: new FormControl(0, [
        Validators.required,
        Validators.min(0),
        Validators.max(90),
      ]),
      PayablesDays: new FormControl(0, [
        Validators.required,
        Validators.min(0),
        Validators.max(90),
      ]),
      Floats: new FormControl(0, [Validators.required, Validators.min(0)]),
      Deposits: new FormControl(0, [Validators.required, Validators.min(0)]),
      PettyCash: new FormControl(0, [Validators.required, Validators.min(0)]),
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

  public onViewDataBtnClicked(): void {
    this.modalRef = this.modalService.open(FundingCalculatorModalComponent, {
      ariaLabelledBy: 'modal-basic-title',
      backdropClass: 'custom-backdrop',
    });

    this.modalRef.componentInstance.accountDetails = this.accountDetails;
    this.modalRef.result
      .then((reason: { mode: number; data: any }) => {
        console.dir(reason);
      })
      .catch((reason: any) => {
        if (reason.mode === 0) {
          this.accountDetails = this.accountDetails.filter(
            (item) => item.id !== reason.data.id
          );
        } else if (reason.mode === 1) {
          debugger;
          this.fundingCalculatorForm
            .get('InventoryDays')
            .setValue(reason.data.EmployeeName);
          this.fundingCalculatorForm
            .get('ReceivablesDays')
            .setValue(reason.data.MonthEmployed);
          this.fundingCalculatorForm
            .get('PayablesDays')
            .setValue(reason.data.ReviewMonth);
          this.fundingCalculatorForm
            .get('Floats')
            .setValue(reason.data.ReviewMonth);
          this.fundingCalculatorForm.get('Deposits').setValue(reason.data.Qty);
          this.fundingCalculatorForm
            .get('PettyCash')
            .setValue(reason.data.Amount);
        }
      });
  }

  private getWorkingCapitalReport(): void {
    this.bizzCalcService
      .getWorkingCapitalReport()
      .pipe(map((c) => c.children))
      .subscribe({
        next: (data) => {
          this.accountDetails = data;
        },
        error: (err) => {
          console.error('Error posting data:', err);
        },
      });
  }

  public onSaveClicked(): void {
    // Mark all fields as touched to trigger validation feedback
    this.fundingCalculatorForm.markAllAsTouched();

    // Check if the form is valid and required fields are filled
    if (this.fundingCalculatorForm.valid) {
      const fundingCalculator = this.fundingCalculatorForm.value;

      this.bizzCalcService.PostFundingCalculator(fundingCalculator).subscribe({
        next: () => {
          this.bizzCalcService.showToastMessage(
            '',
            '',
            'funding calculator added.',
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

  public onAddButtonClicked(): void {
    alert('Add button clicked!');
    debugger;
    if (this.fundingCalculatorForm.valid) {
      // Add or update employee in the list
      // const employee = this.createEmployeeFromForm();
      this.accountDetails.push({
        // id: this.accountDetails.length + 1, // Simple ID generation
        inventory: this.fundingCalculatorForm.get('InventoryDays')?.value,
        accountsReceivable:
          this.fundingCalculatorForm.get('ReceivablesDays')?.value,
        accountsPayable: this.fundingCalculatorForm.get('PayablesDays')?.value,
        monthNo: 1,
        monthDate: new Date().toISOString().split('T')[0], // Current date as monthDate
        // Floats: this.fundingCalculatorForm.get('Floats')?.value,
        // Deposits: this.fundingCalculatorForm.get('Deposits')?.value,
        // PettyCash: this.fundingCalculatorForm.get('PettyCash')?.value,
      });
      // const empIndex = this.employees.findIndex(e => e.EmployeeName === employee.EmployeeName);

      // if (empIndex !== -1) {
      //   this.employees[empIndex] = employee;
      //   this.showToast('Employee updated.');
      // } else {
      //   this.employees.push(employee);
      //   this.showToast('employee added ');
      // }

      // Clear the form after successful addition
      // this.employmentForm.reset();
    } else {
      // Mark all controls as touched to show validation errors
      this.fundingCalculatorForm.markAllAsTouched();
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
``;
