import { Injectable } from '@angular/core';
import * as ListToExport from '../../../../data/loanComingToTerm/listExport/list.json'
import * as XLSX from 'xlsx';


@Injectable({
  providedIn: 'root'
})
export class ExportService {

  constructor() { }

  exportList(params){
    console.log(ListToExport)
    const workBook = XLSX.utils.book_new(); 
    workBook.Props = {};
    workBook.Props.Title = "Liste Crédits Arrivant à Échéances";
    workBook.Custprops = {};
    workBook.Custprops["Custom Property"] = "Custom Value";
    let dt=[
     { titre: "Liste Crédits Arrivant Échéances"},
     { Score: "Élite, Ulimate"},
    ]
    const workSheet = XLSX.utils.json_to_sheet(ListToExport.data);
    // const workSheet = XLSX.utils.json_to_sheet(dt);
    XLSX.utils.book_append_sheet(workBook, workSheet, 'Crédits'); 
 
    XLSX.writeFile(workBook, 'ListeCréditsArrivantÉchéances.xlsx'); 
  }


}
