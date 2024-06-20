import { Injectable } from '@angular/core';
import * as ListToExport from '../../../../data/vd-al/listExport/list.json'
import * as XLSX from 'xlsx';


@Injectable({
  providedIn: 'root'
})



export class ExportService {

  constructor() { }

  exportList(setting){
    console.log(ListToExport)
    const workBook = XLSX.utils.book_new(); 
    workBook.Props = {};
    workBook.Props.Title = "Liste des Agences Vélocité de Décision Demande et Autorisaton pour la banque "+setting.bank;
    workBook.Custprops = {};
    workBook.Custprops["Custom Property"] = "Custom Value";
    let dt=[
     { titre: " Vélocité de Décision Demande et Autorisaton"},
     { Score: "Élite, Ulimate"},
    ]
    const workSheet = XLSX.utils.json_to_sheet(ListToExport.data);
    // const workSheet = XLSX.utils.json_to_sheet(dt);
    XLSX.utils.book_append_sheet(workBook, workSheet, 'Crédits'); 
 
    XLSX.writeFile(workBook, 'ListeAgenceVelociteDecisionDA.xlsx'); 
  }


}
