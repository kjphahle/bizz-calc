import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { AuthComponent } from './auth.component';
import { RoleOptionsComponent } from './role-options/role-options.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { WelcomeComponent } from './welcome/welcome.component';


@NgModule({
  declarations: [
    LoginComponent,
    ForgotPasswordComponent,
    AuthComponent,
    RoleOptionsComponent,
    RegisterComponent,
    WelcomeComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    FontAwesomeModule,
    NgbTooltipModule,
    NgxIntlTelInputModule
  ],
})
export class AuthModule {}
