//componentes.ts
import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import {ParcelaComponent} from './parcela/parcela.component';
import {CreaparcelaComponent} from './creaparcela/creaparcela.component';
import {routing,appRoutingProviders} from './app.routing'
//Angular component
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatNativeDateModule} from '@angular/material';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule,CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';
import {MatInputModule} from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';
import {MatTabsModule} from '@angular/material/tabs';
import {MatSelectModule} from '@angular/material/select';
import {FormsModule,ReactiveFormsModule}from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatSnackBarModule} from '@angular/material/snack-bar';
//modulo para servicios
import {HttpClientModule} from '@angular/common/http';
import { UpdateParcelaComponent } from './update-parcela/update-parcela.component';
import { MedidasTabComponent } from './medidas-tab/medidas-tab.component';
import { CrearMedidasComponent } from './crear-medidas/crear-medidas.component';
import { LotesComponent } from './lotes/lotes.component';
import { ReportesComponent } from './reportes/reportes.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    ParcelaComponent,
    CreaparcelaComponent,
    UpdateParcelaComponent,
    MedidasTabComponent,
    CrearMedidasComponent,
    LotesComponent,
    ReportesComponent
  ],
  imports: [
    BrowserModule,routing,BrowserAnimationsModule,MatButtonModule,MatSidenavModule,MatInputModule,MatFormFieldModule,MatTableModule,MatNativeDateModule,
    MatIconModule,MatToolbarModule,MatListModule,HttpClientModule,MatTabsModule,MatSelectModule,FormsModule,ReactiveFormsModule,MatDatepickerModule,MatSnackBarModule
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    appRoutingProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
