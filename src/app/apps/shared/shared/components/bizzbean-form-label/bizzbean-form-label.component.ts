import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-bizzbean-form-label',
    templateUrl: './bizzbean-form-label.component.html',
    styleUrls: ['./bizzbean-form-label.component.scss'],
    standalone: false
})
export class BizzbeanFormLabelComponent {
  @Input() label: string = '';
}
