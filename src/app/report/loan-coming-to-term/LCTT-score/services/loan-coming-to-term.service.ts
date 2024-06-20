import { Injectable } from '@angular/core';
import * as data from "../../../../../../data/loanComingToTerm/loanComingToTermData.json";

@Injectable({
  providedIn: 'root'
})
export class LoanComingToTermService {

  constructor() { }

  getGlobalDataOfLCTT(){
    console.log('data', data.global)
    return {elite: data.global.elite, ultime: data.global.ultime};
  }

  getGlobalDataOfLCTTWithRegion(params){
    console.log('data', params);
    let capacity = params.capacity.length<3
    return  capacity ? {elite: data.region.elite, ultime: data.region.ultime} : 
                        {elite: data.capacity.elite, ultime: data.capacity.ultime};
  }

  getGlobalDataOfLCTTWithCity(params){
    console.log('data', params);
    return {elite: data.city.elite, ultime: data.city.ultime};
  }

}
