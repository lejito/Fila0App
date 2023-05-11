import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { GestionTurnosComponent } from './Components/gestion-turnos/gestion-turnos.component';
import { RegistroTurnosComponent } from './Components/registro-turnos/registro-turnos.component';
import { VizualizarTurnosComponent } from './Components/vizualizar-turnos/vizualizar-turnos.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PendientesComponent } from './Components/pendientes/pendientes.component';
import { AtenderComponent } from './Components/atender/atender.component';
import { CompletadosComponent } from './Components/completados/completados.component';
import { CanceladosComponent } from './Components/cancelados/cancelados.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    VizualizarTurnosComponent,
    RegistroTurnosComponent,
    GestionTurnosComponent,
    PendientesComponent,
    AtenderComponent,
    CompletadosComponent,
    CanceladosComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [],
})
export class AppModule {}
