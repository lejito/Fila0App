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
  public turno: Turno = new Turno(
    -1,
    'AAA000',
    '',
    '2023-05-10T19:12:56.778Z',
    0,
    new Usuario(
      -1,
      'CC',
      '1111111111',
      'Pnombre',
      'Snombre',
      'Papellido',
      'Sapellido'
    )
  );
  public categoria = 'N/A';
  public TurnoCompletado = true;
  public turnoEnCurso = false;
  constructor(private turnoService: TurnoService) {}
  ngOnInit(): void {
    let turnoActual = localStorage.getItem('TURNO');
    if (turnoActual) {
      let turnoConvertido = JSON.parse(turnoActual);
      this.turno = turnoConvertido;
      this.turnoEnCurso = true;
      this.TurnoCompletado = false;
    }
  }
  siguiente() {
    let modulo = sessionStorage.getItem('MODULO');
    if (!modulo) {
      return;
    }
    this.turnoService.asignar(modulo, this.categoria).subscribe((resp) => {
      if (!resp.error) {
        let usuario = new Usuario(
          -1,
          resp.tipoDocumento,
          resp.numeroDocumento,
          resp.primerNombre,
          resp.segundoNombre,
          resp.primerApellido,
          resp.segundoApellido
        );
        let turno = new Turno(
          resp.id,
          resp.codigo,
          '',
          resp.fechaAsignado,
          resp.modulo,
          usuario
        );
        this.turno = turno;
        this.TurnoCompletado = false;
        this.turnoEnCurso = true;
        let turnoStr = JSON.stringify(turno);
        localStorage.setItem('TURNO', turnoStr);
      }
    });
  }
  completar() {
    this.TurnoCompletado = true;
  }
}
