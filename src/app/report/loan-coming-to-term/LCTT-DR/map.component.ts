import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import * as Highcharts from 'highcharts';
import * as $ from 'jquery';


import {LcttMapService} from './services/lctt-map.service';
import { ExportService } from '../lctt-service-export';
import { regionsList, cities} from '../../../../enums/region-morocco';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
  
})
export class MapComponent implements OnInit {
  @Input() isSummarize: boolean = false;

  scoreForm = new FormControl(['Élite', 'Ultime']);
  monthForm = new FormControl(["1-2", "2-3", "3-4", "4-5", "5-6"]);
  capacityForm = new FormControl(["35", "35-45", "45"]);
  scoreListForm: string[] = ['Élite', 'Ultime'];
  monthListForm: string[] = ["1-2", "2-3", "3-4", "4-5", "5-6"];
  capacityListForm: string[] = ["35", "35-45", "45"];
  optionsCities: string[] = cities;
  mapSize:any={
    width: '100%',
    height: '100%'
  };
  dataMap:any={};
  key_map_nbrCustomers:any={};
  regions:Array<string>=['LSEH', 'DOED', 'SM', 'GON', 'CS', 'DT', 'BMK', 'MS', 'TTALH', 'RSK', 'FM', 'OR'];
   // Make monochrome colors
  key_map_colors = [
    "rgb(148,206,255)",
    "rgb(128,186,255)", 
    "rgb(109,167,255)", 
    "rgb(89,147,255)", 
    "rgb(70,128,255)", 
    "rgb(51,109,236)", 
    "rgb(31,89,216)", 
    "rgb(12,70,197)", 
    "rgb(0,50,177)", 
    "rgb(0,30,157)", 
    "rgb(0,11,138)", 
    "rgb(0,0,118)", 
  ]
  public chartOptions:any = {
    chart: {
      plotShadow: false,
      type: 'pie',
    },
    title: {
      text: '',
      style: {
        "fontSize": "18px",
        "fill": "#333333",
        "fontFamily": "serif",
        "fontWeight": "400"
      }
    },
    tooltip: {
      pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
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
      enabled: false
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: true,
          format: '<b>{point.name}</b><br>{point.percentage:.1f} %',
          distance: 20,
        }
      },
    },
    series: [{
      minPointSize: 10,
      innerSize: '40%',
      zMin: 0,
      name: 'Nbre Clients',
      data: []
    }]
  }


  constructor(private service : LcttMapService,
              private serviceExport: ExportService) { }

  ngOnInit(): void {
    var $tooltip = $('.tooltipMap');

    // path && name region hover
    $(function() {
      setTimeout(() => {
        $('.label_icon_state').hover(function(event){
        $tooltip.hide();
        
        let id = $(this).text();
        console.log(id)

        let id_string = "#"+id;
        var name = $(id_string).attr('title');
        var nbrClient = $(id_string).attr('nbrClient');
        var nbrCredit = $(id_string).attr('nbrCredit');
        $(".tooltipMap .region").text(name);
        $("#loan .title").text('Nbre des clients: ');
        $("#loan .val").text(nbrClient);
        $("#contract .title").text('Nbre de contrats: ');
        $("#contract .val").text(nbrCredit);
        $("#totRemaining .title").text('Montant restant: ');
        $tooltip.css({position: "absolute", "top": event.clientY-170 + "px", "left": event.clientX-340   + "px"}).show();
      }, function(){
          $("#morocco-map").hover(function(event){}, function(){
            $tooltip.hide();
          });
        });
      }, 500);
      
      setTimeout(() => {
      $('path.path-map').hover(function(event){
        $tooltip.hide();
          var t = this.getBoundingClientRect().top,
          l = this.getBoundingClientRect().left;
          var name = $(this).attr('title');
          let id = $(this).attr('id');
          var nbrClient = $(this).attr('nbrClient');
          var nbrCredit = $(this).attr('nbrCredit');
          $(".tooltipMap .region").text(name);
          $("#loan .title").text('Nbre des clients: ');
          $("#loan .val").text(nbrClient);
          $("#contract .title").text('Nbre de contrats: ');
          $("#contract .val").text(nbrCredit);
          $("#totRemaining .title").text('Montant restant: ');
          $tooltip.css({position: "absolute", "top": event.clientY-170 + "px", "left": event.clientX-340   + "px"}).show();
          $("#name-"+id).addClass("selected");
        }, function(){
          let id = $(this).attr('id');
          $("#name-"+id).removeClass("selected");
          $("#morocco-map").hover(function(event){}, function(){
              $tooltip.hide();
            });
        }, 500);
      });
    });

    // code region hover
    $(function() {
      $('.id-name-container').hover(function(event){ 
        let id = $($(this)[0].firstElementChild).text();
        console.log(id)

        let id_string = "#"+id;
        var name = $(id_string).attr('title');
        var nbrClient = $(id_string).attr('nbrClient');
        var nbrCredit = $(id_string).attr('nbrCredit');
        $(".tooltipMap .region").text(name);
        $("#loan .title").text('Nbre des clients: ');
        $("#loan .val").text(nbrClient);
        $("#contract .title").text('Nbre de contrats: ');
        $("#contract .val").text(nbrCredit);
        $("#totRemaining .title").text('Montant restant: ');
        let position = $("#"+id+"-label").offset();
        $tooltip.css({position: "absolute", "top": position.top-170 + "px", "left": position.left-340 + "px"}).show();
      }, function(){
        $tooltip.hide();
      });
    });
    this.requestData();
  }

  async requestData(){
    // this.mapNoData();
    let score = this.scoreForm.value;
    let month = this.monthForm.value;
    let capacity = this.capacityForm.value;

    if(score.length == 0 ||  month.length == 0 || capacity.length == 0 ){
      this.mapNoData();
      this.chartNoData();
    }else {  
      let params = {
        score: score,
        month: month,
        capacity: capacity,
      };
      this.dataMap = await this.service.reqData(params);
      this.displayData(this.dataMap);
    }
  }

  displayData(dataServer){

    ///Keymap max min value
    this.keyMapData(dataServer);
   
    // pie data 
    let keyRegion = Object.keys(dataServer);
    let dataToDisplayPie=[];
    keyRegion.forEach(region => {
      let itm = {
        name: region,
        y: dataServer[region].nbrCustomers,
        color: dataServer[region].color
      };
      dataToDisplayPie.push(itm);
    });

    this.chartOptions.series[0].data = dataToDisplayPie;
    // this.chartOptions.chart.shadow = this.isSummarize ? false : true;
    this.chartOptions.chart.backgroundColor = this.isSummarize ? null : "white";
    this.chartOptions.exporting.enabled = this.isSummarize ? false : true;

    Highcharts.chart('id-pie-chart', this.chartOptions);
    
  }

  keyMapData(data){
    let maxValue = data[Object.keys(data)[Object.keys(data).length - 1]];
    let minValue = data[Object.keys(data)[0]];
    this.key_map_nbrCustomers = {maxValue: maxValue.nbrCustomers, minValue: minValue.nbrCustomers};
  }

  mapNoData(){
    Object.keys(this.dataMap).forEach(reg=>{
      this.dataMap[reg].color = '#e8eaed';
    });
  }

  chartNoData(){
    this.chartOptions.series[0].data = [];
    Highcharts.chart('id-pie-chart', this.chartOptions);
  }


  showDetails(strg){
    console.log(strg)
  }

  exportList(){
    let params = {
      score:  this.scoreForm.value,
      month: this.monthForm.value,
      capacity: this.capacityForm.value,
    };
    this.serviceExport.exportList(params);
  }

}
