import { Injectable } from '@angular/core';
import { URL } from './Global';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../models/Usuario';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  public url: string;
  constructor(private _http: HttpClient) {
    this.url = URL + '/turnos/';
  }
  validarIngreso(usuario: Usuario): Observable<any> {
    let params = JSON.stringify(usuario);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(`${this.url}registrar`, params, {
      headers: headers,
    });
  }
}
