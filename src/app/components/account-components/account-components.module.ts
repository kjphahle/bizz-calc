import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile/profile.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { DocumentsComponent } from './documents/documents.component';
import { CustomerServiceComponent } from './customer-service/customer-service.component';

@NgModule({
  declarations: [ProfileComponent, DocumentsComponent, CustomerServiceComponent],
  imports: [CommonModule, FontAwesomeModule, NgbDatepickerModule],
  exports: [ProfileComponent],
})
export class AccountComponentsModule {}
