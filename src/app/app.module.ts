import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MainComponent } from './pages/main/main.component';
import { NavbarModule } from './components/navbar/navbar.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import {
  //NgxMaskModule,
  IConfig,
  NgxMaskDirective,
  NgxMaskPipe,
} from 'ngx-mask';
import { CommonModule } from '@angular/common';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { InvoiceComponent } from './pages/invoice/invoice.component';

import { authInterceptor } from './apps/bizzcalc/interceptor/auth.interceptor';
import { ErrorHandlerService } from './services/error-handler.service';

const maskConfig: Partial<IConfig> = {
  validation: false,
};

@NgModule({
  declarations: [AppComponent, MainComponent, InvoiceComponent],
  imports: [
    BrowserModule,
    // FormModule,
    ReactiveFormsModule,
    AppRoutingModule,
    //NgbModule,
    BrowserAnimationsModule,
    NavbarModule,
    FontAwesomeModule,
    HttpClientModule,
    NgxMaskDirective,
    SlickCarouselModule,
    NgbModule,
    CommonModule,
    NgxIntlTelInputModule,
    BsDatepickerModule.forRoot(),
    TooltipModule.forRoot()
  ],

  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: authInterceptor, multi: true },
    {provide: ErrorHandler, useClass: ErrorHandlerService}
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
