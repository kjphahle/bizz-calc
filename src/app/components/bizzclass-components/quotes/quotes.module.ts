import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuotesRoutingModule } from './quotes-routing.module';
import { QuotesComponent } from './quotes.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';


@NgModule({
  declarations: [QuotesComponent],
  imports: [
    CommonModule,
    QuotesRoutingModule,
    SlickCarouselModule,
    

],
schemas:[CUSTOM_ELEMENTS_SCHEMA]
  
})
export class QuotesModule { }