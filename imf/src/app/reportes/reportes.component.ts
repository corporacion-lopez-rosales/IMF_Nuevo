import { Component, OnInit,ChangeDetectorRef,OnDestroy } from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import {Router} from '@angular/router';
import * as moment from 'moment';
import html2pdf from 'html2pdf.js'
import {UtilsService} from '../utils.service';
import {ServiciosService} from '../servicios.service';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.scss']
})
export class ReportesComponent implements OnInit {
  mobileQuery:MediaQueryList;
  private _mobileQueryListener:()=>void;
  constructor(private Http:ServiciosService,private router:Router,changeDetectorRef: ChangeDetectorRef, media: MediaMatcher,public util:UtilsService)
  {
    this.mobileQuery = media.matchMedia('(max-width: 1600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }
  fechaG;
  no_parcelaG;
  Reporte;
  temporal;
  sumaMedidas=0;
  sumaTotal=0;
  totalLotes=0;

  Parrafo={id:null,Proveedor:null,no_parcela:null,Manzanas:null,cantidadLotes:null,Municipio:null,desc_par:null,vendible:null,areampa:null,areavial:null,medidas:null,fecha_alta:null};
  Array={Lote:null,Medida:null,PrecioUnitario:null,VentaTotal:null,CostoUnitario:null,CostoTotal:null,No:null,NombreS:null};
  Matriz:any[]=[];

  ngOnDestroy(){
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  ngOnInit() {
    var fecha = new Date();
    var mes = fecha.getMonth()+1;
    var dia = fecha.getDate();
    var year = fecha.getFullYear();
    if(mes<10 && dia<10){
      this.fechaG=`0${dia}/0${mes}/${year}`;
    }
    else if(dia<10){
      this.fechaG=`0${dia}/${mes}/${year}`;
    }
    else 
      this.fechaG=`${dia}/0${mes}/${year}`;
  }

  evento(event){
    event.preventDefault();
    const target = event.target;
    this.no_parcelaG = target.querySelector('#parcela').value;
    this.InfParrafo();
  }

  InfParrafo(){
    this.Http.ReporteGen(this.no_parcelaG).subscribe(result=>{
      this.Reporte=Array(result);
      this.Reporte.forEach(element => {
        element.forEach(datos=>{
          this.Parrafo={
            id:datos.id,
            Proveedor:datos.Proveedor,
            no_parcela:datos.no_parcela,
            Manzanas:datos.Manzanas,
            cantidadLotes:datos.cantidadLotes,
            Municipio:datos.Municipio,
            desc_par:datos.desc_par,
            vendible:datos.vendible,
            areampa:datos.areampa,
            areavial:datos.areavial,
            medidas:datos.medidas,
            fecha_alta:moment(datos.fecha_alta).format("YYYY-MM-DD")
          }
        }) 
      });
      console.log(this.Parrafo);
      this.InfTable();
    },
    error=>{
      console.log(<any>error);
    });
  //  this.InfTable();
  }

  InfTable(){
    this.Http.ReporteTab(this.no_parcelaG).subscribe(result=>{
      this.temporal=result;
      this.ArmadoTable();
    },
    error=>{
      console.log(<any>error);
    });
   // this.ArmadoTable();
  }


  ArmadoTable(){
    this.temporal.forEach(element=>{
      this.totalLotes++
      this.Array={
        Lote:element.id_lotes,
        Medida:element.medidas,
        PrecioUnitario:0,
        VentaTotal:0,
        CostoUnitario:2,
        CostoTotal:element.Costo_Total,
        No:element.id_status,
        NombreS:element.descripcion
      }
      console.log(this.Array);
      this.sumaMedidas=this.sumaMedidas+parseFloat(this.Array.Medida);
      this.sumaTotal=this.sumaTotal+parseFloat(this.Array.CostoTotal);
      this.Matriz.push(this.Array);
    });
  }

  CrearPDF(){
    var element = document.getElementById("pdf");
    var opt={
      margin:1,
      filename:`IMF_${this.Parrafo.no_parcela}_${this.fechaG}`,
      image:{type:'jpeg',quality:0.98},
      html2canvas:{scale:2},
      jsPDF:{unit:'mm',format:'a3'} 
    };
    html2pdf().set(opt).from(element).save();
  }

  Borrar(){
    this.no_parcelaG=null;
    this.Matriz=[];
    this.Parrafo={id:null,Proveedor:null,no_parcela:null,Manzanas:null,cantidadLotes:null,Municipio:null,desc_par:null,vendible:null,areampa:null,areavial:null,medidas:null,fecha_alta:null};
    this.Array={Lote:null,Medida:null,PrecioUnitario:null,VentaTotal:null,CostoUnitario:null,CostoTotal:null,No:null,NombreS:null};  
    this.sumaMedidas=0;
    this.sumaTotal=0;
    this.totalLotes=0;
  }

}
