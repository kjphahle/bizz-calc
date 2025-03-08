import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BizzmoneyRoutingModule } from './bizzmoney-routing.module';
import { BizzmoneyComponent } from './bizzmoney.component';

@NgModule({
  declarations: [BizzmoneyComponent],
  imports: [CommonModule, BizzmoneyRoutingModule],
})
export class BizzmoneyModule {}
