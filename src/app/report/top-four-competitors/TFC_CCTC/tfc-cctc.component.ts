import { Component, OnInit, ViewChild, Input } from '@angular/core';
import HC_exporting from 'highcharts/modules/exporting';
import * as Highcharts from 'highcharts';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import * as $ from 'jquery';

import { TfcCctcService } from './service/tfc-cctc.service'
import { regionsList, cities} from '../../../../enums/region-morocco';
declare var require: any;
let Boost = require('highcharts/modules/boost');
let noData = require('highcharts/modules/no-data-to-display');
let More = require('highcharts/highcharts-more');
var hs;
Boost(Highcharts);
noData(Highcharts);
More(Highcharts);
HC_exporting(Highcharts)


export interface PeriodicElement {
    concurrents: string;
    position: number;
    nbreContratImmo: number;
    varImmo: string;
    nbreContratConso: number;
    varConso: string;
    nbreContratAuto: number;
    varAuto: string;
    indiceImmo: number;
    indiceConso: number;
    indiceAuto: number;
}

@Component({
  selector: 'app-tfc-cctc',
  templateUrl: './tfc-cctc.component.html',
  styleUrls: ['./tfc-cctc.component.scss']
})


export class TFCCCTCComponent implements OnInit {
    @Input() isSummarize: boolean = false;

