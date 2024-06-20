import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import * as Highcharts from 'highcharts';
import * as $ from 'jquery'

import { FormControl } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';

import {MainColors} from '../../../../enums/main-colors';

declare var require: any;
let Boost = require('highcharts/modules/boost');
let noData = require('highcharts/modules/no-data-to-display');
let More = require('highcharts/highcharts-more');


import { regionsList, cities} from '../../../../enums/region-morocco';
import {FinancingCapacityService} from './service/financing-capacity.service';


@Component({
  selector: 'app-financing-capacity',
  templateUrl: './financing-capacity.component.html',
  styleUrls: ['./financing-capacity.component.scss']
})
export class FinancingCapacityComponent implements OnInit {

  @Output() fireEventGoToNextStep = new EventEmitter();
  scoreForm = new FormControl(['Élite', 'Ultime']);
  monthForm = new FormControl(["1-2", "2-3", "3-4", "4-5", "5-6"]);
  cityForm = new FormControl();
  scoreListForm: string[] = ['Élite', 'Ultime'];
  monthListForm: string[] = ["1-2", "2-3", "3-4", "4-5", "5-6"];
  optionsCities: string[] = cities;
  filteredOptions: Observable<string[]>;
  isCity: boolean = false;

  public chart:any;
  public globalData:any;
  public options: any = {

    chart: {
      type: 'bar',
      shadow: true,
      style: {
        fontFamily: 'serif'
      },
      // backgroundColor: '#FFFFFF',
      // shadow: true,
    },
    credits: {
      enabled: false
    },
    exporting: {
      enabled: true,
      buttons: {
        contextButton:{
          menuItems: ["printChart", "separator", "downloadPNG", "downloadJPEG", "downloadPDF", "downloadSVG", 
        
          'separator',
          'downloadCSV',
          'downloadXLS',]
        },
        // 'customButton': {
        //   onclick: function() {
        //       alert('Hello!');
        //   },
        //   text: 'Hello'
        // },
        
      }
    },
    tooltip: {
      // backgroundColor: '#FCFFC5',
      // borderColor: 'black',
      // borderRadius: 10,
      // borderWidth: 3,
      formatter: function() {
        return '<b>'+this.y + '</b> clients <b>'+ 
        this.series.name+'</b> vont terminer leurs credits<br>'
      }
    },
    title: {
      text: 'Capacité de Finacement '
    },
    colors: [MainColors.elite, MainColors.ultime],
    subtitle: {
        // text: ''
    },

    legend: {
      // reversed: true,
      // align: 'center',
      // verticalAlign: 'bottom',
      // layout: 'horizontal',
      // floating: true  
    },
    xAxis: {
      categories: ["]45,x[", "[35-45]", "]x,35["],
      labels: {
        x: 0,
        y: 20
      },
      title: {
        text: 'Capacité de financement'
      }
    },
    
    yAxis: {
      allowDecimals: false,
      title: {
        text: 'Nombre des Clients'
      }
    },
    
    series: [
      {
        showInLegend: false,             
        pointPadding: 0,
        groupPadding: 0.3,
        pointWidth: 45,
        name: '',
        events: {
          click: (event)=>{
            // let month = event.point.category.substr(1).slice(0, -1);
            // this.goToNextStep();
          }
        }
      }
    ],
    navigation: {
        buttonOptions: {
            enabled: false
        }
    },
  }
  
  public options_bar: any = {
    chart: {
      type: 'bar',
      shadow: true,
    },
    title: {
      text: 'Capacité de finacement'
    },
    credits: {
      enabled: false
    },
    xAxis: {
      categories: ["]45,x[", "[35-45]", "]x,35["]
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Nombre des Clients'
        }
    },
    legend: {
        reversed: true
    },
    plotOptions: {
        series: {
            stacking: 'normal'
        }
    }
  }


  constructor(private service: FinancingCapacityService ) { 
    
  }

  ngOnInit(): void {
    this.requestData();
    this.filteredOptions = this.cityForm.valueChanges
    .pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }
  
  draw(id, options){
    this.chart = Highcharts.chart(id, options);
  }


  displayData(data){
    this.options_bar.title.text = 'Capacité de Finacement';
    this.options_bar.series = data;
    this.draw('bar-chart', this.options_bar);  
  }

  displayDataCity(data){

    this.options.series[0].data = [
      this.globalData["45"].nbrCustomers, 
      this.globalData["35-45"].nbrCustomers, 
      this.globalData["35"].nbrCustomers, 
    ];
    this.options.title.text = 'Capacité de Finacement '+this.cityForm.value;
    this.draw('bar-chart', this.options);
  }

  
  clearCity(){
    this.cityForm.setValue('');
    this.draw('bar-chart', this.options_bar);
    this.requestData();
  }

  async requestData(){
    let score = this.scoreForm.value;
    let month = this.monthForm.value;
    let city = this.cityForm.value;

    if(score.length == 0 ||  month.length == 0 ){
      this.chartNoData();
    }else {      
      let params:any = {  
        score: score,
        month: month, 
      }
      if(city !== null && city !== ""){
        params.city=city
        this.globalData = this.service.getDataOfCity(params);
        this.displayDataCity(this.globalData )
        console.log(this.globalData)
    
      }else{
        let data = this.service.getGlobalDataOfFC(params);
        console.log(data)
        this.displayData(data);
      }
      
    }
  }
  
  setNewDataToChart(){

      
  }

  chartNoData(){
    this.options.series[0].data = [];
    this.draw('bar-chart', this.options);
    this.options_bar.series = [];
    this.draw('bar-chart', this.options_bar);  
  }
  chartWithData(){

  }


  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.optionsCities.filter(option => option.toLowerCase().includes(filterValue));
  }

}
