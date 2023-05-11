import { Component, OnInit } from '@angular/core';
import { TurnoService } from 'src/app/Service/turno.service';
import { Turno } from 'src/app/models/Turno';
import { Usuario } from 'src/app/models/Usuario';

@Component({
  selector: 'app-atender',
  templateUrl: './atender.component.html',
  styleUrls: ['./atender.component.css'],
})
export class AtenderComponent implements OnInit {
  constructor(private _turnoService: TurnoService) {}

  public turnoVacio = {
    id: null,
    codigo: null,
    modulo: null,
    fecha: null,
    fechaAsignado: null,
    tipoDocumento: null,
    numeroDocumento: null,
    primerNombre: null,
    segundoNombre: null,
    primerApellido: null,
    segundoApellido: null,
  };
  public turno = this.turnoVacio;
  public categoria = 'N/A';
  public turnoActual = false;
  public turnoEnCurso = false;

  ngOnInit(): void {
    let turnoActual = localStorage.getItem('TURNO');

    if (turnoActual) {
      this.turno = JSON.parse(turnoActual);
      this.turnoActual = true;
    }
  }

  siguienteTurno(): void {
    let modulo = sessionStorage.getItem('MODULO');
    if (!modulo) return;

    this._turnoService.asignar(modulo, this.categoria).subscribe((res) => {
      if (!res.error) {
        this.turno = res;
        this.turnoActual = true;
        localStorage.setItem('TURNO', JSON.stringify(this.turno));
      }
    });
  }

  actualizarEstado(estado: string): void {
    let modulo = sessionStorage.getItem('MODULO');
    let turno = localStorage.getItem('TURNO');
    if (!modulo || !turno) return;

    this._turnoService
      .actualizarEstado(JSON.parse(turno).id, modulo, estado)
      .subscribe((res) => {
        if (!res.error) {
          if (estado == 'En curso') {
            this.turnoActual = true;
            this.turnoEnCurso = true;
          } else {
            this.reiniciar();
          }
        }
      });
  }

  devolverAPendientes(): void {
    let modulo = sessionStorage.getItem('MODULO');
    let turno = localStorage.getItem('TURNO');
    if (!modulo || !turno) return;

    this._turnoService
      .devolverAPendientes(JSON.parse(turno).id)
      .subscribe((res) => {
        if (!res.error) {
          this.reiniciar();
        }
      });
  }

  reiniciar(): void {
    this.turnoActual = false;
    this.turnoEnCurso = false;
    localStorage.removeItem('TURNO');
    this.turno = this.turnoVacio;
  }
}
