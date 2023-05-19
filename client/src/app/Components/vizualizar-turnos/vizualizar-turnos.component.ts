import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { TurnoService } from 'src/app/Service/turno.service';
import { interval, Subject } from 'rxjs';
import { startWith, switchMap, takeUntil } from 'rxjs/operators';
import { AlertService } from 'src/app/Service/alert.service';

@Component({
  selector: 'app-vizualizar-turnos',
  templateUrl: './vizualizar-turnos.component.html',
  styleUrls: ['./vizualizar-turnos.component.css'],
})
export class VizualizarTurnosComponent implements OnInit, OnDestroy {
  constructor(
    private _alertService: AlertService,
    private _turnoService: TurnoService
  ) {}

  public turnosAsignados: Array<any> = [];
  private unsubscribe$ = new Subject<void>();
  private alertaMostrada = false;
  @ViewChild('audioTurno') audioTurno!: ElementRef;

  ngOnInit(): void {
    const interval$ = interval(5000);
    interval$
      .pipe(
        startWith(0),
        switchMap(() => this._turnoService.buscarAsignados()),
        takeUntil(this.unsubscribe$)
      )
      .subscribe((res) => {
        if (!res.error && !res.warning) {
          if (
            this.turnosAsignados.length != 0 &&
            JSON.stringify(this.turnosAsignados) != JSON.stringify(res)
          ) {
            this.reproducirSonido();
          }
          this.turnosAsignados = res;
        } else if (!this.alertaMostrada) {
          this._alertService.showAlert(res);
          this.alertaMostrada = true;
          this.turnosAsignados = [];
        }
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(); // Emite un valor para cancelar la suscripción
    this.unsubscribe$.complete(); // Marca el subject como completado
  }

  reproducirSonido(): void {
    const audio = this.audioTurno.nativeElement;
    audio.play();
  }
}
