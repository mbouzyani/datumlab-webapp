import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DvMapService {
  serverDataMap:any = {
    BMK: {value: 9500, rayon: 20, opacity: 1, agency: "alalia", color: "#4e4ef3", vd:"10-15"},
    CS: {value: 20000, rayon: 40, opacity: 1, agency: "hay hassni", color: "#fae1e1", vd:"15-20"},
    DOED: {value: 6900, rayon: 20, opacity: 1, agency: "wlad marzeg", color: "#fac8c8", vd:"15-20"},
    DT: {value: 7600, rayon: 20, opacity: 1, agency: "wad eddahab", color: "#fa9696", vd:"20-25"},
    FM: {value: 13000, rayon: 26, opacity: 1, agency: "maarif", color: "#fa7d7d", vd:"25-30"},
    GON: {value: 6100, rayon: 20, opacity: 1, agency: "assila", color: "#fa6464", vd:"25-30"},
    LSEH: {value: 7500, rayon: 20, opacity: 1, agency: "BANK AL YOUSR", color: "#fa4b4b", vd:"30-35"},
    MS: {value: 15000, rayon: 30, opacity: 1, agency: "CGF BANK", color: "#fa3232", vd:"45-50"},
    OR: {value: 12000, rayon: 24, opacity: 1, agency: "BMCI", color: "#4e4ef3", vd:"10-15"},
    RSK: {value: 9000, rayon: 20, opacity: 1, agency: "BMCE BANK", color: "#fa7d7d", vd:"45-50"},
    SM: {value: 8200, rayon: 20, opacity: 1, agency: "UMNIA Bank", color: "#fa3232", vd:"45-50"},
    TTALH: {value: 12000, rayon: 24, opacity: 1, agency: "ATTIJARIWAFA BANK", color: "#fac8c8", vd:"20-25"}
  }
  detailsDataMap={
    elite: [145, 245, 145, 454, 545, 255, 255, 155],
    ultime: [120, 245, 145, 354, 445, 155, 255, 122],
    prime: [110, 225, 125, 334, 425, 255, 222, 111],
    pie:{totale: 9200,accepted: 6000,rejected: 30}
  }

  constructor() { }

  getData(dataToSend){
    return this.serverDataMap;
  }


  getDetailsRegion(dataToSend){
    return this.detailsDataMap;
  }
}
