import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'app-save-button',
    templateUrl: './save-button.component.html',
    styleUrls: ['./save-button.component.scss'],
    standalone: false
})
export class SaveButtonComponent {
  @Output() saveClicked = new EventEmitter<boolean>();
  @Input() label = "save";

  public onSaveClicked(): void {
    this.saveClicked.emit(true);
  }
}
