import { Injectable } from '@angular/core';
import * as dataFromServer from '../../../../../../data/top-four-competitors/tfc-ccm.json'

@Injectable({
  providedIn: 'root'
})
export class TfcCcmService {

  constructor() { }

  //// start services for barchart data
  async getDataBar(params){
    console.log(params);
    let data:any=[];
    if(params.duration=="6Months"){
      dataFromServer.barData["6Months"].allRegion;
      if(params.score.length == 1){
        data = dataFromServer.barData["6Months"].score;
      }else{
        if(params.region && params.region.length<12){
          data = dataFromServer.barData["6Months"].region;
        }else{
          if(params.city){
            data =dataFromServer.barData["6Months"].city;
          }else{
            data = dataFromServer.barData["6Months"].allRegion;
          }

        }
      }

    }else{
      dataFromServer.barData["years"].allRegion;
      if(params.score.length == 1){
        data = dataFromServer.barData["years"].score;
      }else{
        if(params.region && params.region.length<12){
          data = dataFromServer.barData["years"].region;
        }else{
          if(params.city){
            data = dataFromServer.barData["years"].city;
          }else{
           data = dataFromServer.barData["years"].allRegion;
          }
        }
      }
    }
    let finalData =  await this.restructionDataBar(data);
    return finalData;
  }

  restructionDataBar(data){
    let categories =[];
    let turnover =[];
    let revenu =[]; 
    let average =[]; 
    data.categories.forEach(element => {
      categories.push(this.nameBanque(element));
    });
    turnover = data.turnover;
    revenu = data.revenu;
    average = data.average;

    console.log(data.turnover)
    return {categories: categories, turnover: turnover, revenu: revenu, average: average};
  }

  //// end services for barchart data


  //// start services for table data
  async getDataTable(params){
    let data:any; 
    
    if(params.duration=="6Months"){
      dataFromServer.dataTable["6Months"].allRegion;
      if(params.score.length == 1){
        data = dataFromServer.dataTable["6Months"].score;
      }else{
        if(params.region && params.region.length<12){
          data = dataFromServer.dataTable["6Months"].region;
        }else{
          if(params.city){
            data = dataFromServer.dataTable["6Months"].city;
          }else{
            data = dataFromServer.dataTable["6Months"].allRegion;
          }
        }
      }

    }else{
      dataFromServer.dataTable["years"].allRegion;
      if(params.score.length == 1){
        data = dataFromServer.dataTable["years"].score;
      }else{
        if(params.region && params.region.length<12){
          data = dataFromServer.dataTable["years"].region;
        }else{
          if(params.city){
            data = dataFromServer.dataTable["years"].city;
          }else{
           data = dataFromServer.dataTable["years"].allRegion;
          }
        }
      }
    }

    console.log(data)
    let finalData = await this.restructionDataTable(data);
    return finalData;
  }

  restructionDataTable(data){
   let restructedData=[];
    data.forEach(element => {
      let itm:any = {}
      itm.position= element.position,
      itm.concurrents= this.nameBanque(element.concurrents),
      itm.turnOver= element.turnOver,
      itm.varTurnOver= element.varTurnOver,
      itm.revenu= element.revenu,
      itm.varRevenu= element.varRevenu,
      itm.indiceTurnOver= element.indiceTurnOver,
      itm.indiceRevenu= element.indiceRevenu  
      restructedData.push(itm);
    });
    // restructedData.sort((a:any, b:any) =>{
    //   return b.revenu - a.revenu;
    // })
    return restructedData;
  }
  //// end services for table data



  //// start service for AreaChart data 
  async getDataArea(params){
    console.log(params);
    let data:any=[];
    if(params.duration=="6Months"){
      dataFromServer.barData["6Months"].allRegion;
      if(params.score.length == 1){
        data = dataFromServer.areaData["6Months"].score;
      }else{
        if(params.region && params.region.length<12){
          data = dataFromServer.areaData["6Months"].region;
        }else{
          if(params.city){
            data =dataFromServer.areaData["6Months"].city;
          }else{
            data = dataFromServer.areaData["6Months"].allRegion;
          }
        }
      }
    }else{
      dataFromServer.areaData["years"].allRegion;
      if(params.score.length == 1){
        data = dataFromServer.areaData["years"].score;
      }else{
        if(params.region && params.region.length<12){
          data = dataFromServer.areaData["years"].region;
        }else{
          if(params.city){
            data = dataFromServer.areaData["years"].city;
          }else{
           data = dataFromServer.areaData["years"].allRegion;
          }
        }
      }
    }
    let finalData =  await this.restructionDataArea(data);
    return finalData;
  }

  restructionDataArea(data){
    console.log(data)
    let categories = data.categories;
    let series =[];
    data.series.forEach(element => {
      let itm ={
        name : this.nameBanque(element.name),
        data : element.data, 
        color: this.colorBanque(element.name)
      }
      series.push(itm);
    });
    console.log(data.turnover)
    return {categories: categories, series: series};
  }
  //// end services for AreaChart data 

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
  
}
