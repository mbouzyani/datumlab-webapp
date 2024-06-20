import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AcquiqitionCostComponent } from './acquiqition-cost/acquiqition-cost.component';

const routes: Routes = [
  {
    path: '',
    component: AcquiqitionCostComponent
  }
];




@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})



export class AcquisitionCostRoutingModule { }
