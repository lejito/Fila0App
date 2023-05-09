import { Injectable } from '@angular/core';
import { URL } from './Global';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ModuloService {
  public url: string;
  constructor(private _http: HttpClient) {
    this.url = URL + '/turnos/';
  }
  validarLogin(usuario: string, clave: string): Observable<any> {
    let params = JSON.stringify({ usuario: usuario, clave: clave });
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(`${this.url}registrar`, params, {
      headers: headers,
    });
  }
}
