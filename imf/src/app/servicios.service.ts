import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServiciosService {
  //Variables que atrapan datos como variable de session y para pasar datos a otros lados
  session;
  datos;

  //Variable que representa el url al que apuntan los servicios 
  public url="http://crm.inmobiliariaimf.com/WebServices/index.php/Actualizado/"
  
  
  constructor(private http:HttpClient) { }
  
  //Servicios generales
  login(){
    return this.http.get(`${this.url}login`);
  }

  showParcela(){
    return this.http.get(`${this.url}tabla`);
  }

  altaParcela(parcela){
    return this.http.post(`${this.url}post`,JSON.stringify(parcela));
  }

  updateParcela(parcela){
    return this.http.post(`${this.url}update2`,JSON.stringify(parcela));
  }

  altaProveedor(proveedor){
    return this.http.post(`${this.url}proveedor`,JSON.stringify(proveedor));
  }

  proveedorget(){
    return this.http.get(`${this.url}getProv`);
  }

  Medidas(){
    return this.http.get(`${this.url}tabla`);
  }

  MedidasCrea(Medida){
    return this.http.post(`${this.url}intermedio`,JSON.stringify(Medida));
  }

  Lotes(){
    return this.http.get(`${this.url}excel`);
  }

  altaLotes(lotes){
    return this.http.post(`${this.url}excelInsert`,JSON.stringify(lotes));
  }

  altaManzana(manzana){
    return this.http.post(`${this.url}Manzana`,JSON.stringify(manzana));
  }

  ReporteGen(no_parcela){
    return this.http.post(`${this.url}Reporteinf/${no_parcela}`,JSON.stringify(no_parcela));
  }

  ReporteTab(no_parcela){
    return this.http.post(`${this.url}ReporteTabla/${no_parcela}`,JSON.stringify(no_parcela));
  }

  //metodos para obtener variable de session 

  getId(id){
    this.session=id;
    this.showID();
  }

  showID(){
    return this.session;
  }

  //metodos para actualizar 

  getForm(x){
    this.datos=x;
    console.log(this.datos);
  }

  showinf(){
    return this.datos;
  }
}
