import { Component, OnInit, ViewChild,Input} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import * as $ from 'jquery';

import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';
// import * as hs from 'highcharts/modules/accessibility';

import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { regionsList, cities} from '../../../../enums/region-morocco';

import { DvTcService } from './service/dv-tc.service';
import {ExportService} from '../dv-service-export';


declare var hs: any;
declare var require: any;
let Boost = require('highcharts/modules/boost');
let noData = require('highcharts/modules/no-data-to-display');
let More = require('highcharts/highcharts-more');

Boost(Highcharts);
noData(Highcharts);
More(Highcharts);
HC_exporting(Highcharts);


@Component({
  selector: 'app-dv-tc',
  templateUrl: './dv-tc.component.html',
  styleUrls: ['./dv-tc.component.scss']
})
export class DvTcComponent implements OnInit {
  @Input() isSummarize: boolean = false;

  selectedNumber: string ='';
  Highcharts = Highcharts;
  cityForm = new FormControl();
  scoreForm = new FormControl(['Elite', 'Ultimate', 'Prime']);
  regionForm = new FormControl(regionsList);
  regionListForm: string[] = regionsList;
  optionsCities: string[] = cities;
  scoreList: string[] = ['Elite', 'Ultimate', 'Prime'];
  selectedDuration = '1Month';
  selectedBank = 'CIH';
  filteredOptions: Observable<string[]>;
  categories: ['7-10', '10-13', '13-16', '16-19', '19-22', '22-25', '25-28', '28-31'];
  gradientColorRed=[ "#b6f6c8", "#fae1e1", "#fac8c8", "#fa9696", "#fa7d7d"  , "#fa6464", "#fa4b4b", "#fa3232"];
  globeSettings:any;
  optionSpiderChart :any = {
    chart: {
      shadow: true,
      polar: true,
    },
    title: {
      text: 'Vélocité de décision par type de crédit',
      x: -50,
      y: 3,
      style: {
        "fontSize": "18px",
        "fill": "#333333",
        "fontFamily": "serif",
        "fontWeight": "400",
        //     color: 'black',
        //     fontWeight: 'bold',
        //     fontSize: '16px'
    }
    },
    pane: {
      size: '90%'
    },
    xAxis: {
        max: 8.00001,
        min: 0,
        title: {
          // text: 'Interval des Jours'
        },
        categories: ['7-10', '10-13', '13-16', '16-19', '19-22', '22-25', '25-28', '28-31'],
        tickmarkPlacement: 'on',
        lineWidth: 0,
        labels: {
          align: 'left',
          x: -20,
          y: -10,
          useHTML: true,
         
          formatter: function () {
            console.log(this)
            let categories = ['7-10', '10-13', '13-16', '16-19', '19-22', '22-25', '25-28', '28-31'];
            let gradientColorRed=[ "#b6f6c8", "#fae1e1", "#fac8c8", "#fa9696", "#fa7d7d"  , "#fa6464", "#fa4b4b", "#fa3232"];

            let index = categories.indexOf(this.value)
            console.log(index);
            return '<span opacity="1" style="color: black;font-weight:bold;font-size:12px;padding:8px;border-radius:4px;opacity:1 !important;position:absolute;background-color:'
            +gradientColorRed[index]+';">' + this.value + '</span>';
          }
      },
    },
    yAxis: {
        gridLineInterpolation: 'polygon',
        lineWidth: 0,
        min: 0,
        title: {
        },
    },
    tooltip: {
      shared: true,
      pointFormat: '<br><span style="color:{series.color}">{series.name}: <b>{point.y:,.0f} Clients</b><br/>'
    },
    legend: {
      layout: 'vertical',
      align: 'right',
      verticalAlign: 'middle',
      itemMarginTop: 5,
      itemMarginBottom: 5
    },
    credits: {
      enabled: false
    },
    exporting:{
        enabled: true,
    },
    plotOptions: {     
      series: {
          cursor: 'pointer',
          point: {
              events: {
                  click: function (e) {
                      console.log(e)
                      // hs?.htmlExpand(null, {
                      //     pageOrigin: {
                      //         x: e.pageX || e.clientX,
                      //         y: e.pageY || e.clientY
                      //     },
                      //     headingText: this.series.name,
                      //     maincontentText: this.y + ' clients dont leurs dossier pris entre '+e.point.category.replace("-", " et ") 
                      //     + ' jours de traitement pour une autorisation finale. '
                      //     + 'Télécharger la liste des agences concérnées  ' 
                      //     + '<button id="test" type="button" onclick=alert("call-backend-list-of-agencies")>Export</button>'
                      //     ,
                      //     // src: 'https://siftlia.com/',
                      //     // objectType: 'iframe',
                      //     width: 200,
                      //     // wrapperClassName: 'draggable-header'
                      // });
                  }
              }
          },
          
          marker: {
              lineWidth: 1
          }
      }
    },
    series: [{
        name: 'Immobiliers',
        color: "#7cb5ec",
        pointPlacement: 'on',
        type: 'area',
    }, {
        name: 'Consommation',
        color: "#f15c80",
        type: 'area',
        pointPlacement: 'on',
    }, {
        name: 'Automobile',
        color: '#434348',
        type: 'area',
        pointPlacement: 'on',
    }, {
        name: 'Prêt à l’habitat',
        color: '#f7a35c',
        type: 'area',
        pointPlacement: 'on',
    }],
    responsive: {
        rules: [{
            condition: {
                maxWidth: 320
            },
            chartOptions: {
                legend: {
                    align: 'center',
                    verticalAlign: 'bottom',
                    layout: 'horizontal'
                },
                pane: {
                    size: '70%'
                }
            }
        }]
    }
  }

