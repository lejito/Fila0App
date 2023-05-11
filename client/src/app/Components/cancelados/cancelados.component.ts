import { Component, OnInit } from '@angular/core';
import { TurnoService } from 'src/app/Service/turno.service';
import { interval } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-cancelados',
  templateUrl: './cancelados.component.html',
  styleUrls: ['./cancelados.component.css']
})
export class CanceladosComponent implements OnInit {
  constructor(private _turnoService: TurnoService) {}

  public turnosCancelados: Array<any> = [];

  ngOnInit(): void {
    const interval$ = interval(5000);
    interval$
      .pipe(
        startWith(0),
        switchMap(() => this._turnoService.buscarCancelados())
      )
      .subscribe((res) => {
        if (!res.error) {
          this.turnosCancelados = res;
        }
      });
  }
}
