import { Component, OnInit, OnDestroy } from '@angular/core';
import { TurnoService } from 'src/app/Service/turno.service';
import { interval, Subject } from 'rxjs';
import { startWith, switchMap, takeUntil } from 'rxjs/operators';
import { AlertService } from 'src/app/Service/alert.service';

@Component({
  selector: 'app-cancelados',
  templateUrl: './cancelados.component.html',
  styleUrls: ['./cancelados.component.css'],
})
export class CanceladosComponent implements OnInit, OnDestroy {
  constructor(
    private _alertService: AlertService,
    private _turnoService: TurnoService
  ) {}

  public turnosCancelados: Array<any> = [];
  private unsubscribe$ = new Subject<void>();
  private alertaMostrada = false;

  ngOnInit(): void {
    const interval$ = interval(5000);
    interval$
      .pipe(
        startWith(0),
        switchMap(() => this._turnoService.buscarCancelados()),
        takeUntil(this.unsubscribe$)
      )
      .subscribe((res) => {
        if (!res.error && !res.warning) {
          this.turnosCancelados = res;
        } else if (!this.alertaMostrada) {
          this._alertService.showAlert(res);
          this.alertaMostrada = true;
        }
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(); // Emite un valor para cancelar la suscripción
    this.unsubscribe$.complete(); // Marca el subject como completado
  }
}
