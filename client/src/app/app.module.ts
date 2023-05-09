import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { GestionTurnosComponent } from './Components/gestion-turnos/gestion-turnos.component';
import { RegistroTurnosComponent } from './Components/registro-turnos/registro-turnos.component';
import { VizualizarTurnosComponent } from './Components/vizualizar-turnos/vizualizar-turnos.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    VizualizarTurnosComponent,
    RegistroTurnosComponent,
    GestionTurnosComponent,
  ],
  imports: [BrowserModule, AppRoutingModule,FormsModule],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [],
})
export class AppModule {}
