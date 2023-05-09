export class Usuario {
  constructor(
    public _id: number,
    public tipoDocumento: string,
    public numeroDocumento: string,
    public primerNombre: string,
    public segundoNombre: string,
    public primerApellido: string,
    public segundoApellido: string
  ) {}
}
