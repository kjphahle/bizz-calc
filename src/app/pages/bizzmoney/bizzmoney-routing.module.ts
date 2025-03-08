import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BizzmoneyComponent } from './bizzmoney.component';

const routes: Routes = [
  {
    path: '',
    component: BizzmoneyComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BizzmoneyRoutingModule { }
