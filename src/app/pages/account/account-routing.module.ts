import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from 'src/app/components/account-components/profile/profile.component';
import { AccountComponent } from './account.component';
import { DocumentsComponent } from 'src/app/components/account-components/documents/documents.component';
import { CustomerServiceComponent } from 'src/app/components/account-components/customer-service/customer-service.component';

const routes: Routes = [
  {
    path: '',
    component: AccountComponent,
    children: [
      {
        path: 'profile',
        component: ProfileComponent,
      },
      {
        path: 'documents',
        component: DocumentsComponent,
      },
      {
        path: 'customer-service',
        component: CustomerServiceComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountRoutingModule {}
