import { Injectable } from '@angular/core';
import { URL } from './Global';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Turno } from '../models/Turno';
@Injectable({
  providedIn: 'root',
})
export class  TurnoService {
  public url: string;
  constructor(private _http: HttpClient) {
    this.url = URL + '/turnos/';
  }
  TurnosAsignados = new Subject<Array<Turno>>();
  TurnosPendientes = new Subject<Array<Turno>>();

  registrar(usuario: string, categoria: string): Observable<any> {
    let params = JSON.stringify({ usuario: usuario, categoria: categoria });
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(`${this.url}registrar`, params, {
      headers: headers,
    });
  }
  buscarPendientes(): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.get(`${this.url}buscarPendientes`, {
      headers: headers,
    });
  }
  buscarAsignados(): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.get(`${this.url}buscarAsignados`, {
      headers: headers,
    });
  }
  asignar(modulo: string, categoria: string): Observable<any> {
    let params = JSON.stringify({ modulo: modulo, categoria: categoria });
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.put(`${this.url}asignar`, params, {
      headers: headers,
    });
  }
  actualizarEstado(
    id: string,
    modulo: string,
    estado: string
  ): Observable<any> {
    let params = JSON.stringify({ id: id, modulo: modulo, estado: estado });
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.put(`${this.url}actualizarEstado`, params, {
      headers: headers,
    });
  }
  devolverAPendientes(id: string): Observable<any> {
    let params = JSON.stringify({ id: id });
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.put(`${this.url}devolverAPendientes`, params, {
      headers: headers,
    });
  }
}
