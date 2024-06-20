import { Injectable } from '@angular/core';

import {ExportService} from '../../dv-service-export'

@Injectable({
  providedIn: 'root'
})
export class DvNcService {

  exempleData={
    elite: [145, 245, 145, 454, 545, 255, 255, 155],
    ultime: [120, 245, 145, 354, 445, 155, 255, 122],
    prime: [110, 225, 125, 334, 425, 255, 222, 111],
    pie:{totale: 9200,accepted: 6000,rejected: 3200}
  }

  constructor(private exportService: ExportService) { }

  async getData(settings){

    return this.exempleData;

  }

}
