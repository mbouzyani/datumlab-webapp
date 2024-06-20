import { Injectable } from '@angular/core';
import * as globalFC from "../../../../../../data/loanComingToTerm/financingCapacityData.json";
import { regionsList, cities} from '../../../../../enums/region-morocco';

@Injectable({
  providedIn: 'root'
})
export class FinancingCapacityService {

  constructor() { }

  getGlobalDataOfFC(params){
    let dt=[];
    regionsList.forEach(itm =>{
      let dd =  { 
        name: itm,
        data: [
          Math.floor(Math.random() * (1000 - 400)) + 400, 
          Math.floor(Math.random() * (1000 - 400)) + 400, 
          Math.floor(Math.random() * (1000 - 400)) + 400
        ]
      }
      dt.push(dd)
    });
    return dt;
  }


  getDataOfCity(params){
    console.log('data', globalFC)
    return {"35": globalFC["35"], "35-45": globalFC["35-45"], "45": globalFC["45"]};
  }


}
