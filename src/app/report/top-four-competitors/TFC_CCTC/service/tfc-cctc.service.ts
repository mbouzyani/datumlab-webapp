import { Injectable } from '@angular/core';
import * as dataFromServer from '../../../../../../data/top-four-competitors/tfc-cctc.json'


@Injectable({
  providedIn: 'root'
})
export class TfcCctcService {

  constructor() { }

  //// start services for barchart data
  async getDataSpiderData(params){
    console.log(params);
    let data:any=[];
    if(params.duration=="2Months"){
      dataFromServer.spiderData["2Months"].allRegion;
      if(params.score.length == 1){
        data = dataFromServer.spiderData["2Months"].score;
      }else{
        if(params.region && params.region.length<12){
          data = dataFromServer.spiderData["2Months"].region;
        }else{
          if(params.city){
            data =dataFromServer.spiderData["2Months"].city;
          }else{
            data = dataFromServer.spiderData["2Months"].allRegion;
          }
        }
      }
    }else{
      dataFromServer.spiderData["other"].allRegion;
      if(params.score.length == 1){
        data = dataFromServer.spiderData["other"].score;
      }else{
        if(params.region && params.region.length<12){
          data = dataFromServer.spiderData["other"].region;
        }else{
          if(params.city){
            data = dataFromServer.spiderData["other"].city;
          }else{
           data = dataFromServer.spiderData["other"].allRegion;
          }
        }
      }
      console.log(data)
    }
    let finalData =  await this.restructionDataSpider(data);
    console.log(finalData)
    return finalData;
  }

  restructionDataSpider(data){
    let categories = [];
    let immo = [];
    let conso = []; 
    let auto = []; 
    let pretHabitat = []; 
    data.categories.forEach(element => {
      categories.push(this.nameBanque(element));
    });
    immo = data.immo;
    conso = data.conso;
    auto = data.auto;
    pretHabitat = data.pretHabitat;

    return {categories: categories, immo: immo, conso: conso, auto: auto, pretHabitat: pretHabitat};
  }

  //// end services for barchart data


  //// start services for table data
  async getDataTable(params){
    let data:any; 
    
    if(params.duration=="2Months"){
      dataFromServer.dataTable["2Months"].allRegion;
      if(params.score.length == 1){
        data = dataFromServer.dataTable["2Months"].score;
      }else{
        if(params.region && params.region.length<12){
          data = dataFromServer.dataTable["2Months"].region;
        }else{
          if(params.city){
            data = dataFromServer.dataTable["2Months"].city;
          }else{
            data = dataFromServer.dataTable["2Months"].allRegion;
          }
        }
      }

    }else{
      dataFromServer.dataTable["other"].allRegion;
      if(params.score.length == 1){
        data = dataFromServer.dataTable["other"].score;
      }else{
        if(params.region && params.region.length<12){
          data = dataFromServer.dataTable["other"].region;
        }else{
          if(params.city){
            data = dataFromServer.dataTable["other"].city;
          }else{
           data = dataFromServer.dataTable["other"].allRegion;
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
      itm.position= element.position;
      itm.concurrents= this.nameBanque(element.concurrents);

      itm.nbreContratImmo= element.nbreContratImmo;
      itm.varImmo= element.varImmo;

      itm.nbreContratConso= element.nbreContratConso;
      itm.varConso= element.varConso;
      
      itm.nbreContratAuto= element.nbreContratAuto;
      itm.varAuto= element.varAuto;
      
      itm.indiceImmo= element.indiceImmo;
      itm.indiceConso= element.indiceConso;
      itm.indiceAuto= element.indiceAuto;
      restructedData.push(itm);
    });
    // restructedData.sort((a:any, b:any) =>{
    //   return b.nbreContratImmo - a.nbreContratImmo;
    // });
    return restructedData;
  }
  //// end services for table data



  //// start service for AreaChart data 
  async getDataArea(params){
    console.log(params);
    let data:any=[];
    if(params.duration=="2Months"){
      dataFromServer.spiderData["2Months"].allRegion;
      if(params.score.length == 1){
        data = dataFromServer.pieData["2Months"].score;
      }else{
        if(params.region && params.region.length<12){
          data = dataFromServer.pieData["2Months"].region;
        }else{
          if(params.city){
            data =dataFromServer.pieData["2Months"].city;
          }else{
            data = dataFromServer.pieData["2Months"].allRegion;
          }
        }
      }
    }else{
      dataFromServer.pieData["other"].allRegion;
      if(params.score.length == 1){
        data = dataFromServer.pieData["other"].score;
      }else{
        if(params.region && params.region.length<12){
          data = dataFromServer.pieData["other"].region;
        }else{
          if(params.city){
            data = dataFromServer.pieData["other"].city;
          }else{
           data = dataFromServer.pieData["other"].allRegion;
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
        data : element.data
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
}
