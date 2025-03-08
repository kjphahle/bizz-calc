import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-bizzbean-action-buttons',
  templateUrl: './bizzbean-action-buttons.component.html',
  styleUrls: ['./bizzbean-action-buttons.component.scss'],
})
export class BizzbeanActionButtonsComponent {
  @Output() public saveClicked = new EventEmitter<void>();
  public onSaveClicked(): void {
    this.saveClicked.emit();
  }

  @Output() public viewDataClicked = new EventEmitter<void>();
  public onViewDataClicked(): void {
    this.viewDataClicked.emit();
  }
}
