import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './pages/main/main.component';
import { AuthGuard as UserCanActivate } from './guards/auth.guard';
import { CoursesComponent } from './components/bizzclass-components/courses/courses.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./pages/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'main',
    // canActivate: [UserCanActivate],
    component: MainComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./pages/dashboard/dashboard.module').then(
            (m) => m.DashboardModule
          ),
      },
      {
        path: 'bizzapps',
        loadChildren: () =>
          import('./pages/bizzapps/bizzapps.module').then(
            (m) => m.BizzappsModule
          ),
      },
      {
        path: 'courses',
        loadChildren: () =>
          import('./components/bizzclass-components/courses/courses.module').then(
            (m) => m.CoursesModule
          ),
      },
      {
        path: 'bizzclass',
        loadChildren: () =>
          import('./pages/bizzclass/bizzclass.module').then(
            (m) => m.BizzclassModule
          ),
      },
      {
        path: 'bizzmoney',
        loadChildren: () =>
          import('./pages/bizzmoney/bizzmoney.module').then(
            (m) => m.BizzmoneyModule
          ),
      },
      {
        path: 'bizzspark',
        loadChildren: () =>
          import('./pages/bizzspark/bizzspark.module').then(
            (m) => m.BizzsparkModule
          ),
      },
      {
        path: 'bizzmall',
        loadChildren: () =>
          import('./pages/bizzmall/bizzmall.module').then(
            (m) => m.BizzmallModule
          ),
      },
      {
        path: 'account',
        loadChildren: () =>
          import('./pages/account/account.module').then((m) => m.AccountModule),
      },
      {
        path: 'bizzcalc',
        loadChildren: () =>
          import('./apps/bizzcalc/bizzcalc.module').then(
            (m) => m.BizzcalcModule
          ),
      },
      {
        path: 'payment',
        loadChildren: () =>
          import('../app/pages/payment/payment.module').then(
            (m) => m.PaymentModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
