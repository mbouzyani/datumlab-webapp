import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfigInterface, PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { ClickOutsideModule } from 'ng-click-outside';
import { BreadcrumbModule } from '../shared/components/breadcrumb/breadcrumb.module';
import { CardModule } from '../shared/components/card/card.module';
import { HighchartsChartModule } from 'highcharts-angular';


import { SpinnerComponent } from './components/spinner/spinner.component';
import { EmailReportComponent } from './email-report/email-report.component';
import { CardComponent } from './widgets/card/card.component';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { TextFieldModule } from '@angular/cdk/text-field';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';

import { FlexLayoutModule } from '@angular/flex-layout';


const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PerfectScrollbarModule,
    ClickOutsideModule,
    BreadcrumbModule,
    CardModule,
    MatIconModule,
    MatButtonModule,
    HighchartsChartModule,
    TextFieldModule,
    FlexLayoutModule,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatInputModule
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    PerfectScrollbarModule,
    ClickOutsideModule,
    BreadcrumbModule,
    CardModule,
    SpinnerComponent,
    EmailReportComponent,
    MatIconModule,
    MatButtonModule,
    FlexLayoutModule,
    TextFieldModule,
    MatCardModule,
    CardComponent,
    MatFormFieldModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatInputModule
  ],
  declarations: [
    SpinnerComponent,
    EmailReportComponent,
    CardComponent,
    
  ],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    },
    
  ]
})
export class SharedModule { }

