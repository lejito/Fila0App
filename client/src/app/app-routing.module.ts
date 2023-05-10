import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VizualizarTurnosComponent } from './Components/vizualizar-turnos/vizualizar-turnos.component';
import { GestionTurnosComponent } from './Components/gestion-turnos/gestion-turnos.component';
import { RegistroTurnosComponent } from './Components/registro-turnos/registro-turnos.component';
import { PendientesComponent } from './components/pendientes/pendientes.component';
import { AtenderComponent } from './Components/atender/atender.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/Registro',
    pathMatch: 'full',
  },
  { path: 'Turnos', component: VizualizarTurnosComponent },
  {
    path: 'Gestion',
    component: GestionTurnosComponent,
    children: [
      { path: 'Pendientes', component: PendientesComponent },
      { path: 'Atender', component: AtenderComponent },
    ],
  },
  { path: 'Registro', component: RegistroTurnosComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
