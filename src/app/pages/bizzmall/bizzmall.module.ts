import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BizzmallRoutingModule } from './bizzmall-routing.module';
import { BizzmallComponent } from './bizzmall.component';

@NgModule({
  declarations: [BizzmallComponent],
  imports: [CommonModule, BizzmallRoutingModule],
})
export class BizzmallModule {}
