import { Usuario } from './Usuario';

export class Turno {
  constructor(
    public id: number,
    public codigo: string,
    public estado:string,
    public fecha:string,
    public modulo?: number,
    public usuario?: Usuario
  ) {}
}
