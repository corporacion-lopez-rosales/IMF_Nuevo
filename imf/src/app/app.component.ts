import { Component,OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {ServiciosService} from './servicios.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(public http:ServiciosService,public router:Router){}
  session;

  ngOnInit(){
    this.session=this.http.showID();
    if(this.session==undefined){
      this.router.navigate(['login'])
    }
  }
}
