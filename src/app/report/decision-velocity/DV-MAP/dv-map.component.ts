import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import * as Highcharts from 'highcharts';
import * as $ from 'jquery';

import HC_exporting from 'highcharts/modules/exporting';

import { DvMapService } from '../DV-MAP/service/dv-map.service'
import {ExportService} from '../dv-service-export';

import { regionsList, cities, regionName} from '../../../../enums/region-morocco';

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
  selector: 'app-dv-map',
  templateUrl: './dv-map.component.html',
  styleUrls: ['./dv-map.component.scss']
})
export class DvMapComponent implements OnInit {

  loanTypeForm = new FormControl(['Immobilières', 'Consommation', 'Automobile']);
  loanTypeListForm: string[] = ['Immobilières', 'Consommation', 'Automobile'];
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
  selectedLoanType = 'immo';
  globeSettings:any={};

  mapSize:any={
    width: '100%',
    height: '100%'
  };
  dataMap:any={};
  dataRegionMap:any={};
  key_map_colors:Array<any>=[];
  key_map_nbrCustomers:Array<any>=[];
  public chartOptions:any =  {
    chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
    },
    title: {
        text: ''
    },
    tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    credits: {
      enabled: false
    },
    accessibility: {
        point: {
            valueSuffix: '%'
        }
    },
    plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
                enabled: false
            },
            showInLegend: true
        }
    },
    legend: {
      layout: 'vertical',
      align: 'right',
      verticalAlign: 'top',
      x: 10,
      y: 100,
      floating: false,
      // shadow: true
    },
    series: [{
      colorByPoint: true,
      data: []
    }]
  }
  colorGradient:string='#4680ff';
  regionSelected:string='CS';
  gradientColorRed=[ "#b6f6c8", "#fae1e1", "#fac8c8", "#fa9696", "#fa7d7d"  , "#fa6464", "#fa4b4b", "#fa3232"];
 
  optionChartDetails:any={
    chart: {
      events: {
        click: function(e) {
            // alert ('x: '+ event.xAxis[0].value +', y: '+
            //       event.yAxis[0].value);
          console.log('x: '+ e.xAxis[0].value);
          let x = e.xAxis[0].value;
          let xVal= x<=1 ? '7-10' : 
                    x>1 && x<=2 ? '10-13' :
                    x>2 && x<=3 ? '13-16' :
                    x>3 && x<=4 ? '16-19' :
                    x>4 && x<=5 ? '19-22' :
                    x>5 && x<=6 ? '22-25' :
                    x>6 && x<=7 ? '25-28' :
                    x>28 && x<=31 ? "28-31": '28-31'; 
          // hs?.htmlExpand(null, {
          //     pageOrigin: {
          //         x: e.pageX || e.clientX,
          //         y: e.pageY || e.clientY
          //     },
          //     headingText: 'Entre '+xVal.replace("-", " et ") +" jours  ",
          //     maincontentText: 'Télécharger la liste des agences concérnées.' 
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
    
    title: {
      text: 'Vélocité de Décision',
      style: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: '16px'
      }
    },
    xAxis: {
      categories: ['7-10', '10-13', '13-16', '16-19', '19-22', '22-25', '25-28', '28-31'],
      // tickInterval: 7 * 24 * 3600 * 1000, // one week
      tickWidth: 0,
      gridLineWidth: 1,
      title: {
        text: 'Interval de jours'
      },
      labels: {
        align: 'left',
        x: 3,
        y: -3,
        style: {
            color: 'black'
        }
      },
      plotBands: [
          {
          color: '#8ed696',
          from: -0.5,
          to: 0.5
          },
          {
          color: '#fae1e1',
          from: 0.5,
          to: 1.5
          },{
          color: '#fac8c8',
          from: 1.5,
          to: 2.5
          },{
          color: '#faafaf',
          from: 2.5,
          to: 3.5
          }, {
          color: '#fa9696',
          from: 2.5,
          to: 3.5
        }, {
          color: '#fa7d7d',
          from: 3.5,
          to: 4.5
        }, {
          color: '#fa6464',
          from: 4.5,
          to: 5.5
        }, {
          color: '#fa4b4b',
          from: 5.5,
          to: 6.5
        }, {
          color: '#fa3232',
          from: 6.5,
          to: 7.5
      }]
    },

    yAxis: [{ // left y axis
        title: {
          text: 'Nbre des Clients'
        },
        labels: {
          align: 'left',
          x: 3,
          y: 16,
          format: '{value:.,0f}'
        },
        showFirstLabel: false,
        max: 900
    },
    ],

    labels: {
      items: [{
        html: 'Total demande et autorisation',
        style: {
          left: '70px',
          top: '9px',
          color: ( // theme
            Highcharts.defaultOptions.title.style &&
            Highcharts.defaultOptions.title.style.color
          ) || 'black'
        }
      }]
    },

    legend: {
        align: 'right',
        verticalAlign: 'top',
        borderWidth: 0
    },

    credits: {
        enabled: false
    },

    exporting:{
        enabled: true,
    },

    tooltip: {
        shared: true,
        crosshairs: true
    },

    plotOptions: { 
      series: {
        cursor: 'pointer',
        point: {
          events: {
            click: function (e) {
              // hs?.htmlExpand(null, {
              //   pageOrigin: {
              //     x: e.pageX || e.clientX,
              //     y: e.pageY || e.clientY
              //   },
              //   headingText: this.series.name,
              //   maincontentText: this.y + ' clients'+' '+this.series.name+' dont leurs dossier pris entre '+e.point.category.replace("-", " et ") 
              //   + ' jours de traitement pour une autorisation finale. '
              //   + 'Télécharger la liste des agences concérnées  ' 
              //   + '<button id="test" type="button" onclick=alert("call-backend-list-of-agencies")>Export</button>'
              //   ,
              //   // src: 'https://siftlia.com/',
              //   // objectType: 'iframe',
              //   width: 200,
              //   // wrapperClassName: 'draggable-header'
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
      name: 'Élite',
      lineWidth: 4,
      marker: {
        radius: 4
      },
      data:[145, 245, 145, 454, 545, 255, 255, 155]
      }, {
          name: 'Ultime',
          data:[120, 245, 145, 354, 445, 155, 255, 122]
      }, {
          name: 'Prime',
          data:[110, 225, 125, 334, 425, 255, 222, 111]
      },
      {
        type: 'pie',
        name: 'Nbre Clients',
        data: [{
            name: 'Acceptées',
            y: 6000,
            w: 9200,
            // sliced: true,
            selected: true,
            color: "#2700d1"
        }, {
            name: 'Rejetées',
            y: 3200,
            w: 9200,
            color: "#f67b28"
        }
        ],
        center: [130, 40],
        size: 60,
        showInLegend: false,
        dataLabels: {
            enabled: false
        }
      }
    ]
}

  constructor(private service : DvMapService, private exportService: ExportService) { 
  }

  ngOnInit(): void {
    
    this.requestData();

    var $tooltip = $('.tooltipMap');

    // hover on path && name region 
    $(function() {
      setTimeout(() => {
       
      $('path.path-map').hover(function(event){
        $tooltip.hide();
          var name = $(this).attr('title');
          let id = $(this).attr('id');
          var value = $(this).attr('value');
          var agency = $(this).attr('agency');
          var vd =  $(this).attr('vd');

          $("#vd-val").text('Vélocité de décision moyenne : '+ vd.replace('-', ' et ')+ ' jours');
          $(".tooltipMap .region").text(name);
          $("#loan .val").text(value);
          $("#contract .title").text('Agence: ');
          $("#contract .val").text(agency);
          let position = $("#"+id+"-label").offset();
          $tooltip.css({position: "absolute", "top": position.top-220 + "px", "left": position.left-340 + "px"}).show();
          $("#name-"+id).addClass("selected");
        }, function(){
          let id = $(this).attr('id');
          $("#name-"+id).removeClass("selected");
          $("#morocco-map").hover(function(event){}, function(){
              $tooltip.hide();
            }); 
        }, 500);
      });
      setTimeout(() => {
        $('.label_icon_state').hover(function(event){
        $tooltip.hide();
        var name = $(this).attr('title');
        let id = $(this).attr('id');
        var value = $(this).attr('value');
        var agency = $(this).attr('agency');
        var vd =  $(this).attr('vd');

        $("#vd-val").text('Vélocité de décision moyenne : '+ vd.replace('-', ' et ')+ ' jours');
        $(".tooltipMap .region").text(name);
        $("#loan .val").text(value);
        $("#contract .title").text('Agence: ');
        $("#contract .val").text(agency);
          $tooltip.css({position: "absolute", "top": event.pageY-210 + "px", "left": event.pageX-340 + "px"}).show();
        }, function(){
          $("#morocco-map").hover(function(event){}, function(){
            $tooltip.hide();
          });
        });
      }, 500);
    });

    // hover on circle region
    $(function() {
      $('circle').hover(function(event){ 
        let id =$(this).attr('region');
        let id_string = "#"+id;
        var name = $(id_string).attr('title');
        var value = $(id_string).attr('value');
        var agency = $(id_string).attr('agency');
        var vd =  $(this).attr('vd');

        $("#vd-val").text('Vélocité de décision moyenne : '+ vd.replace('-', ' et ')+ ' jours');
        $(".tooltipMap .region").text(name);
        $("#loan .val").text(value);
        $("#contract .title").text('Agence: ');
        $("#contract .val").text(agency);
        let position = $("#"+id+"-label").offset();
        $tooltip.css({position: "absolute", "top": position.top-210 + "px", "left": position.left-340 + "px"}).show();
      }, function(){
        $tooltip.hide();
      });
    });

    // hover on list code region
    $(function() {
      $('.id-name-container').hover(function(event){ 
        let id = $($(this)[0].firstElementChild).text();
        let id_string = "#"+id;
        var name = $(id_string).attr('title');
        var value = $(id_string).attr('value');
        var agency = $(id_string).attr('agency');
        var vd =  $(id_string).attr('vd');

        $("#vd-val").text('Vélocité de décision moyenne : '+ vd.replace('-', ' et ')+ ' jours');
        $(".tooltipMap .region").text(name);
        $("#loan .val").text(value);
        $("#contract .title").text('Agence: ');
        $("#contract .val").text(agency);
        let position = $("#"+id+"-label").offset();
        $tooltip.css({position: "absolute", "top": position.top-165 + "px", "left": position.left-353 + "px"}).show();
      }, function(){
        $tooltip.hide();
      });
    });

  }

  newTypeSelected(){
    
    this.requestData();

  }

  keyMapData(data){
    let dataMap = data;
    this.key_map_colors =  this.chartOptions.plotOptions.pie.colors;
  }

  clearCity(){
    this.cityForm.setValue('');
    this.requestData();
  }

  async requestData(){
  
    let bank = this.selectedBank;
    let duration = this.selectedDuration;
    let score = this.scoreForm.value;
    let loanType = this.selectedLoanType;
    let city = this.cityForm.value;
    let region = this.regionForm.value;
    let dataToSend:any = {};

    dataToSend = {
        bank: bank,
        duration: duration,
        score: score, 
        loanType: loanType
    }
    if(city !== null && city !== ""){
      dataToSend.city= city;
    }else{
      dataToSend.region = region;
    }
    this.globeSettings = dataToSend;
    this.displayDataOneMap(dataToSend);

    this.showDetails(this.regionSelected);
  }
  
  async displayDataOneMap(dataToSend) {

    this.dataRegionMap = await this.service.getData(dataToSend);

  }
      
  async showDetails(region){
    console.log(region)
    let bank = this.selectedBank;
    this.regionSelected = region;
    let score = this.scoreForm.value;
    let loanType = this.loanTypeForm.value;
    let duration = this.selectedDuration;
    let dataToSend:any = {
        bank: bank,
        duration: duration,
        score: score, 
        loanType: loanType,
        region: region
    };
    let data = await this.service.getDetailsRegion(dataToSend);
    this.optionChartDetails.series[0].data=data.elite;
    this.optionChartDetails.series[1].data=data.ultime;
    this.optionChartDetails.series[2].data=data.prime;
    this.optionChartDetails.series[3].data[0].y=data.pie.accepted;
    this.optionChartDetails.series[3].data[0].x=data.pie.totale;
    this.optionChartDetails.series[3].data[1].y=data.pie.rejected;
    this.optionChartDetails.series[3].data[1].x=data.pie.totale;
    let title:string='';
    this.optionChartDetails.title.text='Vélocité de Décision région '+regionName[region];
    Highcharts.chart('id-pie-chart', this.optionChartDetails);

  
  }

  

  returnCorrectTitleHoverMap(){
    
    return 'Nbre des clients';
  }

  returnCorrectTitlePie(){
   
  }

  pieNoData(){
    // this.chartOptions.title.text = '';
    // this.chartOptions.series[0].name = '';
    this.chartOptions.series[0].data = [];
    Highcharts.chart('id-pie-chart', this.chartOptions);

  }

  
  initExportListAgency(){
    this.exportService.exportList(this.globeSettings);
    // $("#export_agencies").addEventListener("click", () => console.log('hiiiiiiiiii'));
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.optionsCities.filter(option => option.toLowerCase().includes(filterValue));
  }

}
