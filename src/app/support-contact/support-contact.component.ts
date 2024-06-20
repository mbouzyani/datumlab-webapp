import { Component, OnInit,ViewChild } from '@angular/core';
import {CdkTextareaAutosize} from '@angular/cdk/text-field';

@Component({
  selector: 'app-support-contact',
  templateUrl: './support-contact.component.html',
  styleUrls: ['./support-contact.component.scss']
})
export class SupportContactComponent implements OnInit {
  @ViewChild('autosize') autosize: CdkTextareaAutosize;

  constructor() { }

  ngOnInit(): void {
  }
  send(){
    alert("Request to back end");

  }
}
