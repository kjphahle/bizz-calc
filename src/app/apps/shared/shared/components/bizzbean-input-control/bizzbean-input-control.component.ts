import { Component, Input, Self } from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NgControl,
  FormGroupDirective,
} from '@angular/forms';

@Component({
    selector: 'app-bizzbean-input-control',
    templateUrl: './bizzbean-input-control.component.html',
    styleUrls: ['./bizzbean-input-control.component.scss'],
    standalone: false
})
export class BizzbeanInputControlComponent implements ControlValueAccessor {
  @Input() label = '';
  @Input() id = '';
  @Input() placeholder = '';

  constructor(
    @Self() public controlDir: NgControl,
    private parent: FormGroupDirective
  ) {
    this.controlDir.valueAccessor = this;
  }
  writeValue(obj: any): void {}
  registerOnChange(fn: any): void {}
  registerOnTouched(fn: any): void {}

  get control(): FormControl {
    return this.controlDir.control as FormControl;
  }
}
