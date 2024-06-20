import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { HighchartsChartModule } from 'highcharts-angular';
import { FormsModule, ReactiveFormsModule}  from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';

import { SharedModule } from '../../shared/shared.module';
import { AcquiqitionCostComponent } from './acquiqition-cost/acquiqition-cost.component';
import { AcquisitionCostRoutingModule } from './acquisition-cost-routing.module'



@NgModule({
  declarations: [
    AcquiqitionCostComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    AcquisitionCostRoutingModule,
    HighchartsChartModule,
    MatFormFieldModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    SharedModule,
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
    AcquiqitionCostComponent,
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


export class AquisitionCostModule { }
