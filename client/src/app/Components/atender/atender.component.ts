import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/Service/alert.service';
import { TurnoService } from 'src/app/Service/turno.service';
import { Turno } from 'src/app/models/Turno';
import { Usuario } from 'src/app/models/Usuario';

@Component({
  selector: 'app-atender',
  templateUrl: './atender.component.html',
  styleUrls: ['./atender.component.css'],
})
export class AtenderComponent implements OnInit {
  constructor(
    private _alertService: AlertService,
    private _turnoService: TurnoService
  ) {}

  public turnoVacio = {
    id: 0,
    codigo: 0,
    modulo: 0,
    fecha: 'null',
    estado: 'null',
    fechaAsignado: 'null',
    tipoDocumento: 'null',
    numeroDocumento: 'null',
    primerNombre: 'null',
    segundoNombre: 'null',
    primerApellido: 'null',
    segundoApellido: 'null',
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
      this.turnoEnCurso = this.turno.estado == 'En curso';
    }
  }

  siguienteTurno(): void {
    let modulo = sessionStorage.getItem('MODULO');
    if (!modulo) return;

    this._turnoService.asignar(modulo, this.categoria).subscribe((res) => {
      if (!res.error && !res.warning) {
        this.turno = res;
        this.turnoActual = true;
        localStorage.setItem('TURNO', JSON.stringify(this.turno));
      } else {
        this._alertService.showAlert(res);
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
        if (!res.error && !res.warning) {
          this.turno.estado = estado;
          localStorage.setItem('TURNO', JSON.stringify(this.turno));
          if (estado == 'En curso') {
            this.turnoActual = true;
            this.turnoEnCurso = true;
          } else {
            this.reiniciar();
          }
        } else {
          this._alertService.showAlert(res);
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
        if (!res.error && !res.warning) {
          this.reiniciar();
        } else {
          this._alertService.showAlert(res);
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
