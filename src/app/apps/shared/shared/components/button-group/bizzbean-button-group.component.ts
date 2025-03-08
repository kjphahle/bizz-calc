import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  faArrowCircleLeft,
  faArrowAltCircleRight
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-bizzbean-button-group',
  templateUrl: './bizzbean-button-group.component.html',
  styleUrls: ['./bizzbean-button-group.component.scss']
})
export class BizzbeanButtonGroupComponent {
  @Output() increment = new EventEmitter<void>();
  @Output() decrement = new EventEmitter<void>();
  @Input() value: number;
  
  faArrowCircleLeft = faArrowCircleLeft;
  faArrowAltCircleRight = faArrowAltCircleRight;
  constructor(){}

  increase(): void {
    this.increment.emit();
  }
  decrease(): void {
    this.decrement.emit();
  }
}
