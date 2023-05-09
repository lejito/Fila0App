import { Injectable } from '@angular/core';
import { URL } from './Global';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  public url: string;
  constructor(private _http: HttpClient) {
    this.url = URL + '/usuarios/';
  }
  validarIngreso(
    tipoDocumento: string,
    numeroDocumento: string
  ): Observable<any> {
    let params = JSON.stringify({ tipoDocumento, numeroDocumento });
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(`${this.url}validarIngreso`, params, {
      headers: headers,
    });
  }
}
