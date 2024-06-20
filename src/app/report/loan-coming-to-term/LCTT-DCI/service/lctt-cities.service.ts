import { Injectable } from '@angular/core';
import * as LCTTCITIES from "../../../../../../data/loanComingToTerm/cities.json";

import { MapColors } from  "../../../../../enums/map-colors";


@Injectable({
  providedIn: 'root'
})
export class LcttCitiesService {

  constructor() { }

  getCitiesData(params){
    console.log( this.getMapDataOfLCTTCITIES()["score"][params.region])
    let data; 
    if(params.score.length == 1){
      data = this.getMapDataOfLCTTCITIES()["score"][params.region];
    }else if(params.month.length <5 ){
      data = this.getMapDataOfLCTTCITIES()["month"][params.region];
    }else if(params.capacity.length <3 ){
      data = this.getMapDataOfLCTTCITIES()["capacity"][params.region];
    }else{
      data = this.getMapDataOfLCTTCITIES()["all"][params.region];
    }
    return this.filter(data);
  }

  
  getMapDataOfLCTTCITIES(){
    return {all: LCTTCITIES.all, month: LCTTCITIES.month, 
      score: LCTTCITIES.score, capacity: LCTTCITIES.capacity};
  }


  filter(data){
    let keysSorted = Object.keys(data).sort(function(a,b){
      return data[a].nbrCustomers - data[b].nbrCustomers
    });
    let sortedData = {};
    keysSorted.forEach((key, i)=>{
      sortedData[key] = data[key];
      sortedData[key].color = MapColors[i]
    });
    return sortedData;
  }


}
