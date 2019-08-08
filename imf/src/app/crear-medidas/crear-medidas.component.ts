import {Component,OnInit,ChangeDetectorRef,OnDestroy} from '@angular/core';;
import {MediaMatcher} from '@angular/cdk/layout';
import {Router} from '@angular/router';
import {Form} from '@angular/forms';
import {NumeralPipe} from 'ngx-numeral';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ServiciosService} from '../servicios.service';
import {Medidas} from '../Modelos/Medidas';

@Component({
  selector: 'app-crear-medidas',
  templateUrl: './crear-medidas.component.html',
  styleUrls: ['./crear-medidas.component.scss']
})
export class CrearMedidasComponent implements OnInit {
  mobileQuery:MediaQueryList;
  private _mobileQueryListener:()=>void;

  constructor(private Http:ServiciosService,private router:Router,changeDetectorRef: ChangeDetectorRef, media: MediaMatcher,private _snackBar:MatSnackBar)
  {
    this.mobileQuery = media.matchMedia('(max-width: 1600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }
  Medidas:Medidas;
  x;
  total1;
  totalLotes;
  lotesC;
  LotesMun;

  M2AV; //Area vendible
  M2AM; //Area municipal
  M2AVi; //Area vial
  M2Tol; //Total en metros cuadrados
  M2HA;  //Hectarias adquiridas en metros cuadrados

  ngOnInit() {
    this.x=this.Http.showinf();
    this.Medidas={
      id_colin:this.x.id,
      vendible:0,
      areampa:0,
      areavial:0,
      cantidadLotes:0,
      observacion:"" 
    }
    this.M2HA=new NumeralPipe(this.x.medidas*10000).format('0,0.0000');
  }

  total(){
    this.total1=(this.Medidas.vendible + this.Medidas.areampa + this.Medidas.areavial).toFixed(7);
    this.totalLotes=this.lotesC + this.LotesMun;
    this.Medidas.cantidadLotes=this.totalLotes;
    this.conversion();
  }

  conversion(){
    this.M2AV=new NumeralPipe(this.Medidas.vendible*10000).format('0,0.0000');
    this.M2AM=new NumeralPipe(this.Medidas.areampa*10000).format('0,0.0000');
    this.M2AVi=new NumeralPipe(this.Medidas.areavial*10000).format('0,0.0000');
    this.M2Tol=new NumeralPipe(this.total1*10000).format('0,0.0000');


  }

  openSnackbar(message:string,action:string){
    this._snackBar.open(message,action,{
      duration:4000,
    })
  }

  onSubmit(ng:Form){
    console.log(this.Medidas);
    if(this.M2Tol==this.M2HA)
    {
      this.Http.MedidasCrea(this.Medidas).subscribe(result=>{
        console.log(result);
        this.openSnackbar("Medidas ajustadas",`Aceptar${this.router.navigate(['medidas'])}`);
      },
      error=>{
        console.log(<any>error);
      })
    }
    else{
      this.openSnackbar("Revise las medidas",'Aceptar');
    }
  }




}


