import { Component, OnInit, Input, ViewChild } from '@angular/core';
import * as $ from 'jquery'
import {CdkTextareaAutosize} from '@angular/cdk/text-field';

interface SelectChoice {
  value: string;
  viewValue: string;
}


@Component({
  selector: 'app-email-report',
  templateUrl: './email-report.component.html',
  styleUrls: ['./email-report.component.scss']
})
export class EmailReportComponent implements OnInit {
  @ViewChild('autosize') autosize: CdkTextareaAutosize;
  @Input() title: string="";
  pieceTypes: SelectChoice[] = [
    {value: 'PDF', viewValue: 'PDF'},
    {value: 'EXCEL', viewValue: 'EXCEL'},
    {value: 'CSV', viewValue: 'CSV'}
  ];
  frequences: SelectChoice[] = [
    {value: 'une fois', viewValue: 'une fois'},
    {value: 'quotidien', viewValue: 'quotidien'},
    {value: 'hebdomadaire', viewValue: 'hebdomadaire'},
    {value: 'mensuel', viewValue: 'mensuel'},
    {value: 'trimestriel', viewValue: 'trimestriel'},
  ];
  advancedOptions: SelectChoice[] = [
    {value: '1 mois', viewValue: '1 mois'},
    {value: '2 mois', viewValue: '2 mois'},
    {value: '3 mois', viewValue: '3 mois'},
    {value: '4 mois', viewValue: '4 mois'},
    {value: '5 mois', viewValue: '5 mois'},
    {value: '6 mois', viewValue: '6 mois'},
    {value: '7 mois', viewValue: '7 mois'},
    {value: '8 mois', viewValue: '8 mois'},
    {value: '9 mois', viewValue: '9 mois'},
    {value: '10 mois', viewValue: '10 mois'}
  ];

  constructor() { }

  ngOnInit(): void {
    $(document).on('click', function (e) {
      // if ($(e.target).closest("#form-email").length === 0) {
      //   if($('#popup').css('display') == "block") {$('#popup').hide();}
      // }
    });
  }

  showPopupEmail(){
    setTimeout(() => {
      $('#popup').toggle();
    }, 10);
  }

  send(){
    $('#popup').hide();
    alert("Request to back end");
  }
  moveFormule(){
    // $( "#title" ).mousemove(function( event ) {
    //   var msg = "Handler for .mousemove() called at ";
    //   msg += event.pageX + ", " + event.pageY;
    //   $( "#title" ).append( "<div>" + msg + "</div>" );
    //   // $( "#form-email" ).append( "<div>" + msg + "</div>" );
    // });
  }

}
