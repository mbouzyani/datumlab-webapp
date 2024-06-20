import { Injectable } from '@angular/core';

import * as LCTTMAP from "../../../../../../data/loanComingToTerm/region.json";
import { MapColors } from  "../../../../../enums/map-colors";

@Injectable({
  providedIn: 'root'
})
export class LcttMapService {

  constructor() { }


  reqData(params){
    let data; 
    if(params.score.length == 1){
      data = this.getMapDataOfLCTT()["score"];
    }else if(params.month.length <5 ){
      data = this.getMapDataOfLCTT()["month"];
    }else if(params.capacity.length < 3){
      data = this.getMapDataOfLCTT()["capacity"];
    }else{
      data = this.getMapDataOfLCTT()["all"];
    }
    return this.filter(data);
  }



  getMapDataOfLCTT(){
    return {all: LCTTMAP.all, month: LCTTMAP.month, score: LCTTMAP.score, capacity: LCTTMAP.capacity};
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


  treatment(data){

    let ids = Object.keys(data);
    let sum = 0;
    let supNbre=0;

    ids.forEach(id => {
      let nbre = data[id].nbrCustomers;
      supNbre = supNbre < nbre ? nbre : supNbre;
    });

    if(supNbre !== 0){

      ids.forEach(id => {

        let nbre = data[id].nbrCustomers;
        data[id].percent = (nbre/supNbre)*100;
        data[id].colorPosition = Math.round((data[id].percent*24)/100) ;
        data[id].color = MapColors[data[id].colorPosition];
        
      });
      return data;

    }else{

      return "No data to display";

    }

  }

}
