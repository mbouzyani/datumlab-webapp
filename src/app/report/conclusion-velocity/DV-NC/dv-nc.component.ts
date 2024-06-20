import { Component, OnInit, ViewChild, Input } from '@angular/core';
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

import {DvNcService} from './service/dv-nc.service';
import {ExportService} from '../dv-service-export';

declare var hs: any;
function exportList(){
    alert('hello');
    // var exp: ExportService;
    // exp.exportList('params');
}
declare var require: any;
let Boost = require('highcharts/modules/boost');
let noData = require('highcharts/modules/no-data-to-display');
let More = require('highcharts/highcharts-more');

Boost(Highcharts);
noData(Highcharts);
More(Highcharts);
HC_exporting(Highcharts)




@Component({
  selector: 'app-dv-nc',
  templateUrl: './dv-nc.component.html',
  styleUrls: ['./dv-nc.component.scss']
})
export class DVNCComponent implements OnInit {
    constructor(private service: DvNcService, private exportService: ExportService) { }

    @Input() isSummarize: boolean = false;

    selectedNumber: string ='';
    Highcharts = Highcharts;
    cityForm = new FormControl();
    scoreForm = new FormControl(['Élite', 'Ultime', 'Prime']);
    regionForm = new FormControl(regionsList);
    regionListForm: string[] = regionsList;
    optionsCities: string[] = cities;
    scoreList: string[] = ['Élite', 'Ultime', 'Prime'];
    selectedDuration = '1Month';
    selectedBank = 'CIH';
    selectedLoanType = 'immo';
    filteredOptions: Observable<string[]>;
    globeSettings:any={};
    optionOne:any = {}
    chart:any;


    ngOnInit(): void {
    this.optionOne = {
        chart: {
            shadow: true,  
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
                    //     headingText: 'Entre '+xVal.replace("-", " et ") +" jours ",
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
            text: 'Vélocité de Conclusion des Contrats',
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

        subtitle: {
            text: 'Autorisation et Livraison des Fonds'
        },

        xAxis: {
            categories: ['10-15', '15-20', '20-25', '25-30', '30-35', '35-40', '45-50', '55-60'],
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
                    color: '#4e4ef3',
                    from: -0.5,
                    to: 0.5
                },{
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
                style:{
                    color: 'black',
                },
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
                html: 'Autorisation et livraison des fonds',
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
                            console.log(e)
                            // hs?.htmlExpand(null, {
                            //     pageOrigin: {
                            //         x: e.pageX || e.clientX,
                            //         y: e.pageY || e.clientY
                            //     },
                            //     headingText: this.series.name,
                            //     maincontentText: this.y + ' clients'+' '+this.series.name+' dont leurs dossier pris entre '+e.point.category.replace("-", " et ") 
                            //     + ' jours de traitement pour une livraison finale des fonds. '
                            //     + 'Télécharger la liste des agences concérnées  ' 
                            //     + '<button id="test" type="button" onclick='+alert("call-backend-list-of-agencies")+'>Export</button>'
                            //     // + '<button id="test" type="button" onclick="alert("")">Export</button>'
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

        series: [
        {
            name: 'Élite',
            lineWidth: 4,
            marker: {
                radius: 4
            },
        }, {
            name: 'Ultime',
        }, {
            name: 'Prime',
        },
        {
            type: 'pie',
            name: 'Nbre Clients',
            data: [{
                name: 'Avec Livraison',
                // sliced: true,
                selected: true,
                color: "#2700d1"
            }, {
                name: 'Sans Livraison',
                color: "#f67b28"
            }
            ],
            center: [130, 80],
            size: 130,
            showInLegend: false,
            dataLabels: {
                enabled: false
            }
        }]
    }

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
    this.displayDataOne(dataToSend);

    

  }

 async displayDataOne(dataToSend){
    let data = await this.service.getData(dataToSend);
    console.log(data)
    this.optionOne.series[0].data=data.elite;
    this.optionOne.series[1].data=data.ultime;
    this.optionOne.series[2].data=data.prime;
    this.optionOne.series[3].data[0].y=data.pie.accepted;
    this.optionOne.series[3].data[0].x=data.pie.totale;
    this.optionOne.series[3].data[1].y=data.pie.rejected;
    this.optionOne.series[3].data[1].x=data.pie.totale;
    this.optionOne.title.text = 'Vélocité de Conclusion des Contrats '+ (dataToSend.city ? ' / '+dataToSend.city : "");
    this.optionOne.chart.shadow = this.isSummarize ? false : true;
    this.optionOne.chart.backgroundColor = this.isSummarize ? null : "white";
    this.optionOne.exporting.enabled = this.isSummarize ? false : true;

    this.chart = Highcharts.chart("container-dv-cc-nc-1", this.optionOne);
  }

  
  clearCity(){
    this.cityForm.setValue('');
    this.requestData();
  }

  hideScore(){

    let eliteIsVisible = this.scoreForm.value.includes("Élite");
    let ultimeIsVisible = this.scoreForm.value.includes("Ultime");
    let primeIsVisible = this.scoreForm.value.includes("Prime");
    console.log(eliteIsVisible, ultimeIsVisible)
    this.chart.series[0].update({visible: eliteIsVisible});
    this.chart.series[1].update({visible: ultimeIsVisible});
    this.chart.series[2].update({visible: primeIsVisible});
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.optionsCities.filter(option => option.toLowerCase().includes(filterValue));
  }

  initExportListAgency(){
    this.exportService.exportList(this.globeSettings);
    $("#export_agencies").addEventListener("click", () => console.log('hiiiiiiiiii'));
  }

  ngOnDestroy(){
    // if(hs?.expanders){

    //     for (var i = 0; i < hs?.expanders.length; i++) {
    //         var exp = hs?.expanders[i];
    //         if (exp) exp.close();
    //     }
    // }
  }

}
