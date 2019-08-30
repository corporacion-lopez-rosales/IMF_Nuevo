import { Injectable } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(public _snackBar:MatSnackBar,public router:Router) { }

  openSnackbar(message:string,action:string){
    this._snackBar.open(message,action,{
      duration:4000,
    })
  }

  navegar(x:string){
    this.router.navigate([`/${x}`]);
  }

}