    private paginator: MatPaginator;
    private sort: MatSort;
    // @ViewChild(MatSort) set matSort(ms: MatSort) {
    //     this.sort = ms;
    //     this.setDataSourceAttributes();
    // }
    @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
        this.paginator = mp;
        this.setDataSourceAttributes();
    }
    Highcharts = Highcharts;
    regionForm = new FormControl(regionsList);
    cityForm = new FormControl();
    regionListForm: string[] = regionsList;
    optionsCities: string[] = cities;
    filteredOptions: Observable<string[]>;
    displayedColumns: string[] = ['position', 'concurrents', 'nbreContratImmo', 'varImmo', 'nbreContratConso', 'varConso', 'nbreContratAuto', 'varAuto'];
    ELEMENT_DATA: PeriodicElement[] = [];
    dataSource = new MatTableDataSource<PeriodicElement>(this.ELEMENT_DATA);
    scoreForm = new FormControl(['Élite', 'Ultimate']);
    scoreList: string[] = ['Élite', 'Ultimate'];
    concurrentList: string[] = [];
    selectedDuration = '1Month';
    selectedBank = '';
    loadingTableData:boolean=false;
    optionSpiderChart :any ={
        chart: {
          shadow: true,
          polar: true,
          type: 'line'
        },
        title: {
            text: 'Analyse de la Concurrence par type des crédits',
            x: -50,
            style: {
                "fontSize": "18px",
                "fill": "#333333",
                "fontFamily": "serif",
                "fontWeight": "400"
              }
        },
        pane: {
            size: '80%'
        },
        xAxis: {
            categories: ['CIH', 'Attijariwafa Bank', 'BMCE', 'Al Barid Bank', 'BMCI'],
            tickmarkPlacement: 'on',
            lineWidth: 0
        },
        yAxis: {
            gridLineInterpolation: 'polygon',
            lineWidth: 0,
            min: 0
        },
        tooltip: {
            shared: true,
            pointFormat: '<span style="color:{series.color}">{series.name}: <b>{point.y:,.0f} Contrats</b><br/>'
        },
        legend: {
            align: 'right',
            verticalAlign: 'bottom',
            layout: 'vertical'
        },
        credits: {
        enabled: false
        },
        exporting:{
            enabled: true,
        },
        series: [{
            name: 'Immobiliers',
            color: "#7cb5ec",
            pointPlacement: 'on'
        }, {
            name: 'Consommation',
            color: "#f15c80",
            pointPlacement: 'on'
        }, {
            name: 'Automobile',
            color: '#434348',
            pointPlacement: 'on'
        }, {
            name: 'Prêt à l’habitat',
            color: '#f7a35c',
            pointPlacement: 'on'    
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
    optionPiePoint :any =  {
        chart: {
            shadow: true,
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },
        title: {
            text: 'Types des Crédits de Concurrent',
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
        credits: {
            enabled: false
        },
        legend: {
            // align: 'middle',
            // verticalAlign: 'top',
            // layout: 'horizontal'
        },
        exporting:{
            enabled: true,
        },
        series: [{
            name: 'type de credits',
            colorByPoint: true,
            data: [
                {
                    name: 'Immobilièrs',
                    y: 0,
                    sliced: true,
                    selected: true,
                    color: "#7cb5ec",
                },
                {
                    name: 'Consommation',
                    y: 0,
                    color: "#f15c80",
                },
                {
                    name: 'Automobile',
                    y: 0,
                    color: '#434348',
                },
                {
                    name: 'Prêt à l’habitat',
                    color: '#f7a35c',
                    y: 0
                }
            ],
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

   

    constructor(private service: TfcCctcService) { }


    ngOnInit(): void {  
        this.requestData();
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        
        this.filteredOptions = this.cityForm.valueChanges
        .pipe(
        startWith(''),
        map(value => this._filter(value))
        );
    }

    ngAfterViewInit (){
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
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
            score: score
        };

        if(city !== null && city !== ""){
            dataToSend.city = city;
        }else{
            dataToSend.region = region;
        }
        console.log(dataToSend);
        this.requestDataTable(dataToSend);
        await this.requestDataChartSpider(dataToSend);
        this.requestDataPie();
    }

    async requestDataChartSpider(params){
        let data:any = await this.service.getDataSpiderData(params);
        this.concurrentList = data.categories;
        this.selectedBank=data.categories[0];
        this.optionSpiderChart.xAxis.categories = data.categories;
        this.optionSpiderChart.series[0].data = data.immo;
        this.optionSpiderChart.series[1].data = data.conso;
        this.optionSpiderChart.series[2].data = data.auto;
        this.optionSpiderChart.series[3].data = data.pretHabitat;
        this.optionSpiderChart.title.text = params.city && params.city !== null && params.city !== "" ?
            'Analyse de la Concurrencepar Type des Crédits pour '+params.city :
            'Analyse de la Concurrence par Type des Crédits';
        if(!this.isSummarize){
            Highcharts.chart("container4", this.optionSpiderChart);
        }
    }

    async requestDataPie(){
        let index = this.optionSpiderChart.xAxis.categories.indexOf(this.selectedBank)
        this.optionPiePoint.series[0].data.forEach((element, i) => {
            console.log(this.optionSpiderChart.series[i].data[index])
            element.y = this.optionSpiderChart.series[i].data[index];
        });
        this.optionPiePoint.title.text = "Pourcentage pour Chaque Type de Crédit pour le Concurrent "+this.selectedBank;
        this.optionPiePoint.chart.shadow = this.isSummarize ? false : true;
        this.optionPiePoint.exporting.enabled = this.isSummarize ? false : true;
        Highcharts.chart("container5", this.optionPiePoint);    
    }

    async requestDataTable(params){
        let data:any = await this.service.getDataTable(params);
        console.log(data)
        this.ELEMENT_DATA = data;
        this.dataSource = new MatTableDataSource<PeriodicElement>(data);
        this.loadingTableData = false;
    }

    selectOptionFrench() {
        let val = this.selectedDuration == "1Month" ? "1 Mois" :
        this.selectedDuration == "2Months" ? "2 Mois" :
        this.selectedDuration == "3Months" ? "3 Mois" :
        this.selectedDuration ==  "6Months" ? "6 Mois" : "12 Mois";
        return val;
    }
    
    clearCity(){
        this.cityForm.setValue('');
        this.requestData();
    }

    private _filter(value: string): string[] {
        const filterValue = value.toLowerCase();
        return this.optionsCities.filter(option => option.toLowerCase().includes(filterValue));
    }

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

  

}