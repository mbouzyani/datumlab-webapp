import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule}  from '@angular/forms';

import { HighchartsChartModule } from 'highcharts-angular';

import { TFCCCMComponent } from './TFC_CCM/tfc-ccm.component';
import { TFCCCTCComponent } from './TFC_CCTC/tfc-cctc.component';
import { TFCCCTCMAPComponent } from './TFC_CCTCMAP/tfc-cctcmap.component';
import { TopFourCompetitorsRoutingModule } from './top-four-competitors-routing.module';
import { TopFourCompetitorsComponent } from './TFC_CCNC/top-four-competitors.component' 

import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';

import { SharedModule } from '../../shared/shared.module'



@NgModule({
  declarations: [
    TopFourCompetitorsComponent,
    TFCCCMComponent,
    TFCCCTCComponent,
    TFCCCTCMAPComponent,
   
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule,
    HighchartsChartModule,
    MatFormFieldModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    SharedModule,
    TopFourCompetitorsRoutingModule,
    MatSelectModule,
    MatIconModule,
    FormsModule,
    HighchartsChartModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDividerModule,
    
  ],
  exports:[
    TopFourCompetitorsComponent,
    TFCCCMComponent,
    TFCCCTCComponent,
    TFCCCTCMAPComponent,
    FormsModule,
    ReactiveFormsModule,
    HighchartsChartModule,
    MatIconModule,
    MatSelectModule,
    MatTableModule, 
    MatPaginatorModule,
    MatSortModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    SharedModule,
    MatDividerModule,
    ReactiveFormsModule,
    HighchartsChartModule, 
    MatFormFieldModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
    
  ]
})
export class TopFourCompetitorsModule {}


