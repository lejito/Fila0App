import { Component, OnInit } from '@angular/core';
import { TurnoService } from 'src/app/Service/turno.service';
import { interval } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-pendientes',
  templateUrl: './pendientes.component.html',
  styleUrls: ['./pendientes.component.css'],
})
export class PendientesComponent implements OnInit {
  constructor(private _turnoService: TurnoService) {}

  public turnosPendientes: Array<any> = [];

  ngOnInit(): void {
    const interval$ = interval(5000);
    interval$
      .pipe(
        startWith(0),
        switchMap(() => this._turnoService.buscarPendientes())
      )
      .subscribe((res) => {
        if (!res.error) {
          this.turnosPendientes = res;
        }
      });
  }
}
