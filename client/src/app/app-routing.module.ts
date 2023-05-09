import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VizualizarTurnosComponent } from './Components/vizualizar-turnos/vizualizar-turnos.component';
import { GestionTurnosComponent } from './Components/gestion-turnos/gestion-turnos.component';
import { RegistroTurnosComponent } from './Components/registro-turnos/registro-turnos.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/Registro',
    pathMatch: 'full',
  },
  { path: 'Turnos', component: VizualizarTurnosComponent },
  { path: 'Gestion', component: GestionTurnosComponent },
  { path: 'Registro', component: RegistroTurnosComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
