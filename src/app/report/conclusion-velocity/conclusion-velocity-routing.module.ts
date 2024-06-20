import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DvTcComponent } from './DV-TC/dv-tc.component';
import { DvMapComponent } from './DV-MAP/dv-map.component';
import { DVNCComponent } from './DV-NC/dv-nc.component';

const routes: Routes = [
  {
    path: 'nbclient',
    component: DVNCComponent
  },
  {
    path: 'loantype',
    component: DvTcComponent
  },
  {
    path: 'mapdv',
    component: DvMapComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConclusionVelocityRoutingModule { }
