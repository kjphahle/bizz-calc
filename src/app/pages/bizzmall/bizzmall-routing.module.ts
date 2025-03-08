import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BizzmallComponent } from './bizzmall.component';

const routes: Routes = [
  {
    path: '',
    component: BizzmallComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BizzmallRoutingModule {}
