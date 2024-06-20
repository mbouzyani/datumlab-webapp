import { Component, OnInit, ViewChild, Input } from '@angular/core';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';



@Component({
  selector: 'app-acquiqition-cost',
  templateUrl: './acquiqition-cost.component.html',
  styleUrls: ['./acquiqition-cost.component.scss']
})
export class AcquiqitionCostComponent implements OnInit {

  @Input() isSummarize:boolean=false;

  Highcharts = Highcharts;
  selectedDuration = 'month';
  selectedLoanType = 'immo';
  selectedVarAmount = 'val1';

  varAmountImmo = ["4 500 000 - 6 000 000", "3 000 000 - 4 500 000", "1 500 000 - 3 000 000", "500 000 - 1 500 000", "200 000 - 500 000"];
  varAmountConso = ["1 000 000 - 2 000 000", "500 000 - 1 000 000", "250 000 - 500 000", "150 000 - 250 000", "100 000 - 150 000", "500 000 - 100 000"];
  varAmountAuto = ["1 000 000 - 2 000 000", "500 000 - 1 000 000", "250 000 - 500 000", "150 000 - 250 000", "100 000 - 150 000", "500 000 - 100 000"];

  optionOne:any = {
    chart: {
      type: 'spline',
      shadow: true,

    },
    title: {
      text: 'Coût d’acquisition client (CAC)',
      style: {
        "fontSize": "18px",
        "fill": "#333333",
        "fontFamily": "serif",
        "fontWeight": "400"
      }
    },
    subtitle: {
      // text: 'Source: WorldClimate.com'
    },
    xAxis: {
      categories: []
    },
    yAxis: {
      title: {
        text: 'CAC',
        enabled : false,
      },
      labels: {
          formatter: function () {
              return this.value + 'Dhs';
          }
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
    tooltip: {
      // pointFormat: '<b>{point.name:.1f}</b> représente  <b>{point.percentage:.1f}%</b> du {series.name}',
      pointFormat: ' Le coût pour acquérir un seul client  <b>{categories.name}</b>  est  <b>{point.y} Dhs</b>',
      // formatter:function(){
      //     console.log(this);
      //     return 'Le coût pour acquérir un seul client pour <b> '+ this.x +'</b>  est  <b>'+this.y +'</b>';
      // },
      // crosshairs: true,
      // shared: true
      
    },
    plotOptions: {
      spline: {
        marker: {
          radius: 4,
          lineColor: '#666666',
          lineWidth: 1
        }
      },
      series: {
        allowPointSelect: true,
        cursor: 'pointer',
      },
      line: {
        dataLabels: {
          enabled: true
        }
    }
    },
    series: [
      
    ]
  };
  optionTwo:any = {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      shadow: true,
      type: 'pie',
    },
    title: {
      text: "Distribution de CAC"
    },
    tooltip: {
      pointFormat: '<b>{point.name:.1f}</b> représente  <b>{point.percentage:.1f}%</b> du {series.name}'
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
      name: "CAC",
      data: [
          { name: 'Salaires', y: 61.41 },
          { name: 'Médias sociaux', y: 11.84 },
          { name: 'Commissions', y: 10.85 },
          { name: 'Directe Email', y: 10.85 },
          { name: 'Campagne ', y: 4.67 },
      ]
    }]
  };
  globeSettings:any={};
  chartOne:any;
  chartTwo:any;

  constructor() { }

  ngOnInit(): void {
    this.requestData();
  }
  ngAfterContentInit(){}

  requestData(){
    let duration = this.selectedDuration;
    let loanType = this.selectedLoanType;
    let varAmount = this.selectedVarAmount;
    let dataToSend:any = {};

    dataToSend = {
        duration: duration,
        loanType: loanType,
        varAmount: varAmount
    }
    
    this.globeSettings = dataToSend;
    this.displayDataOne(dataToSend);
  }

  async displayDataOne(data){
    HC_exporting(Highcharts);
    let min = 0;
    let max = 4;
    if(this.selectedDuration == "month") {
        this.optionOne.xAxis.categories = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
        'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
        this.optionOne.series[0]=    {
            showInLegend: false,
            name: 'CAC',
            marker: {
                symbol: 'square'
            },
            data: [150,
              {
                y: 80,
                marker: {
                  symbol: "url(assets/bell8.png)"
                }
              }, 220, 445, 182, 315, 252, {
                y: 600,
                marker: {
                  symbol: "url(assets/warning.png)"
                }
            }, 233, 483, 139, 296]
    
        }
        min=7;
        

    }else if (this.selectedDuration == "trimester"){
        this.optionOne.xAxis.categories = ['Jan-Mar', 'Avr-Jui', 'Jul-Sep', 'Oct-Déc'];
        this.optionOne.series[0]=    {
            showInLegend: false,
            name: 'CAC',
            marker: {
                symbol: 'square'
            },
            data: [
                1600,
              {
                y: 1200,
                marker: {
                    symbol: "url(assets/bell.png)"
                }
              }, {
                y: 2420,
                marker: {
                    symbol: "url(assets/danger-sing.png)"
                }
            }, 1496]
    
        }
        min = 2;

    }else {
        this.optionOne.xAxis.categories = ['2009', '2010', '2011', '2012', '2013', '2014',
                '2015', '2016', '2017', '2018', '2019', '2020'];
        this.optionOne.series[0]=    {
            showInLegend: false,
            name: 'CAC',
            marker: {
                symbol: 'square'
            },
            data: [3045,
                {
                    y: 4045,
                    marker: {
                        symbol: "url(assets/danger-sing.png)"
                    }
                },3445, 1820, 3150,  {
                    y: 800,
                    marker: {
                        symbol: "url(assets/bell.png)"
                    }
                },1504,2520, 1233, 1483, 2139, 1296]
    
        }
        min = 1;

    } 


 
    setTimeout(() => {
      if(!this.isSummarize){
        this.chartTwo = Highcharts.chart("container-cac-2", this.optionTwo);
      }
      this.optionOne.chart.shadow = this.isSummarize ? false : true;
      this.optionOne.chart.backgroundColor = this.isSummarize ? null : "white";
      this.optionOne.exporting.enabled = this.isSummarize ? false : true;


      this.chartOne = Highcharts.chart("container-cac-1", this.optionOne);
      // this.chartOne.tooltip.refresh(this.chartOne.series[0].data[min], this.chartOne.series[0].data[max]);
    }, 300);
  }


}



