import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-save-button',
  templateUrl: './save-button.component.html',
  styleUrls: ['./save-button.component.scss'],
})
export class SaveButtonComponent {
  @Output() saveClicked = new EventEmitter<boolean>();

  public onSaveClicked(): void {
    this.saveClicked.emit(true);
  }
}
