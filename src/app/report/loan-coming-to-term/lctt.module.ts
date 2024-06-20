import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HighchartsChartModule }  from 'highcharts-angular';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from "../../shared/shared.module";



import { LoanComingToTermComponent } from './LCTT-score/loan-coming-to-term.component';
import { MapComponent } from './LCTT-DR/map.component';
import { LCTTRoutingModule } from './lctt-routing.module';
import { CitiesComponent } from './LCTT-DCI/cities.component';
import { FinancingCapacityComponent } from './LCTT-capacity/financing-capacity.component';

@NgModule({
  declarations: [
    LoanComingToTermComponent, 
    MapComponent, 
    CitiesComponent,
    FinancingCapacityComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    AngularMultiSelectModule,
    CommonModule,
    RouterModule,
    LCTTRoutingModule,
    HighchartsChartModule,
    MatFormFieldModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    SharedModule
  ],
  exports: [
    LoanComingToTermComponent,
    MapComponent, 

    ReactiveFormsModule,
    HighchartsChartModule, 
    AngularMultiSelectModule,
    MatFormFieldModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class LcttModule { }
