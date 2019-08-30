import {Component,OnInit,ChangeDetectorRef,OnDestroy} from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import {ServiciosService} from '../servicios.service';
import {Router} from '@angular/router';
import {MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-parcela',
  templateUrl: './parcela.component.html',
  styleUrls: ['./parcela.component.scss']
})
export class ParcelaComponent implements OnInit {
  mobileQuery:MediaQueryList;
  private _mobileQueryListener:()=>void;
  
  constructor(private Http:ServiciosService,private router:Router,changeDetectorRef: ChangeDetectorRef, media: MediaMatcher)
   { 
    this.mobileQuery = media.matchMedia('(max-width: 1600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
   }
  
  displayedColumns = ['id', 'no_parcela','medidas','description','valor_compra','firstname','nombre','fecha_alta','Modificar'];
  dataSource:any;
  
  ngOnInit() {
    this.renderTable();
  }

  editar(row){
   this.Http.getForm(row);
  }

  Nuevo(){
    this.router.navigate(['parcela/crear']);
  }

  salir(){
    window.location.reload();
  }

  renderTable(){
    this.Http.showParcela().subscribe(result=>{
      this.dataSource=new MatTableDataSource();
      this.dataSource.data=result;
      console.log(result);
    },
    error=>{
      console.log(<any>error);
    })
  }

  Filter(filterValue:string){
    filterValue=filterValue.trim().toLowerCase();
    this.dataSource.filter=filterValue;
  }

}
