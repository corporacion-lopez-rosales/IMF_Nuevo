import {Component,OnInit,ChangeDetectorRef,OnDestroy} from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import {Router} from '@angular/router';
import {Form} from '@angular/forms';
import {NumeralPipe} from 'ngx-numeral';
import {ServiciosService} from '../servicios.service';

//interfaces y modelos para clases
import {Proveedor} from '../Modelos/Proveedor';
import {UtilsService} from '../utils.service'
import {Parcela} from '../Modelos/Parcela';
import {Municipio} from '../Modelos/IntMunicipio';
import {Tipo} from '../Modelos/intTipo';
import {Forma} from '../Modelos/IntForma';


@Component({
  selector: 'app-creaparcela',
  templateUrl: './creaparcela.component.html',
  styleUrls: ['./creaparcela.component.scss']
})
export class CreaparcelaComponent implements OnInit {
  mobileQuery:MediaQueryList;
  private _mobileQueryListener:()=>void;

  public parcela:Parcela;
  public proveedor:Proveedor;

  constructor(private Http:ServiciosService,private router:Router,changeDetectorRef: ChangeDetectorRef, media: MediaMatcher,public util:UtilsService)
   { 
    this.mobileQuery = media.matchMedia('(max-width: 1600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);

    this.parcela = new Parcela(0,0,'','','','','','','','','',"",0,0,0,this.x,0,0);
    this.proveedor = new Proveedor('','','','','');
   }

   x=this.Http.showID();
   nomP;
   ArrayPro;
   formatonum;

  mun:Municipio[]=[
    {value:1,viewValue:'Montemorelos'},
    {value:2,viewValue:'Cadereyta'},
    {value:3,viewValue:'Salinas'},
    {value:4,viewValue:'Saltillo'}
  ]
  tipo:Tipo[]=[
    {value:1,viewValue:'Fracionamiento'},
    {value:2,viewValue:'Co-propiedad'}
  ]

  formt:Forma[]=[
    {value:1,viewValue:'Comprada'},
    {value:2,viewValue:'Consignada'}
  ]

  ngOnInit() {
  }

  ngOnDestroy(){
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  formato(){
    this.formatonum=new NumeralPipe(this.parcela.valor_compra).format('$0,0');
    this.parcela.valor_compra=this.formatonum;
  }

  altaparcela(ng:Form){
    console.log(this.parcela);
    this.Http.altaParcela(this.parcela).subscribe(result=>{
      console.log(result);
      this.util.openSnackbar("Parcela registrada",`Aceptar ${this.router.navigate(['parcela'])}`)
    },
    error=>{
      this.util.openSnackbar("Error","Aceptar");
      console.log(<any>error);
    })
  }

  altaProveedor(ng:Form){
    this.Http.altaProveedor(this.proveedor).subscribe(result=>{
      this.nomP=this.proveedor.nombre;
      this.util.openSnackbar("Proveedor registrado","Aceptar");
    },
    error=>{
      this.util.openSnackbar("Error","ok");
      console.log(<any>error);
    });
    this.obtenerPro();
  }

  obtenerPro(){
    console.log("Proveedor");
    this.Http.proveedorget().subscribe(result=>{
      this.ArrayPro=Array(result);
      var long=this.ArrayPro[0].length;
      for(var i=0; i<long; i++){
        if(result[i]['nombre']==this.proveedor.nombre){
          this.parcela.id_proveedor=result[i]['id_proveedor']
          console.log(this.parcela.id_proveedor);
        }
      }
    },
    error=>{
      console.log(<any>error);
    })
  }
}


