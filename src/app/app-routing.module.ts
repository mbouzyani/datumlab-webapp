import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainNavigationComponent } from './main-navigation/main-navigation.component';
import { AuthComponent } from './authentication/auth.component';
import { AuthGuard }   from './guard/auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component'
import { SupportContactComponent } from './support-contact/support-contact.component';



const routes: Routes = [
  {
    path: '',
    component:  AuthComponent,
    children: [
      {
        path: '',
        redirectTo: '/auth/signin', 
        pathMatch: 'full'
      },
      {
        path: 'auth',
        loadChildren: () => import('./authentication/authentication.module').then(module => module.AuthenticationModule)
      }
    ]
  },
  {
    path: '',
    component: MainNavigationComponent,
    canActivate: [AuthGuard],
    children: [
      // {
      //   path: '',
      //   redirectTo: 'dashboard/analytics',
      //   pathMatch: 'full'
      // },
      {
        path: 'dashboard',
        component:  DashboardComponent,
        pathMatch: 'full'
      },
      
      {
        path: '',
        redirectTo: 'lctt/score',
        pathMatch: 'full'
      },
      {
        path: 'lctt',
        loadChildren: () => import('./report/loan-coming-to-term/lctt.module').then(module => module.LcttModule)
      },
      {
        path: 'top4',
        loadChildren: () => import('./report/top-four-competitors/top-four-competitors.module').then(module => module.TopFourCompetitorsModule)
      },
      {
        path: 'dv-da',
        loadChildren: () => import('./report/decision-velocity/decision-velocity.module').then(module=> module.DecisionVelocityModule)
      },
      {
        path: 'dv-cc',
        loadChildren: () => import('./report/conclusion-velocity/conclusion-velocity.module').then(module=> module.ConclusionVelocityModule)
      },
      {
        path: 'cac',
        loadChildren: () => import('./report/acquisition-cost/acquisition-cost.module').then(module=> module.AquisitionCostModule)
      },
      {
        path: 'layout/dashborad/horizontal',
        component:  DashboardComponent,
      },
     
    ]
  },
  {
    path: 'support',
    component:  SupportContactComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
