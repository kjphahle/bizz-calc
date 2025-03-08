import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BizzappsComponent } from './bizzapps.component';

const routes: Routes = [
  {
    path: '',
    component: BizzappsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BizzappsRoutingModule {}