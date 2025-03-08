import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BizzsparkComponent } from './bizzspark.component';

const routes: Routes = [
  {
    path: '',
    component: BizzsparkComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BizzsparkRoutingModule { }
