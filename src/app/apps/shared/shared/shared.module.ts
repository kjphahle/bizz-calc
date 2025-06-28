import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfoTitleComponent } from './components/info-title/info-title.component';
import { BizzbeanFormLabelComponent } from './components/bizzbean-form-label/bizzbean-form-label.component';
import { BizzbeanNavControlComponent } from './components/bizzbean-nav-control/bizzbean-nav-control.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BizzbeanInputControlComponent } from './components/bizzbean-input-control/bizzbean-input-control.component';
import { BizzbeanActionButtonsComponent } from './components/bizzbean-action-buttons/bizzbean-action-buttons.component';
import { SaveButtonComponent } from './components/save-button/save-button.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BizzButtonComponent } from './components/button/button.component';

@NgModule({
  declarations: [
    InfoTitleComponent,
    BizzbeanFormLabelComponent,
    BizzbeanNavControlComponent,
    BizzbeanInputControlComponent,
    BizzbeanActionButtonsComponent,
    SaveButtonComponent,
  ],
  imports: [CommonModule, FontAwesomeModule, FormsModule, ReactiveFormsModule, BizzButtonComponent],
  exports: [
    InfoTitleComponent,
    BizzbeanFormLabelComponent,
    BizzbeanNavControlComponent,
    BizzbeanInputControlComponent,
    BizzbeanActionButtonsComponent,
    SaveButtonComponent,
    BizzButtonComponent
  ],
})
export class SharedModule {}
