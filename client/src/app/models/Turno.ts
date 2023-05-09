import { Usuario } from './Usuario';

export class Turno {
  constructor(
    public _id: number,
    public codigo: string,
    public modulo: number,
    public usuario: Usuario
  ) {}
}
