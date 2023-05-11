import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { TurnoService } from 'src/app/Service/turno.service';
import { interval } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-vizualizar-turnos',
  templateUrl: './vizualizar-turnos.component.html',
  styleUrls: ['./vizualizar-turnos.component.css'],
})
export class VizualizarTurnosComponent implements OnInit {
  constructor(private _turnoService: TurnoService) {}

  public turnosAsignados: Array<any> = [];
  @ViewChild('audioTurno') audioTurno!: ElementRef;

  ngOnInit(): void {
    const interval$ = interval(5000);
    interval$
      .pipe(
        startWith(0),
        switchMap(() => this._turnoService.buscarAsignados())
      )
      .subscribe((res) => {
        if (!res.error) {
          if (
            this.turnosAsignados.length != 0 &&
            JSON.stringify(this.turnosAsignados) != JSON.stringify(res)
          ) {
            this.reproducirSonido();
          }
          this.turnosAsignados = res;
        }
      });
  }

  reproducirSonido(): void {
    const audio = this.audioTurno.nativeElement;
    audio.play();
  }
}
