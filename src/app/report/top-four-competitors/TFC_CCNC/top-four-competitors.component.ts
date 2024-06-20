import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import {TopFourCompetitorsService} from './service/top-four-competitors.service'
import { regionsList, cities} from '../../../../enums/region-morocco';


export interface PeriodicElement {
    concurrents: string;
    position: number;
    nbreclients: number;
    tolnclients: string;
    nbrecontracts: number;
    tolncontracts: string;
    indiceclients: number;
    indicecontracts: number;
}
  

@Component({
  selector: 'app-top-four-competitors',
  templateUrl: './top-four-competitors.component.html',
  styleUrls: ['./top-four-competitors.component.scss']
})


export class TopFourCompetitorsComponent implements OnInit {
  ELEMENT_DATA: PeriodicElement[] = [];
  selectedNumber: string ='';
  Highcharts = Highcharts;
  regionForm = new FormControl(regionsList);
  cityForm = new FormControl();
  regionListForm: string[] = regionsList;
  optionsCities: string[] = cities;
  filteredOptions: Observable<string[]>;
  displayedColumns: string[] = ['position', 'concurrents', 'nbreclients', 'tolnclients', 'nbrecontracts', 'tolncontracts'];
  dataSource = new MatTableDataSource<PeriodicElement>(this.ELEMENT_DATA);
  private paginator: MatPaginator;
  private sort: MatSort;
  // @ViewChild(MatSort) set matSort(ms: MatSort) {
  //   this.sort = ms;
  //   this.setDataSourceAttributes();
  // }
  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    this.setDataSourceAttributes();
  }
  scoreForm = new FormControl(['Élite', 'Ultimate']);
  scoreList: string[] = ['Élite', 'Ultimate'];
  selectedDuration = '30Days';
  optionBar :any ={  
    chart: {
        shadow: true,
    },

    title: {
     text: 'Quatre Principaux Concurrents'
    },
    
    xAxis: {
     categories: [] 
    },
    yAxis: [{ 
        labels: {
            format: '{value}',
            style: {
                color: Highcharts.getOptions().colors[0]
            }
        },
        
        title: {
            text: 'Nbre des Clients',
            style: {
                color: Highcharts.getOptions().colors[0]
            }
        }
        }, 
        { // Secondary yAxis
          title: {
              text: 'Nbre de Contrats',
              style: {
                  color: Highcharts.getOptions().colors[1]
              }
        },
        labels: {
            format: '{value} ',
            style: {
                color: Highcharts.getOptions().colors[1]
            }
        },
        opposite: true
    }],
    credits: {
        enabled: false
    },
    exporting:{
        enabled: true,
    },
    series: [
    {
      type: 'column',
      name: 'Nombre des clients', 
      data: []
    }, 
    {
      type: 'column',
      name: 'Nombre de contrats',
      yAxis: 1,

      data: []
    }
  ]};
  loadingTableData:boolean=true;
 

  setDataSourceAttributes() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    if (this.paginator && this.sort) {
      this.applyFilter('');
    }
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  } 

  constructor(private service: TopFourCompetitorsService) { }


  ngOnInit(): void {
    HC_exporting(Highcharts);    
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.filteredOptions = this.cityForm.valueChanges
    .pipe(
      startWith(''),
      map(value => this._filter(value))
    );
    this.requestData();
  }

  async requestData () {
    this.loadingTableData = true;
    let duration = this.selectedDuration;
    let score = this.scoreForm.value;
    let city = this.cityForm.value;
    let region = this.regionForm.value;
    let dataToSend:any = {};

    dataToSend = {
      duration: duration,
      score: score, 
    }
    if(city !== null && city !== ""){
      dataToSend.city= city;
    }else{
      dataToSend.region = region;
    }
    let data:any = await this.service.getDataBar(dataToSend);
    this.optionBar.xAxis.categories = data.categories;
    this.optionBar.series[0].data = data.clients;
    this.optionBar.series[1].data = data.contracts;
    Highcharts.chart("container1", this.optionBar);
    this.requestDataTable(dataToSend);
  }

  async requestDataTable(params){
    let data:any = await this.service.getDataTable(params);
    console.log(data)
    this.ELEMENT_DATA = data;
    this.dataSource = new MatTableDataSource<PeriodicElement>(data);
    this.loadingTableData = false;
  }

  
  clearCity(){
    this.cityForm.setValue('');
    this.requestData();
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.optionsCities.filter(option => option.toLowerCase().includes(filterValue));
  }

  selectOptionFrench() {
    let val = this.selectedDuration == "7Days" ? "7jours" :
              this.selectedDuration == "30Days" ? "1 Mois" :
              this.selectedDuration == "2Months" ? "2 Mois" :
              this.selectedDuration == "3Months" ? "3 Mois" :
              this.selectedDuration ==  "6Months" ? "6 Mois" : "12 Mois";
    return val;
  }


  

}
