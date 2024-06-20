import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TopFourCompetitorsComponent} from './TFC_CCNC/top-four-competitors.component'
import { TFCCCMComponent } from './TFC_CCM/tfc-ccm.component';
import { TFCCCTCComponent } from './TFC_CCTC/tfc-cctc.component';
import { TFCCCTCMAPComponent } from './TFC_CCTCMAP/tfc-cctcmap.component';


const routes: Routes = [
{
  path: 'nbclient',
  component: TopFourCompetitorsComponent
},
{
  path: 'loantype',
  component: TFCCCTCComponent
},
{
  path: 'amount',
  component: TFCCCMComponent
},
{
  path: 'maplt',
  component: TFCCCTCMAPComponent
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TopFourCompetitorsRoutingModule { }
