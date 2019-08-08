import {Component,OnInit,ChangeDetectorRef,OnDestroy} from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import {ServiciosService} from '../servicios.service';
import {Router} from '@angular/router';
import {MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-medidas-tab',
  templateUrl: './medidas-tab.component.html',
  styleUrls: ['./medidas-tab.component.scss']
})
export class MedidasTabComponent implements OnInit {
  mobileQuery:MediaQueryList;
  private _mobileQueryListener:()=>void;
  constructor(private Http:ServiciosService,private router:Router,changeDetectorRef: ChangeDetectorRef, media: MediaMatcher)
  {
    this.mobileQuery = media.matchMedia('(max-width: 1600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }
  
  displayedColumns = ['id', 'no_parcela','medidas','nombre','Municipio','Modificar'];
  dataSource:any;



  ngOnInit() {
    this.renderTable();
  }

  renderTable(){
    this.Http.Medidas().subscribe(result=>{
      console.log(result);
      this.dataSource=new MatTableDataSource();
      this.dataSource.data=result;
    },error=>{
      console.log(<any>error);
    })
  }

  editar(element){
    this.Http.getForm(element);
  }

}
