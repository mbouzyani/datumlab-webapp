import { Injectable } from '@angular/core';
import * as dataFromServer from '../../../../../../data/top-four-competitors/tfc-ccnc.json'

@Injectable({
  providedIn: 'root'
})
export class TopFourCompetitorsService {

  constructor() { }

  async getDataBar(params){
    console.log(params);
    let data:any=[];
    if(params.duration=="7Days"){
      dataFromServer.barData["7Days"].allRegion;
      if(params.score.length == 1){
        data = dataFromServer.barData["7Days"].score;
      }else{
        if(params.region && params.region.length<12){
          data = dataFromServer.barData["7Days"].region;
        }else{
          if(params.city){
            data =dataFromServer.barData["7Days"].city;
          }else{
            data = dataFromServer.barData["7Days"].allRegion;
          }

        }
      }

    }else{
      dataFromServer.barData["month"].allRegion;
      if(params.score.length == 1){
        data = dataFromServer.barData["month"].score;
      }else{
        if(params.region && params.region.length<12){
          data = dataFromServer.barData["month"].region;
        }else{
          if(params.city){
            data = dataFromServer.barData["month"].city;
          }else{
           data = dataFromServer.barData["month"].allRegion;
          }
        }
      }
    }
    let finalData =  await this.restructionDataBar(data);
    return finalData;
  }

  async getDataTable(params){
    let data:any; 
    if(params.duration=="7Days"){
      dataFromServer.dataTable["7Days"].allRegion;
      if(params.score.length == 1){
        data = dataFromServer.dataTable["7Days"].score;
      }else{
        if(params.region && params.region.length<12){
          data = dataFromServer.dataTable["7Days"].region;
        }else{
          if(params.city){
            data = dataFromServer.dataTable["7Days"].city;
          }else{
            data = dataFromServer.dataTable["7Days"].allRegion;
          }

        }
      }

    }else{
      dataFromServer.dataTable["month"].allRegion;
      if(params.score.length == 1){
        data = dataFromServer.dataTable["month"].score;
      }else{
        if(params.region && params.region.length<12){
          data = dataFromServer.dataTable["month"].region;
        }else{
          if(params.city){
            data = dataFromServer.dataTable["month"].city;
          }else{
           data = dataFromServer.dataTable["month"].allRegion;
          }
        }
      }
    }
    let finalData = await this.restructionDataTable(data);
    return finalData;
  }

  restructionDataBar(data){
    let banks =[]
    let clients =[]
    let contracts =[]
    data.forEach(element => {
      banks.push(this.nameBanque(element.bank));
      clients.push(element.nbreClient);
      contracts.push(element.nbreContract);
    });
     return {categories: banks, clients: clients, contracts: contracts};
  }

  restructionDataTable(data){
   let restructedData=[];
    data.forEach(element => {
      let itm:any = {}
      itm.position= element.position,
      itm.concurrents= this.nameBanque(element.concurrents),
      itm.nbreclients= element.nbreclients,
      itm.tolnclients= element.tolnclients,
      itm.nbrecontracts= element.nbrecontracts,
      itm.tolncontracts= element.tolncontracts,
      itm.indiceclients= element.indiceclients,
      itm.indicecontracts= element.indicecontracts  
      restructedData.push(itm);   
    });
    // restructedData.sort((a:any, b:any) =>{
    //     return b.nbreclients - a.nbreclients;
    // });
    return restructedData;
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

}



