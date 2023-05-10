import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModuloService } from 'src/app/Service/modulo.service';

@Component({
  selector: 'app-gestion-turnos',
  templateUrl: './gestion-turnos.component.html',
  styleUrls: ['./gestion-turnos.component.css'],
})
export class GestionTurnosComponent implements OnInit {
  public moduloActivo = false;
  public modulo = 0;
  private flecha_derecha = `<svg
xmlns="http://www.w3.org/2000/svg"
width="30"
height="30"
fill="currentColor"
class="bi bi-arrow-right-square"
viewBox="0 0 16 16"

>
<path
  fill-rule="evenodd"
  d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"
/>
</svg>`;
  private flecha_izquierda = `<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-arrow-left-square" viewBox="0 0 16 16">
<path fill-rule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm11.5 5.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"/>
</svg> `;
  public usuario = '';
  public clave = '';
  constructor(private _moduloService: ModuloService, private router: Router) {}
  ngOnInit(): void {
    let modulo = sessionStorage.getItem('MODULO');
    if (modulo) {
      this.moduloActivo = true;
      this.modulo = Number(modulo);
      this.router.navigateByUrl('Gestion/Atender');
    }
  }

  toggle(btn: HTMLElement) {
    let wrapper = document.getElementById('wrapper');
    if (wrapper) {
      wrapper.classList.toggle('toggled');
      if (!wrapper.classList.contains('toggled')) {
        btn.innerHTML = this.flecha_izquierda;
      } else {
        btn.innerHTML = this.flecha_derecha;
      }
    }
  }
  verificar(bttnVerificar: HTMLElement) {
    this._moduloService
      .validarLogin(this.usuario, this.clave)
      .subscribe((resp) => {
        if (resp) {
          this.modulo = resp.id;
          this.moduloActivo = true;
          sessionStorage.setItem('MODULO', resp.id);
          this.router.navigate(['Atender']);
        }
      });
  }
  cerrar() {
    this.moduloActivo = false;
    sessionStorage.clear();
  }
}
