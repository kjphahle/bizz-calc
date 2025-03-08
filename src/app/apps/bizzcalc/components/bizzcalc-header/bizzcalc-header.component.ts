import { Component, inject, Input, OnInit } from '@angular/core';
import { BizzCalcService } from '../../services/bizz-calc.service';

@Component({
  selector: 'app-bizzcalc-header',
  templateUrl: './bizzcalc-header.component.html',
  styleUrls: ['./bizzcalc-header.component.scss'],
})
export class BizzcalcHeaderComponent implements OnInit{

  public headerLabel: string = "";
  #bizzCalcService = inject(BizzCalcService);

  @Input() showLeftIcon = true;
  @Input() showRightIcon = true;
  @Input() title = 'setup';
  @Input() leftIconRoute: string = '';  //Route for the left icon
  @Input() rightIconRoute: string = ''; // Route for the right icon

  ngOnInit(): void {
    this.#bizzCalcService.scenarioName$.subscribe({next: value => {
      this.headerLabel = value;
    }})

  }


}
