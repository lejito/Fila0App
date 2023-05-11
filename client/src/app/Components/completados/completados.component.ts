import { Component, OnInit } from '@angular/core';
import { TurnoService } from 'src/app/Service/turno.service';
import { interval } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-completados',
  templateUrl: './completados.component.html',
  styleUrls: ['./completados.component.css']
})
export class CompletadosComponent implements OnInit {
  constructor(private _turnoService: TurnoService) {}

  public turnosCompletados: Array<any> = [];

  ngOnInit(): void {
    const interval$ = interval(5000);
    interval$
      .pipe(
        startWith(0),
        switchMap(() => this._turnoService.buscarCompletados())
      )
      .subscribe((res) => {
        if (!res.error) {
          this.turnosCompletados = res;
        }
      });
  }
}
