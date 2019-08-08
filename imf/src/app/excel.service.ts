import { Injectable } from '@angular/core';
import * as Excel from 'exceljs/dist/exceljs.min.js';
import * as ExcelProper from 'exceljs';
import * as fs from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class ExcelService {
  constructor() { }

  addWorksheet(data:any[],no_parcela:any){
    const header=["Numero lote","Manzana","Id Parcela","Tipo Fracionamiento","Municipio","Proveedor","Medidas","Norte","Sur","Este","Oeste","Estatus"];
    let workbook:ExcelProper.Workbook= new Excel.Workbook();
    let worksheet=workbook.addWorksheet(`${no_parcela}`);
    worksheet.addRow([]);
    let headerRow=worksheet.addRow(header);
    headerRow.eachCell((cell,Number)=>{
      cell.fill={
        type:'pattern',
        pattern:'solid',
        fgColor:{argb:'FFFFFF00'},
        bgColor:{argb:'FF0000FF'}
      }
      cell.border={top:{style:'thin'},left:{style:'thin'},bottom:{style:'thin'},right:{style:'thin'}}
    });
    data.forEach(d=>{
      let row=worksheet.addRow(d);
      row.font={name:'Arial',family:4,size:12};
    });
    worksheet.getColumn(1).width=15;
    worksheet.getColumn(4).width=30;
    worksheet.getColumn(5).width=15;
    worksheet.getColumn(6).width=20;

    workbook.xlsx.writeBuffer().then((data=>{
      let blob=new Blob([data],{type:'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
      fs.saveAs(blob,`Parcela_${no_parcela}`);
    }))
  }
}
