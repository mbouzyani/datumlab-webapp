import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import * as Highcharts from 'highcharts';
import * as $ from 'jquery';


import { TFC_CCTCMAPService } from './services/tfc-cctcmap.service';
import { regionsList, cities, regionName} from '../../../../enums/region-morocco';

@Component({
  selector: 'app-tfc-cctcmap',
  templateUrl: './tfc-cctcmap.component.html',
  styleUrls: ['./tfc-cctcmap.component.scss']
})



export class TFCCCTCMAPComponent implements OnInit {

  selectedDuration = '30days';
  selectedType = 'nbrClient';
  scoreForm = new FormControl(['Élite', 'Ultime']);
  loanTypeForm = new FormControl(['Immobilières', 'Consommation', 'Automobile']);
  cityForm = new FormControl();
  scoreListForm: string[] = ['Élite', 'Ultime'];
  loanTypeListForm: string[] = ['Immobilières', 'Consommation', 'Automobile'];
  optionsCities: string[] = cities;
  filteredOptions: Observable<string[]>;
  isLoanType:boolean=false;
  isScoreType:boolean=true;
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

  constructor(private service : TFC_CCTCMAPService) { 
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
          var bank = $(this).attr('bank');

          $(".tooltipMap .region").text(name);
          $("#loan .val").text(value);
          $("#contract .title").text('Banque: ');
          $("#contract .val").text(bank);
          let position = $("#"+id+"-label").offset();
          $tooltip.css({position: "absolute", "top": position.top-170 + "px", "left": position.left-340 + "px"}).show();
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
        var bank = $(this).attr('bank');
      

        $(".tooltipMap .region").text(name);
        $("#loan .val").text(value);
        $("#contract .title").text('Banque: ');
        $("#contract .val").text(bank);
          $tooltip.css({position: "absolute", "top": event.pageY-170 + "px", "left": event.pageX-340 + "px"}).show();
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
        var bank = $(id_string).attr('bank');
       
        $(".tooltipMap .region").text(name);
        $("#loan .val").text(value);
        $("#contract .title").text('Banque: ');
        $("#contract .val").text(bank);
        let position = $("#"+id+"-label").offset();
        $tooltip.css({position: "absolute", "top": position.top-170 + "px", "left": position.left-340 + "px"}).show();
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
        var bank = $(id_string).attr('bank');

        $(".tooltipMap .region").text(name);
        $("#loan .val").text(value);
        $("#contract .title").text('Banque: ');
        $("#contract .val").text(bank);
        let position = $("#"+id+"-label").offset();
        $tooltip.css({position: "absolute", "top": position.top-170 + "px", "left": position.left-340 + "px"}).show();
      }, function(){
        $tooltip.hide();
      });
    });

    this.filteredOptions = this.cityForm.valueChanges
    .pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  newTypeSelected(){
    
    if(this.selectedType == 'loanType'){
      this.isLoanType=true;
      this.isScoreType=false;
      this.colorGradient="#f5df34"
    }else if (this.selectedType == 'nbrClient') {
      this.isLoanType=false;
      this.isScoreType=true;
      this.colorGradient="#4680ff"
    }else {
      this.isLoanType=false;
      this.isScoreType=false;
      this.colorGradient="#0a919b"
    }
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
    let score = this.scoreForm.value;
    let loanType = this.loanTypeForm.value;
    let duration = this.selectedDuration;
    let selectedType = this.selectedType; 
    let city = this.cityForm.value;
    let dataToSend:any = {};
    let sendDataToTheServer:boolean=true;

    if(selectedType == 'loanType'){
      if(loanType.length == 0){
        console.log("noooooooooooooooooooo data loan type")
        sendDataToTheServer=false;
      }else{
        dataToSend = {
          duration: duration,
          loanType: loanType,
          score: null,
          amount: null
        }
      }

    }else if ( selectedType == 'nbrClient' ){
      if(score.length == 0){
        sendDataToTheServer=false;
        console.log("noooooooooooooooooooo data loan nbre client")

      }else{
        dataToSend = {
          duration: duration,
          loanType: null,
          score: score,
          amount: null
        }
      }

    }else{
      dataToSend = {
        duration: duration,
        loanType: null,
        score: null,
        amount: true
      }

    }
    if(city !== null && city !== ""){
      this.requestDataCity();
    }else{
      if(sendDataToTheServer){
        this.dataRegionMap = await this.service.getAllRegionData(dataToSend);
      }else{
        // this.dataRegionMap=[];
      }
      this.showDetails(this.regionSelected);
    }
    
  }
      
  async showDetails(region){
    this.regionSelected = region;
    let score = this.scoreForm.value;
    let city = this.cityForm.value;
    let loanType = this.loanTypeForm.value;
    let duration = this.selectedDuration;
    let typeSelected = this.selectedType; 
    let sendDataToTheServer:boolean=true;
    let dataToSend:any = {};
    let title:string='';
    if(typeSelected == 'loanType'){
      if(loanType.length == 0){
        sendDataToTheServer=false;
      }else{
        dataToSend = {
          duration: duration,
          loanType: loanType,
          score: null,
          amount: null,
          region: region
        };
        ['Immobilières', 'Consommation', 'Automobile']
        title = loanType.length == 1 ? 'Répartition de type de crédit '+loanType[0]+' par Banque' : "Répartition de type de crédit par Banque";
      }

    }else if ( typeSelected == 'nbrClient' ){
      if(score.length == 0){
        sendDataToTheServer=false;
      }else{
        dataToSend = {
          duration: duration,
          loanType: null,
          score: score,
          amount: null,
          region: region
        }
        title='Répartition de Nombre des Clients par Banque'
      }
    }else{
      dataToSend = {
        duration: duration,
        loanType: null,
        score: null,
        amount: true,
        region: region
      }
      title='Répartition de Revenu par Banque'
    }
    if(city !== null && city !== ""){
      console.log( 'city', this.cityForm.value)
      this.cityForm.setValue('');
    }
    if(sendDataToTheServer){
      let finalData = await this.service.getRegionData(dataToSend);
      this.chartOptions.title.text = title+' pour la region '+regionName[region];
      this.chartOptions.series[0].name = this.returnCorrectTitlePie();
      this.chartOptions.series[0].data = finalData;
      Highcharts.chart('id-pie-chart', this.chartOptions);
    }else{
      this.pieNoData();
    }


  }

  async requestDataCity(){

    let score = this.scoreForm.value;
    let city = this.cityForm.value;
    let loanType = this.loanTypeForm.value;
    let duration = this.selectedDuration;
    let typeSelected = this.selectedType;     
    let dataToSend:any = {};
    let title:string='';
    let sendDataToTheServer:boolean=true;
    if(typeSelected == 'loanType'){
      if(loanType.length == 0){
        sendDataToTheServer=false;
      }else{
        dataToSend = {
          duration: duration,
          loanType: loanType,
          score: null,
          amount: null,
        };
        ['Immobilières', 'Consommation', 'Automobile']
        title = loanType.length == 1 ? 'Répartition de type de crédit '+loanType[0]+' par Banque' : "Répartition de type de crédit par Banque";
      }

    }else if ( typeSelected == 'nbrClient' ){
      if(score.length == 0){
        sendDataToTheServer=false;
      }else{
        dataToSend = {
          duration: duration,
          loanType: null,
          score: score,
          amount: null,
        }
        title='Répartition de Nombre des Clients par Banque';
      }
    }else{
      dataToSend = {
        duration: duration,
        loanType: null,
        score: null,
        amount: true,
      };
      title='Répartition Montant par Banque';
    }
    if(city !== null && city !== ""){
      dataToSend.city = city;
    }
    if(sendDataToTheServer){
      let finalData = await this.service.getDataCity(dataToSend);
      this.chartOptions.title.text = title+' pour '+city;
      this.chartOptions.series[0].name = this.returnCorrectTitlePie();
      this.chartOptions.series[0].data = finalData;
      Highcharts.chart('id-pie-chart', this.chartOptions);
    }else{
      this.pieNoData();
    }

  }

  returnCorrectTitleHoverMap(){
    let nameTitle = this.selectedType=="loanType" ? 'Nombre de Contrats:' :
    this.selectedType=="nbrClient" ? 'Nombre des Clients:' : 'Revenus en DHs:';
    return nameTitle;
  }

  returnCorrectTitlePie(){
    let nameTitle = this.selectedType=="loanType" ? 'Contrats ' :
    this.selectedType=="nbrClient" ? 'Clients ' : 'Revenus ';
    return nameTitle;
  }

  pieNoData(){
    // this.chartOptions.title.text = '';
    // this.chartOptions.series[0].name = '';
    this.chartOptions.series[0].data = [];
    Highcharts.chart('id-pie-chart', this.chartOptions);

  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.optionsCities.filter(option => option.toLowerCase().includes(filterValue));
  }

}
