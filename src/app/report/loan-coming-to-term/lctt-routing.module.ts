import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoanComingToTermComponent } from './LCTT-score/loan-coming-to-term.component'
import { MapComponent } from './LCTT-DR/map.component'
import { CitiesComponent } from './LCTT-DCI/cities.component';
import { FinancingCapacityComponent } from './LCTT-capacity/financing-capacity.component';

const routes: Routes = [
  
  
  
  {
    path: 'score',
    component: LoanComingToTermComponent
  },
  {
    path: 'map',
    component: MapComponent
  },
  {
    path: 'city',
    component: CitiesComponent
  },
  {
    path: 'capacity',
    component: FinancingCapacityComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LCTTRoutingModule { }
