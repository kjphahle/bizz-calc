import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  Self,
  SimpleChanges,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  FormGroupDirective,
  NgControl,
} from '@angular/forms';
import {
  faCalculator,
  faArrowCircleLeft,
  faArrowAltCircleRight,
  faCalendar,
  faCamera,
  faChartLine,
  faCoins,
  faGear,
  faPencilAlt,
  faScroll,
  faTruck,
  faUsers,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { ICustomMonths } from 'src/app/apps/bizzcalc/models/custom-months';

@Component({
    selector: 'app-bizzbean-nav-control',
    templateUrl: './bizzbean-nav-control.component.html',
    styleUrls: ['./bizzbean-nav-control.component.scss'],
    standalone: false
})
export class BizzbeanNavControlComponent
  implements OnChanges, ControlValueAccessor
{
  faArrowCircleLeft = faArrowCircleLeft;
  faArrowAltCircleRight = faArrowAltCircleRight;
  public currentMonthIndex = 0;
  @Input() btnLabel;
  @Input() customMonths: ICustomMonths[] = [];
  @Input() disableForwardArrow: boolean = false;
  @Input() disableBackwardArrow: boolean = false;
  @Output() arrowCircleLeftClicked = new EventEmitter<ICustomMonths>();
  @Output() arrowCircleRightClicked = new EventEmitter<ICustomMonths>();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['customMonths']) {
      this.arrowCircleLeftClicked.emit(this.customMonths[0]);
      // this.btnLabel = this.customMonths[0].monthNo;
    }

    if (changes['btnLabel']) {
      this.btnLabel = this.btnLabel;
      this.cdr.markForCheck();
    }
  }

  public onArrowCircleLeft(): void {
    if(this.disableBackwardArrow) {
      return;
    }
    if (this.currentMonthIndex > 0) {
      this.currentMonthIndex -= 1;
      this.arrowCircleLeftClicked.emit(
        this.customMonths[this.currentMonthIndex]
      );
      console.dir(this.customMonths[this.currentMonthIndex]);
      this.btnLabel = this.customMonths[this.currentMonthIndex].monthNo;
    }
  }

  public onArrowCircleRight(): void {
    if(this.disableForwardArrow) {
      return;
    }
    if (this.currentMonthIndex < 12) {
      this.currentMonthIndex += 1;
      this.arrowCircleRightClicked.emit(
        this.customMonths[this.currentMonthIndex]
      );
      console.dir(this.customMonths[this.currentMonthIndex]);
      this.btnLabel = this.customMonths[this.currentMonthIndex].monthNo;
    }
  }

  public formControlFocused = false;

  constructor(
    @Self() public controlDir: NgControl,
    private parent: FormGroupDirective,
    private cdr: ChangeDetectorRef
  ) {
    this.controlDir.valueAccessor = this;
  }
  writeValue(obj: any): void {}
  registerOnChange(fn: any): void {}
  registerOnTouched(fn: any): void {}

  get control(): FormControl {
    return this.controlDir.control as FormControl;
  }

  onFocus() {
    this.formControlFocused = true;
  }

  onBlur() {
    this.formControlFocused = false;
  }
}
