import {Component, OnInit,OnDestroy,ChangeDetectorRef } from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import {MatSnackBar} from '@angular/material/snack-bar';
import {NgForm} from '@angular/forms'
import {Router} from '@angular/router';

import {ServiciosService} from '../servicios.service';
import * as moment from 'moment';
import {NumeralPipe} from 'ngx-numeral';

@Component({
  selector: 'app-update-parcela',
  templateUrl: './update-parcela.component.html',
  styleUrls: ['./update-parcela.component.scss']
})
export class UpdateParcelaComponent implements OnInit {
  mobileQuery:MediaQueryList;
  private _mobileQueryListener:()=>void;
  mun:Municipio[]=[
    {value:"1",viewValue:'Montemorelos'},
    {value:"2",viewValue:'Cadereyta'},
    {value:"3",viewValue:'Salinas'},
    {value:"4",viewValue:'Saltillo'}
  ]
  tipo:Tipo[]=[
    {value:"1",viewValue:'Fracionamiento'},
    {value:"2",viewValue:'Co-propiedad'}
  ]

  for:Forma[]=[
    {value:"1",viewValue:'Comprada'},
    {value:"2",viewValue:'Consignada'}
  ]

  parcela={
    id:null,
    no_parcela:null,
    id_tipo:null,
    desc_par:null,
    norte:null,
    sur:null,
    este:null,
    oeste:null,
    noreste:null,
    noroeste:null,
    sureste:null,
    suroeste:null,
    fecha_alta:null,
    id_municipio:null,
    id_proveedor:null,
    medidas:null,
    user_id:null,
    valor_compra:null,
    forma:null
  }
 
  x;
  constructor(private Http:ServiciosService,private router:Router,changeDetectorRef: ChangeDetectorRef, media: MediaMatcher,private _snackBar:MatSnackBar) 
  {
    this.mobileQuery = media.matchMedia('(max-width: 1600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }
  
  ngOnDestroy(){
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  openSnackbar(message:string,action:string){
    this._snackBar.open(message,action,{
      duration:4000,
    })
  }

  ngOnInit() {
    this.x=this.Http.showinf();
    console.log(this.x.desc_par);
    console.log("----------------");
    var format = new NumeralPipe(this.x.valor_compra).format('$0,0');
    this.parcela={
      id:this.x.id,
      no_parcela:this.x.no_parcela,
      id_tipo:this.x.id_tipo,
      desc_par:this.x.desc_par,
      norte:this.x.norte,
      sur:this.x.sur,
      este:this.x.este,
      oeste:this.x.oeste,
      noreste:this.x.noreste,
      noroeste:this.x.noreste,
      sureste:this.x.sureste,
      suroeste:this.x.suroeste,
      fecha_alta:moment(this.x.fecha_alta).format("YYYY-MM-DD"),
      id_municipio:this.x.id_municipio,
      id_proveedor:this.x.id_proveedor,
      medidas:this.x.medidas,
      user_id:this.x.user_id,
      valor_compra:format,
      forma:this.x.forma
    }
    console.log(this.parcela.desc_par);
  }

  Actualizar(form:NgForm){
    this.Http.updateParcela(this.parcela).subscribe(result=>{
      this.openSnackbar("Parcela actualizaca",`Aceptar ${this.router.navigate(['parcela'])}`);
      console.log(result);
    },
    error=>{
      console.log(<any>error)
      this.openSnackbar("Algo salio mal","Error");
    })
  }

}

export interface Municipio
{
  value:string;
  viewValue:string;
}

export interface Tipo 
{
  value:string;
  viewValue:string;
}

export interface Forma
{
  value:string;
  viewValue:string;
}

