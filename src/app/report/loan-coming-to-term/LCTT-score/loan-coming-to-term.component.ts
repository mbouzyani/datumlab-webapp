import { Component, OnInit, Output, EventEmitter, ViewEncapsulation, Input } from '@angular/core';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ExportService } from '../lctt-service-export';
import * as $ from 'jquery';


import {MainColors} from '../../../../enums/main-colors';
import {LoanComingToTermService} from './services/loan-coming-to-term.service';
import { regionsList, cities} from '../../../../enums/region-morocco';

declare var require: any;
let Boost = require('highcharts/modules/boost');
let noData = require('highcharts/modules/no-data-to-display');
let More = require('highcharts/highcharts-more');

Boost(Highcharts);
noData(Highcharts);
More(Highcharts);

@Component({
  selector: 'app-loan-coming-to-term',
  templateUrl: './loan-coming-to-term.component.html',
  styleUrls: ['./loan-coming-to-term.component.scss'],
  encapsulation: ViewEncapsulation.None,
})


export class LoanComingToTermComponent implements OnInit {

  @Input() isSummarize: boolean = false;

  scoreForm = new FormControl(['Élite', 'Ultime']);
  monthForm = new FormControl(["1-2", "2-3", "3-4", "4-5", "5-6"]);
  regionForm = new FormControl(regionsList);
  capacityForm = new FormControl(["35", "35-45", "45"]);
  cityForm = new FormControl();
  scoreListForm: string[] = ['Élite', 'Ultime'];
  monthListForm: string[] = ["1-2", "2-3", "3-4", "4-5", "5-6"];
  capacityListForm: string[] = ["35", "35-45", "45"];
  regionListForm: string[] = regionsList;
  optionsCities: string[] = cities;
  filteredOptions: Observable<string[]>;
  Highcharts = Highcharts;
  public options: any = {

    chart: {
      renderTo: 'bar-chart',
      type: 'column',
      style: {
        fontFamily: 'serif'
      },
      // backgroundColor: '#FFFFFF',
      shadow: true,
    },
   
    tooltip: {
      formatter: function() {
        return '<b>'+this.y + '</b> clients <b>'+ 
        this.series.name+'</b> vont terminer leurs credits<br> dans les <b> ' + 
        this.x.charAt(1)+'</b> et <b>'+this.x.charAt(3) + '</b> mois prochains';
      }
    },
    title: {
      text: 'Crédits Arrivant à Échéance ',
      style: {
        "fontSize": "18px",
        "fill": "#333333",
        "fontFamily": "serif",
        "fontWeight": "400"
      }
    },
    colors: [MainColors.elite, MainColors.ultime],
    subtitle: {
        text: '1 --  > 6 mois'
    },
    legend: {
      align: 'center',
      verticalAlign: 'bottom',
      layout: 'horizontal',
      // floating: true  
    },
    xAxis: {
      categories: ['[1-2[', '[2-3[', '[3-4[', '[4-5[',  '[5-6]' ],
      labels: {
        x: 0,
        y: 20
      },
      title: {
        text: 'Interval du mois'
      }
    },
    yAxis: {
      allowDecimals: false,
      title: {
        text: 'Nombre des Clients'
      },
    },
    series: [
      {
        pointPadding: 0,
        groupPadding: 0.3,
        pointWidth: 45,
        name: 'Élite',
        id:"elite",
        events: {
          click: (event)=>{
            let month = event.point.category.substr(1).slice(0, -1);
            let score = "Elite";
            let params = {
              score:  score,
              month: month,
              capacity: this.capacityForm.value,
              city: this.cityForm.value,
              regions: this.regionForm.value
            };
            console.log(params)
            this.serviceExport.exportList(params);
          }
        }
      }, 
      {
        pointPadding: 0,
        groupPadding: 0.1,
        pointWidth: 45,
        name: 'Ultime',
        id:"ultime",
        events: {
          click: (event)=>{
            let month = event.point.category.substr(1).slice(0, -1);
            let score = "Ultime";
            let params = {
              score:  score,
              month: month,
              capacity: this.capacityForm.value,
              city: this.cityForm.value,
              regions: this.regionForm.value
            };
            console.log(params)
            this.serviceExport.exportList(params);
          }
        }
      }
    ],
    navigation: {
        buttonOptions: {
        }
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
    responsive: {
        rules: [{
          condition: {
            maxWidth: 500
          },
          chartOptions: {
            legend: {
              align: 'center',
              verticalAlign: 'bottom',
              layout: 'horizontal'
            },
            yAxis: {
              labels: {
                align: 'left',
                x: 0,
                y: -5
              },
              title: {
                text: null
              }
            },
            subtitle: {
              text: null
            }
          }
        }]
    }
  };
  public chart:any;
  public globalData:any;
  public dropdownList = [];
  public selectedItems = [];
  public dropdownSettings = {};

  isSummarizeTrue: Boolean =  false;


  constructor(private service: LoanComingToTermService, 
    private serviceExport: ExportService ) { 
    this.globalData = this.service.getGlobalDataOfLCTT();
    this.setNewDataToChart();
  }

  ngOnInit(): void {
    
    this.filteredOptions = this.cityForm.valueChanges
    .pipe(
      startWith(''),
      map(value => this._filter(value))
      );
      setTimeout(() => {
        this.draw('bar-chart', this.options);
      }, 200);
    
  }
 

  draw(id, options){
    options.chart.shadow = this.isSummarize ? false : true;
    options.chart.backgroundColor = this.isSummarize ? null : "white";
    options.exporting.enabled = this.isSummarize ? false : true;

    this.chart = Highcharts.chart(id, options);
  }


  hideScore(){
    let eliteIsVisible = this.scoreForm.value.includes("Élite");
    let ultimeIsVisible = this.scoreForm.value.includes("Ultime");
    this.chart.series[0].update({visible: eliteIsVisible});
    this.chart.series[1].update({visible: ultimeIsVisible});
  }

  hideMonth(){
    this.options.xAxis.categories = [];
    this.options.series[0].data=[];
    this.options.series[1].data=[];
    
    this.monthForm.value.forEach(e => {
      let globalDataElite = this.globalData.elite;
      let globalDataUltime = this.globalData.ultime;
      this.options.series[0].data.push(globalDataElite[e].nbrCustomers);
      this.options.series[1].data.push(globalDataUltime[e].nbrCustomers);
      let interval_month = e === "5-6" ? '[5-6]' : '['+e+'[';
      this.options.xAxis.categories.push(interval_month);

    });
    this.draw('bar-chart', this.options);
  }

  clearCity(){
    this.cityForm.setValue('');
    this.requestData();
  }
  
  setNewDataToChart(){
    let globalDataElite = this.globalData.elite;
    let globalDataUltime = this.globalData.ultime;
    this.options.series[0].data = [];
    this.options.series[1].data = [];
    this.monthForm.value.forEach(element => {
      console.log(element)
      this.options.series[0].data.push(globalDataElite[element].nbrCustomers)
      this.options.series[1].data.push(globalDataUltime[element].nbrCustomers)
    });
      // this.options.series[0].data = [
      //   globalDataElite["1-2"].nbrCustomers, 
      //   globalDataElite["2-3"].nbrCustomers, 
      //   globalDataElite["3-4"].nbrCustomers, 
      //   globalDataElite["4-5"].nbrCustomers, 
      //   globalDataElite["5-6"].nbrCustomers
      // ];
      // this.options.series[1].data = [
      //   globalDataUltime["1-2"].nbrCustomers, 
      //   globalDataUltime["2-3"].nbrCustomers, 
      //   globalDataUltime["3-4"].nbrCustomers, 
      //   globalDataUltime["4-5"].nbrCustomers, 
      //   globalDataUltime["5-6"].nbrCustomers
      // ];
      HC_exporting(Highcharts);

      
  }

  chartNoData(){
    this.chart.series[0].update({visible: false});
    this.chart.series[1].update({visible: false});

  }

  chartWithData(){
    let eliteIsVisible = this.scoreForm.value.includes("Élite");
    let ultimeIsVisible = this.scoreForm.value.includes("Ultime");
    this.chart.series[0].update({visible: eliteIsVisible});
    this.chart.series[1].update({visible: ultimeIsVisible});

  }

  async requestData(){
    let score = this.scoreForm.value;
    let month = this.monthForm.value;
    let capacity = this.capacityForm.value;
    let region = this.regionForm.value;
    let city = this.cityForm.value;

    if(score.length == 0 ||  month.length == 0 || capacity.length == 0 ){
      this.chartNoData();
    }else {      
      if(city !== null && city !== ""){

        let params = {
          city: city,
          score: score,
          month: month,
          capacity: capacity
        };
        console.log("getGlobalDataOfLCTTWithCity", params );
        this.globalData = this.service.getGlobalDataOfLCTTWithCity(params);
        await this.setNewDataToChart();
        this.draw('bar-chart', this.options);
        this.chartWithData();
      }else{
        if(region.length !== 0){
          let params = {
            regions: region,
            score: score,
            month: month,
            capacity: capacity
          };
          if(region.length == 12)  this.globalData = this.service.getGlobalDataOfLCTT();
          else this.globalData = this.service.getGlobalDataOfLCTTWithRegion(params);
          console.log('getGlobalDataOfLCTTWithRegion',  params );
          await this.setNewDataToChart();
          this.draw('bar-chart', this.options);
          this.chartWithData(); 
        }else{
          this.chartNoData();
        }
      }
      
    }
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.optionsCities.filter(option => option.toLowerCase().includes(filterValue));
  }

  exportList(){
    let params = {
      score:  this.scoreForm.value,
      month: this.monthForm.value,
      capacity: this.capacityForm.value,
      city: this.cityForm.value,
      regions: this.regionForm.value
    };
    this.serviceExport.exportList(params);
  }
  
}

