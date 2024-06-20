import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { TfcCcmService} from './service/tfc-ccm.service'
import { regionsList, cities} from '../../../../enums/region-morocco';


export interface PeriodicElement {
    concurrents: string;
    position: number;
    revenu: number;
    varRevenu: string;
    turnOver: number;
    varTurnOver: string;
    indiceTurnOver: number;
    indiceRevenu: number;
  }
@Component({
  selector: 'app-tfc-ccm',
  templateUrl: './tfc-ccm.component.html',
  styleUrls: ['./tfc-ccm.component.scss']
})


export class TFCCCMComponent implements OnInit {
    @Input() isSummarize: boolean = false;

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
    
    selectedNumber: string ='';
    Highcharts = Highcharts;
    cityForm = new FormControl();
    scoreForm = new FormControl(['Elite', 'Ultimate']);
    regionForm = new FormControl(regionsList);
    regionListForm: string[] = regionsList;
    optionsCities: string[] = cities;
    filteredOptions: Observable<string[]>;
    scoreList: string[] = ['Elite', 'Ultimate'];
    selectedDuration = '6Months';
    displayedColumns: string[] = ['position', 'concurrents', 'revenu', 'varRevenu', 'turnOver', 'varTurnOver'];
    ELEMENT_DATA: PeriodicElement[] = [];
    dataSource = new MatTableDataSource<PeriodicElement>(this.ELEMENT_DATA);
    loadingTableData:boolean=true;

    optionBarChart :any = {  
        chart: {
            shadow: true,
        },

        title: {
        text: 'Évolution du Chiffre d Affaires de Top 4 Concurrents'
        },
        
        xAxis: {
        categories: [] 
        // Should be replace with JSON
        },
        yAxis: [{ // Primary yAxis
            labels: {
                format: '{value}',
                style: {
                    color: Highcharts.getOptions().colors[0]
                }
            },
            
            title: {
                text: "Chiffre d'Affaires DH",
                style: {
                    color: Highcharts.getOptions().colors[0]
                }
            }
        }, { // Secondary yAxis
            title: {
                text: 'Revenue en DH',
                style: {
                    color: Highcharts.getOptions().colors[1]
                }
            },
            labels: {
                format: '{value} DH',
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
        series: [{   //Should be replace with JSON
        type: 'column',
        name: 'Chiffre d Affaires',
        color: "#2700d1",
        data: []
        }, {
        type: 'column',
        name: 'Revenue',
        color: "#f67b28",
        data: []
        },

        {
            type: 'spline',
            name: 'Moyenne',
            yAxis: 1,
            color: "#0cc6c1",
            data: [],
            marker: {
                lineWidth: 2,
                lineColor: Highcharts.getOptions().colors[3],
                fillColor: 'white'
            }
        }

        ]
    };
    
    optionArea: any = {
        chart: {
            type: 'area',
            shadow: true,
        },
        title: {
            text: 'Taux de Croissance des Concurrents'
        },
        subtitle: {
            text: ''
        },
        xAxis: {
            categories: [],
            tickmarkPlacement: 'on',
            title: {
                enabled: false
            }
        },
        yAxis: {
            title: {
                text: 'Dirhams'
            },
            labels: {
                formatter: function () {
                    return this.value / 1000;
                }
            }
        },
        tooltip: {
            split: true,
            valueSuffix: ' millions'
        },
        plotOptions: {
            area: {
                stacking: 'normal',
                lineColor: '#666666',
                lineWidth: 1,
                marker: {
                    lineWidth: 1,
                    lineColor: '#666666'
                }
            }
        },
        credits: {
            enabled: false
        },
        exporting:{
            enabled: true,
        },
        series: []
    }

    selectChangeHandler (event: any) {
        this.selectedNumber = event.target.value;
    }

    constructor(private service: TfcCcmService) { }


    ngOnInit(): void {
        HC_exporting(Highcharts);
        this.requestData();
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

        this.filteredOptions = this.cityForm.valueChanges
        .pipe(
            startWith(''),
            map(value => this._filter(value))
        );
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
        this.requestDataChartBar(dataToSend);
        this.requestDataChartArea(dataToSend);
        this.requestDataTable(dataToSend);
    }

    async requestDataChartBar(params){
        let data:any = await this.service.getDataBar(params);
        this.optionBarChart.xAxis.categories = data.categories;
        this.optionBarChart.series[0].data = data.turnover;
        this.optionBarChart.series[1].data = data.revenu;
        this.optionBarChart.series[2].data = data.average;
        if(! this.isSummarize)Highcharts.chart("container2", this.optionBarChart);
    }


    async requestDataChartArea(params){
        let data:any = await this.service.getDataArea(params);
        console.log(data)
        this.optionArea.xAxis.categories = data.categories;
        this.optionArea.series = data.series;
        setTimeout(() => {
            Highcharts.chart("container3", this.optionArea);
        }, 500);

        
    }

    async requestDataTable(params){
        let data:any = await this.service.getDataTable(params);
        console.log(data)
        this.ELEMENT_DATA = data;
        this.dataSource = new MatTableDataSource<PeriodicElement>(data);
        this.loadingTableData = false;
    }

    async sortData(data){
        console.log(data)
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
        let val = this.selectedDuration == "6Months" ? "6 Mois" :
        this.selectedDuration == "12Months" ? "12 Mois" :
        this.selectedDuration == "18Months" ? "18 Mois" :
        this.selectedDuration == "2Years" ? "2 années" : "2 années";
        return val;
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