  constructor(private service: DvTcService, private exportService: ExportService) { }

  ngOnInit(): void {
 
    this.requestData();
    
    this.filteredOptions = this.cityForm.valueChanges
    .pipe(
        startWith(''),
        map(value => this._filter(value))
    );
  }

  requestData(){
    let bank = this.selectedBank;
    let duration = this.selectedDuration;
    let score = this.scoreForm.value;
    let city = this.cityForm.value;
    let region = this.regionForm.value;
    let dataToSend:any = {};

    dataToSend = {
        bank: bank,
        duration: duration,
        score: score, 
    }
    if(city !== null && city !== ""){
      dataToSend.city= city;
    }else{
      dataToSend.region = region;
    }
    this.globeSettings = dataToSend;
    this.displayDataOne(dataToSend);
  }

  async displayDataOne(dataToSend){
    let data = await this.service.getData(dataToSend);
    this.optionSpiderChart.series[0].data = data.immo;
    this.optionSpiderChart.series[1].data = data.conso;
    this.optionSpiderChart.series[2].data = data.auto;
    this.optionSpiderChart.series[3].data = data.habitat;
    this.optionSpiderChart.title.text = " Vélocité de décision par type de crédit "+ (dataToSend.city ? '/ '+dataToSend.city : "");

    this.optionSpiderChart.chart.shadow = this.isSummarize ? false : true;
    this.optionSpiderChart.chart.backgroundColor = this.isSummarize ? null : "white";
    this.optionSpiderChart.exporting.enabled = this.isSummarize ? false : true;

    if(this.isSummarize){
      this.optionSpiderChart.legend={
          align: 'center',
          verticalAlign: 'bottom',
          borderWidth: 0
      }
      this.optionSpiderChart.title.x = 0;
    }
    Highcharts.chart("container-dv-tc-1", this.optionSpiderChart);

  }

 
  
  clearCity(){
    this.cityForm.setValue('');
    this.requestData();
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.optionsCities.filter(option => option.toLowerCase().includes(filterValue));
  }

  initExportListAgency(){
    this.exportService.exportList(this.globeSettings);
    // $("#export_agencies").addEventListener("click", () => console.log('hiiiiiiiiii'));
  }

  ngOnDestroy(){
  
  }

}
