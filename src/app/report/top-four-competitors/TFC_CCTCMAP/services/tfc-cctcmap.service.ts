import { Injectable } from '@angular/core';


import * as TFC_CCTCMAP from "../../../../../../data/top-four-competitors/region.json";
import { MapColors } from  "../../../../../enums/map-colors";
import { regionList } from "../../../../../enums/region-morocco"
// import {  } from '../'



@Injectable({
  providedIn: 'root'
})
export class TFC_CCTCMAPService { 

  constructor() { }


  async getAllRegionData(params){
    console.log('getAllRegionData', params)
    let Data:any={};
    let colorGradient="#f5df34";
    if(params.score){
      colorGradient="#13206b";
      if(params.score.length<2){
        Data = TFC_CCTCMAP.AllRegion.nbrClient;
      }else{
        Data = TFC_CCTCMAP.AllRegion.nbrClient;
      }
    }else if(params.loanType){
      colorGradient="#f3de03";
      if(params.loanType.length<3){
        Data = TFC_CCTCMAP.AllRegion.loanType;
      }else{
        Data = TFC_CCTCMAP.AllRegion.loanType;
      }
    }else{
      colorGradient="#018b5a";
      Data = TFC_CCTCMAP.AllRegion.amount;
    }

    let sortedData = await this.sortData(Data);
    let dataWithRayonAnOpacity = await this.RayonOpacity(sortedData)
    let finalData = await this.restructionDataRegion(dataWithRayonAnOpacity, colorGradient);
    console.log(finalData)
    return finalData;

  }
  
  restructionDataRegion(data, colorGradient){
    let dataRestructed:any = {};
    regionList.forEach(region=>{
      let bank = this.nameBanque(data[region].bank);
      // let color = this.colorBanque(data[region].bank);
      let color = colorGradient;
      dataRestructed[region]={};
      dataRestructed[region].value = data[region].value;
      dataRestructed[region].rayon = data[region].rayon;
      dataRestructed[region].opacity = data[region].opacity;
      dataRestructed[region].bank = bank;
      dataRestructed[region].color = color;
    });
    return dataRestructed;
  }

  nameBanque(code){
    let codeBank = {
        "007": "ATTIJARIWAFA BANK",
        "011": "BMCE BANK",
        "013": "BMCI",
        "022": "SGMB",
        "045": "BANK ALAMAL",
        "050": "CGF BANK",
        "230": "CIH",
        "350": "AL BARID BANK",
        "360": "UMNIA Bank",
        "362": "BANK ASSAFA",
        "366": "BANK AL YOUSR",
        "367": "BTI BANK",

    }
  return codeBank[code]
  }

  colorBanque(code){
  let codeBank = {
      "007": "#f7af2a",
      "011": "#0e55a7",
      "013": "#018b5a",
      "022": "#e6002e",
      "045": "#f59203",
      "050": "#e03a2e",
      "230": "#e9461b",
      "350": "#f5df34",
      "360": "#941d41",
      "362": "#008d6f",
      "366": "#cb3137",
      "367": "#f85600",
  }
return codeBank[code]
  }

  sortData(data){
    let keysSorted = Object.keys(data).sort(function(a,b){
      return data[a].value - data[b].value
    });
    console.log(keysSorted)
    let sortedData = {};
    keysSorted.forEach((key, i)=>{
      sortedData[key] = data[key];
      sortedData[key].bank = data[key].bank;
      sortedData[key].value = data[key].value;
    });
    return sortedData;
  }

  RayonOpacity(data){
    let maxRayon = 40;
    let minRayon = 20;
    let maxOpacity = 1;
    let minOpacity = 0.5;
    let keys = Object.keys(data);
    let maxValue = data[keys[keys.length-1]].value;
    let minValue = data[keys[0]].value;
    let newData={}
    keys.forEach(elemnt => {
      let rayon = (data[elemnt].value*maxRayon)/maxValue;
      let opacity = (data[elemnt].value*maxOpacity)/maxValue;
      rayon <20 ? rayon=20 : "";
      opacity<0.5 ? opacity=0.5 : "";
      newData[elemnt]={};
      newData[elemnt].rayon = rayon;
      newData[elemnt].opacity = opacity;
      newData[elemnt].bank=data[elemnt].bank;
      newData[elemnt].value=data[elemnt].value;
    });
    return newData;
    
  }


  async getRegionData(params){
    console.log('getAllRegionData', params)
    let Data:any={};
    let colorGradient="#f5df34";
    if(params.score){
      colorGradient="#13206b";
      if(params.score.length<2){
        Data = TFC_CCTCMAP.region[params.region].nbrClient;
      }else{
        Data = TFC_CCTCMAP.region[params.region].nbrClient;
      }
    }else if(params.loanType){
      colorGradient="#f3de03";
      if(params.loanType.length<3){
        Data = TFC_CCTCMAP.region[params.region].loanType;
      }else{
        Data = TFC_CCTCMAP.region[params.region].loanType;
      }
    }else{
      colorGradient="#90ed7d";
      Data = TFC_CCTCMAP.region[params.region].amount;
    }

    let finalData = [
      {
        name: this.nameBanque(Data.bank1),
        y: Data.value1,
        color: this.colorBanque(Data.bank1), 
        sliced: true,
        selected: true
      },
      {
        name: this.nameBanque(Data.bank2),
        y: Data.value2,
        color: this.colorBanque(Data.bank2)
      },
      {
        name: this.nameBanque(Data.bank3),
        y: Data.value3,
        color: this.colorBanque(Data.bank3)
      },
      {
        name: this.nameBanque(Data.bank4),
        y: Data.value4,
        color: this.colorBanque(Data.bank4)
      }
    ]
    console.log('finalData', finalData);
    return finalData;

  }

  async getDataCity(params){
    console.log('getAllRegionData', params)
    let Data:any={};
    let colorGradient="#f5df34";
    if(params.score){
      colorGradient="#13206b";
      if(params.score.length<2){
        Data = TFC_CCTCMAP.city[params.city].nbrClient;
      }else{
        Data = TFC_CCTCMAP.city[params.city].nbrClient;
      }
    }else if(params.loanType){
      colorGradient="#f3de03";
      if(params.loanType.length<3){
        Data = TFC_CCTCMAP.city[params.city].loanType;
      }else{
        Data = TFC_CCTCMAP.city[params.city].loanType;
      }
    }else{
      colorGradient="#018b5a";
      Data = TFC_CCTCMAP.city[params.city].amount;
    }

    let finalData = [
      {
        name: this.nameBanque(Data.bank1),
        y: Data.value1,
        color: this.colorBanque(Data.bank1), 
        sliced: true,
        selected: true
      },
      {
        name: this.nameBanque(Data.bank2),
        y: Data.value2,
        color: this.colorBanque(Data.bank2)
      },
      {
        name: this.nameBanque(Data.bank3),
        y: Data.value3,
        color: this.colorBanque(Data.bank3)
      },
      {
        name: this.nameBanque(Data.bank4),
        y: Data.value4,
        color: this.colorBanque(Data.bank4)
      }
    ]
    console.log('finalData', finalData);
    return finalData;

  }


}
