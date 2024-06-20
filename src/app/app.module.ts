import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HighchartsChartModule } from 'highcharts-angular';
import { NgbButtonsModule, NgbDropdownModule, NgbTabsetModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';


import { AppRoutingModule } from './app-routing.module';


import { AppComponent } from './app.component';
import { MainNavigationComponent } from './main-navigation/main-navigation.component';
import { NavigationComponent } from './main-navigation/navigation/navigation.component';
import { NavContentComponent } from './main-navigation//navigation/nav-content/nav-content.component';
import { NavGroupComponent } from './main-navigation//navigation/nav-content/nav-group/nav-group.component';
import { NavCollapseComponent } from './main-navigation//navigation/nav-content/nav-collapse/nav-collapse.component';
import { NavItemComponent } from './main-navigation/navigation/nav-content/nav-item/nav-item.component';
import { NavBarComponent } from './main-navigation/nav-bar/nav-bar.component';
import { NavLeftComponent } from './main-navigation/nav-bar/nav-left/nav-left.component';
import { NavSearchComponent } from './main-navigation/nav-bar/nav-left/nav-search/nav-search.component';
import { NavRightComponent } from './main-navigation/nav-bar/nav-right/nav-right.component';
import { ConfigurationComponent } from './main-navigation/configuration/configuration.component';

import { NavigationItem } from './main-navigation/navigation/navigation';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardComponent } from './dashboard/dashboard.component';

import { AuthenticationModule } from './authentication/authentication.module';
import { SharedModule } from './shared/shared.module';
import { LcttModule } from './report/loan-coming-to-term/lctt.module';
import { AquisitionCostModule } from './report/acquisition-cost/acquisition-cost.module';
import { DecisionVelocityModule } from './report/decision-velocity/decision-velocity.module';
import { TopFourCompetitorsModule } from './report/top-four-competitors/top-four-competitors.module';
import { ConclusionVelocityModule } from './report/conclusion-velocity/conclusion-velocity.module';

import { SupportContactComponent } from './support-contact/support-contact.component';


@NgModule({
  declarations: [
    AppComponent,
    MainNavigationComponent,
    NavigationComponent,
    NavContentComponent,
    NavGroupComponent,
    NavCollapseComponent,
    NavItemComponent,
    NavBarComponent,
    NavLeftComponent,
    NavSearchComponent,
    NavRightComponent,
    ConfigurationComponent,
    DashboardComponent,
    SupportContactComponent
  ],
  imports: [
    HighchartsChartModule,
    LcttModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    AuthenticationModule,
    AquisitionCostModule,
    DecisionVelocityModule,
    TopFourCompetitorsModule,
    ConclusionVelocityModule,
    NgbDropdownModule,
    NgbTooltipModule,
    NgbButtonsModule,
    NgbTabsetModule,
    BrowserAnimationsModule,
  ],
  providers: [NavigationItem],
  bootstrap: [AppComponent]
})
export class AppModule { }
