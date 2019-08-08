import { Component, OnInit } from '@angular/core';
import {ServiciosService} from '../servicios.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  //Variables globales
  username;
  password;
  login;

  constructor(private Http:ServiciosService,private router:Router) { }

  ngOnInit() {
  }

  servicio(){
    this.Http.login().subscribe(result=>{
      console.log(result);
      this.login=Array(result);
      console.log(this.login);
      var long = this.login[0].length;
      for(var i=0; i<long; i++){
          if(result[i]['username']==this.username && result[i]['password']==this.password)
          {
            if(result[i]['user_group_id']==4)
            {
              window.location.href=`http://crm.inmobiliariaimf.com/index.php?route=common/login&username=${this.username}&password=${this.password}`
            }
            else
            {
              this.id(result[i]['user_id']);
              this.router.navigate(['']);
            }
          }
      }
    },
    error=>{
      console.log(<any>error);
    });
  }

  ingresar(event){
    event.preventDefault();
    const target = event.target;
    this.username=target.querySelector('#username').value;
    this.password=target.querySelector('#password').value
    this.servicio();
  }
      

  id(id){
    this.Http.getId(id);
  }



}
