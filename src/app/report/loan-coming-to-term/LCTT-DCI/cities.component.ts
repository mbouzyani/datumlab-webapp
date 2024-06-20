import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import HC_exporting from 'highcharts/modules/exporting';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import * as Highcharts from 'highcharts';
import * as $ from 'jquery';

import {LcttCitiesService} from './service/lctt-cities.service';
import {regionName} from '../../../../enums/region-morocco';
import { regions as region_cities, regionsList, regionID} from '../../../../enums/region-morocco';


HC_exporting(Highcharts)

@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.scss']
})



export class CitiesComponent implements OnInit {

  scoreForm = new FormControl(['Élite', 'Ultime']);
  monthForm = new FormControl(["1-2", "2-3", "3-4", "4-5", "5-6"]);
  capacityForm = new FormControl(["35", "35-45", "45"]);
  scoreListForm: string[] = ['Élite', 'Ultime'];
  monthListForm: string[] = ["1-2", "2-3", "3-4", "4-5", "5-6"];
  capacityListForm: string[] = ["35", "35-45", "45"];
  lastSelectedRegion:string="Casablanca-Settat";
  region_list:Array<string>=regionsList;
  region_cities:any=region_cities;
  chartOption : any = {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: 'pie',
      shadow: true
    },
    title: {
      text: this.lastSelectedRegion
    },
    tooltip: {
      pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b><br> Nbre de clienst: <b>{point.y}</b> '
    },
    accessibility: {
      point: {
        valueSuffix: '%'
      }
    },
    credits: {
      enabled: false
    },
    exporting: {
      enabled: true
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
            enabled: true,
            format: '<b>{point.name}</b><br>{point.percentage:.1f} %',
            distance: 40,
        }
      },
    },
    series: [{
      name: 'Nbre des clients',
      colorByPoint: true,
      data: []
    }]
  }


  constructor(private service: LcttCitiesService) { }

  ngOnInit() {
    setTimeout(() => {
      this.initBarElement();
    }, 50);
  }

  initBarElement(){
    this.region_list.forEach(region => {
      region === 'Casablanca-Settat' ? "":
      $('#'+region).slideToggle("slow");
      $('#'+region+'-scrolle').toggleClass("rotate");
    });
    this.requestData();
  }

  ActiveRegion(region){
    this.lastSelectedRegion = region;
    this.getNewSet(region);
    this.requestData();
  }
  
  getNewSet(type){
    $('#'+this.lastSelectedRegion).removeClass("selected");
    $('#'+type).removeClass("itm");
    $('#'+type).addClass("selected");
    this.lastSelectedRegion = type;
  }

  displayChart(filtredData){
    let cities = Object.keys(filtredData);
    let dataForChart=[];
    cities.forEach(city=>{
      let itm = {
        name: city,
        y: filtredData[city].nbrCustomers,
        color:  filtredData[city].color
      }
      dataForChart.push(itm);
    });
    
    this.chartOption.title.text = 'Distribution par ville sur la region '+( this.lastSelectedRegion == 'Oriental' ? "d'"+this.lastSelectedRegion : 'de '+this.lastSelectedRegion)
    this.chartOption.series[0].data = dataForChart;
    Highcharts.chart('city-container3',this.chartOption);
  }

  async requestData(){
    let score = this.scoreForm.value;
    let month = this.monthForm.value;
    let capacity = this.capacityForm.value;

    if(score.length == 0 ||  month.length == 0 || capacity.length == 0 ){
      this.chartNoData();
    }else {      
      let params = {
        score: score,
        month: month, 
        capacity: capacity,
        region: regionID[this.lastSelectedRegion]
      }
      let filtredData =  await this.service.getCitiesData(params);
      
      this.displayChart(filtredData);
    }
  }


  
  setNewDataToChart(){
      
  }

  chartNoData(){
    this.chartOption.series[0].data = [];
    Highcharts.chart('city-container3',this.chartOption);
    // this.displayChart();
  }


  chartWithData(){
    let eliteIsVisible = this.scoreForm.value.includes("Élite");
    let ultimeIsVisible = this.scoreForm.value.includes("Ultime");
  }


}
