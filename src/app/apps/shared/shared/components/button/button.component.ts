import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'bizz-button',
    templateUrl: './button.component.html',
    styleUrls: ['./button.component.scss'],
    standalone: true
})
export class BizzButtonComponent {
  @Output() buttonClicked = new EventEmitter<boolean>();
  @Input() label = "bizz button";

  public onSaveClicked(): void {
    this.buttonClicked.emit(true);
  }
}
