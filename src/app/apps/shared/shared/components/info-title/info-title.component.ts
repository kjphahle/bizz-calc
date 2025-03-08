import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-info-title',
    templateUrl: './info-title.component.html',
    styleUrls: ['./info-title.component.scss'],
    standalone: false
})
export class InfoTitleComponent {
  @Input() title: string = '';
  public showTooltip() {}
}
