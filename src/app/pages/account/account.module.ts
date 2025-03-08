import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { AccountComponent } from './account.component';
import { AccountComponentsModule } from 'src/app/components/account-components/account-components.module';
@NgModule({
  declarations: [AccountComponent],
  imports: [CommonModule, AccountRoutingModule, AccountComponentsModule],
})
export class AccountModule {}
