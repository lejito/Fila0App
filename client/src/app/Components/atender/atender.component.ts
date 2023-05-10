import { Component, OnInit } from '@angular/core';
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
  ngOnInit(): void {}
}
