import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BizzclassRoutingModule } from './bizzclass-routing.module';
import { BizzclassComponent } from './bizzclass.component';
import { BizzclassComponentsModule } from 'src/app/components/bizzclass-components/bizzclass-components.module';


@NgModule({
  declarations: [BizzclassComponent],
  imports: [
    CommonModule,
    BizzclassRoutingModule,
    BizzclassComponentsModule
  ]
})
export class BizzclassModule { }
