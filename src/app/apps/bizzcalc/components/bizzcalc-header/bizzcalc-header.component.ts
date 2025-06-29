import {
  Component,
  inject,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { BizzCalcService } from '../../services/bizz-calc.service';

@Component({
  selector: 'app-bizzcalc-header',
  templateUrl: './bizzcalc-header.component.html',
  styleUrls: ['./bizzcalc-header.component.scss'],
  standalone: false,
})
export class BizzcalcHeaderComponent implements OnInit, OnChanges {

  #bizzCalcService = inject(BizzCalcService);

  @Input() showLeftIcon = true;
  @Input() showInfoTitle = true;
  @Input() public showheaderLabel: boolean = true;
  @Input() showRightIcon = true;
  @Input() title = 'setup';
  @Input() leftIconRoute: string = ''; //Route for the left icon
  @Input() rightIconRoute: string = ''; // Route for the right icon
  public headerLabel: string = '';

  ngOnInit(): void {
    this.#bizzCalcService.scenarioName$.subscribe({
      next: (value) => {
        this.headerLabel = this.showheaderLabel === true ? value : '';
      },
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes['showheaderLabel'].currentValue) {
      this.headerLabel = "";
    }
  }

}
