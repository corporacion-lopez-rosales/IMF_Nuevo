//importacion de componentes para hacer un router
import {ModuleWithProviders} from '@angular/core';
import {Routes,RouterModule} from '@angular/router';

//importar componentes
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import {ParcelaComponent} from './parcela/parcela.component';
import {CreaparcelaComponent} from './creaparcela/creaparcela.component';
import {UpdateParcelaComponent} from './update-parcela/update-parcela.component';
import {MedidasTabComponent} from './medidas-tab/medidas-tab.component';
import {CrearMedidasComponent} from './crear-medidas/crear-medidas.component';
import {LotesComponent} from './lotes/lotes.component';
import {ReportesComponent} from './reportes/reportes.component';
//Array de rutas 
const appRoutes:Routes=[
    {path:'',component:HomeComponent},
    {path:'login',component:LoginComponent},
    {path:'parcela',component:ParcelaComponent},
    {path:'parcela/crear',component:CreaparcelaComponent},
    {path:'parcela/update',component:UpdateParcelaComponent},
    {path:'medidas',component:MedidasTabComponent},
    {path:'medidas/crea',component:CrearMedidasComponent},
    {path:'lotes',component:LotesComponent},
    {path:'reportes',component:ReportesComponent},
    {path:'**',component:HomeComponent}
]; 


//export router
export const appRoutingProviders:any[]=[];
export const routing:ModuleWithProviders = RouterModule.forRoot(appRoutes)