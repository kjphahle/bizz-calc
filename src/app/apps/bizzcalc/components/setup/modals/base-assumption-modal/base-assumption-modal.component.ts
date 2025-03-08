import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-base-assumption-modal', // Updated to match the actual component name
    templateUrl: './base-assumption-modal.component.html', // Ensure this path is correct
    styleUrls: ['./base-assumption-modal.component.scss'],
    standalone: false
})
export class BaseAssumptionModalComponent {
  @Input() title: string = 'Default Title';
  @Input() contentHtml: string = ''; // HTML content passed as a stringInput to receive the hardcoded message, if needed

  constructor(public activeModal: NgbActiveModal) {}
}
