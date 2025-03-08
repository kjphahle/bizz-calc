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
import { ControlValueAccessor, FormControl, FormGroupDirective, NgControl } from '@angular/forms';
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
import { ICategoryList } from 'src/app/apps/bizzcalc/models/category-list.interface';

@Component({
    selector: 'app-bizzbean-category-list-control',
    templateUrl: './bizzbean-category-list-control.component.html',
    styleUrls: ['./bizzbean-category-list-control.component.scss'],
    standalone: false
})
export class BizzbeanCategoryListControlComponent implements OnChanges, ControlValueAccessor {
  faArrowCircleLeft = faArrowCircleLeft;
  faArrowAltCircleRight = faArrowAltCircleRight;
  public currentCategoryIndex = 0;
  public btnLabel = '';
  @Output() arrowCircleLeftClicked = new EventEmitter<ICategoryList>();
  @Output() arrowCircleRightClicked = new EventEmitter<ICategoryList>();
  @Input() categoryList: ICategoryList[] = [];
  @Input() forwardArrowClicked: boolean = false;

  constructor(
    @Self() public controlDir: NgControl,
    private parent: FormGroupDirective,
    private cdr: ChangeDetectorRef
  ) {
    this.controlDir.valueAccessor = this;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['categoryList']) {
      this.arrowCircleLeftClicked.emit(this.categoryList[0]);
      this.btnLabel = this.categoryList[0]?.GLDescription;
      const firstCategory = this.categoryList.shift();
      this.categoryList.push(firstCategory);
      this.cdr.detectChanges();
    }

    if (changes['forwardArrowClicked']) {
      if(this.forwardArrowClicked) {
        this.arrowCircleRightClicked.emit(this.categoryList[1]);
      this.btnLabel = this.categoryList[1]?.GLDescription;
      this.cdr.detectChanges();
      }

    }


  }

  public onArrowCircleLeft(): void {
    if (this.currentCategoryIndex > 0) {
      this.currentCategoryIndex -= 1;
      this.arrowCircleLeftClicked.emit(
        this.categoryList[this.currentCategoryIndex]
      );
      console.dir(this.categoryList[this.currentCategoryIndex]);
      this.btnLabel = this.categoryList[this.currentCategoryIndex]?.GLDescription;
    }
  }

  public onArrowCircleRight(): void {
    if ( this.categoryList.length > this.currentCategoryIndex) {
      this.arrowCircleRightClicked.emit(
        this.categoryList[this.currentCategoryIndex]
      );
      this.btnLabel = this.categoryList[this.currentCategoryIndex]?.GLDescription;
      console.dir(this.categoryList[this.currentCategoryIndex]);
      this.currentCategoryIndex += 1;

    }
  }

  writeValue(obj: any): void {}
  registerOnChange(fn: any): void {}
  registerOnTouched(fn: any): void {}

  get control(): FormControl {
    return this.controlDir.control as FormControl;
  }
}
