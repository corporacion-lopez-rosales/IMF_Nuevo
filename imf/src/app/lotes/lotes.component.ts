import {Component,OnInit,ChangeDetectorRef,OnDestroy} from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import {Router} from '@angular/router';
import {MatTableDataSource} from '@angular/material';
import * as XLSX from 'xlsx';
//servicios 
import {ExcelService} from '../excel.service';
import {ServiciosService} from '../servicios.service';
import {UtilsService} from '../utils.service'

@Component({
  selector: 'app-lotes',
  templateUrl: './lotes.component.html',
  styleUrls: ['./lotes.component.scss']
})
export class LotesComponent implements OnInit {
  mobileQuery:MediaQueryList;
  private _mobileQueryListener:()=>void;
  
  constructor(private Http:ServiciosService,private router:Router,changeDetectorRef: ChangeDetectorRef, media: MediaMatcher,public excel:ExcelService,public util:UtilsService)
  {
  this.mobileQuery = media.matchMedia('(max-width: 1600px)');
  this._mobileQueryListener = () => changeDetectorRef.detectChanges();
  this.mobileQuery.addListener(this._mobileQueryListener);
  }
  displayedColumns = ['id','no_parcela','description','nombre','Exportar','Importar'];
  dataSource:any;

  datos;
  long;
  Importar;
  manzanaEt;
  Parcela;
  
  matriz:any[]=[{id:null,idP:null,noPar:null,des:null,mun:null}]
  arreglo:any={
    NumLote:null,
    manzana:null,
    id_parcela:null,
   // no_parcela:null,
    description:null,
   // idMun:null,
    municipio:null,
    idPro:null,
    proveedor:null,
    medidas:null,
    norte:null,
    sur:null,
    este:null,
    oeste:null,
    Status:null
  };

  ngOnInit() {
    this.renderTable();
  }

  renderTable(){
    this.Http.Lotes().subscribe(result=>{
      this.dataSource=new MatTableDataSource();
      this.dataSource.data=result;
    },
    error=>{
      console.log(<any>error);
    })
  }

  getInf(element){
    this.datos=element;
    this.long=element.cantidadLotes;
    this.rellenado();
  }

  getParcela(element){
    this.Parcela=element.no_parcela;
  }

  rellenado(){
    for(var i=0; i<this.long;i++)
    {
      this.matriz[i]=[
        this.arreglo.numLote="",
        this.arreglo.manzana="",
        this.arreglo.id_parcela=parseInt(this.datos.id),
        //this.arreglo.no_parcela=parseInt(this.x.no_parcela),
        this.arreglo.description=this.datos.description,
       // this.arreglo.idMun=parseInt(this.x.id_municipio),
        this.arreglo.municipio=this.datos.municipio,
        this.arreglo.idPro=this.datos.nombre,
        this.arreglo.medidas=0,
        this.arreglo.norte="",
        this.arreglo.sur="",
        this.arreglo.este="",
        this.arreglo.oeste="",
        this.arreglo.Status="libre"
      ];
    }
    this.exportar();
  }

  exportar(){
    this.excel.addWorksheet(this.matriz,this.datos.no_parcela);
  }
 
  onFileChange(evt:any){
    const target:DataTransfer=<DataTransfer>(evt.target);
    if(target.files.length !== 1) throw new Error('Solo puede subir un archivo a la ves');
    const reader:FileReader = new FileReader();
    reader.onload = (e: any) => {
      const bstr:string = e.target.result;
      const wb:XLSX.WorkBook = XLSX.read(bstr,{type:'binary'});
      const wsname:string=wb.SheetNames[0];
      if(this.Parcela !== wsname){
        this.util.openSnackbar(`Este documento pertenece a ${this.Parcela}`,"Aceptar");
      }
      else{
        const ws:XLSX.WorkSheet=wb.Sheets[wsname];
        this.Importar = <any>(XLSX.utils.sheet_to_json(ws,{header:1}));
        this.Importar.shift();
        this.Importar.forEach(element => {
          var Lote={
            id_lotes:element[0],
            id_manzana:element[1],
            id_colin:element[2],
            medidas:element[6],
            norte:element[7],
            sur:element[8],
            este:element[9],
            oeste:element[10],
            id_status:element[11]
          }
          if(Lote.id_status=="libre"){
            Lote.id_status=1;
          }
          if(this.manzanaEt != Lote.id_manzana){
            this.manzanaEt=Lote.id_manzana
            var manzana={
              id_colin:Lote.id_colin,
              id_manzana:this.manzanaEt
            }
            this.SubirManzana(manzana);
            this.SubirLote(Lote);
          }
          else{
            this.SubirLote(Lote);
          }
        });
        this.util.openSnackbar("Se a registradon todos los lotes","Aceptar");
      }
    };
    reader.readAsBinaryString(target.files[0]);//esta funcion lo combierte en string de quitarla no podras imprimir nada ni en consola 
  }

  SubirLote(Lote){
    this.Http.altaLotes(Lote).subscribe(result=>{
      console.log(result);
    },
    error=>{
      console.log(<any>error);
    })
  }

  SubirManzana(manzana){
    this.Http.altaManzana(manzana).subscribe(result=>{
      console.log(result);
    },
    error=>{
      console.log(<any>error);
    })
  }
}
