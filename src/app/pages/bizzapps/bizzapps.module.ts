import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BizzappsRoutingModule } from './bizzapps-routing.module';
import { BizzappsComponent } from './bizzapps.component';


@NgModule({
  declarations: [BizzappsComponent],
  imports: [
    CommonModule,
    BizzappsRoutingModule
  ]
})
export class BizzappsModule { }