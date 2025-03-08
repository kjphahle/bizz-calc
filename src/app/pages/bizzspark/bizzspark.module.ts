import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BizzsparkRoutingModule } from './bizzspark-routing.module';
import { BizzsparkComponent } from './bizzspark.component';


@NgModule({
  declarations: [BizzsparkComponent],
  imports: [
    CommonModule,
    BizzsparkRoutingModule
  ]
})
export class BizzsparkModule { }
