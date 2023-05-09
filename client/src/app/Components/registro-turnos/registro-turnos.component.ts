import { Component, OnInit } from '@angular/core';
import { timeout } from 'rxjs';
import { TIPOS_DOCUMENTO } from 'src/app/Service/Global';
import { UsuarioService } from 'src/app/Service/usuario.service';
import { Usuario } from 'src/app/models/Usuario';

@Component({
  selector: 'app-registro-turnos',
  templateUrl: './registro-turnos.component.html',
  styleUrls: ['./registro-turnos.component.css'],
})
export class RegistroTurnosComponent implements OnInit {
  public barValue = '0%';
  public progresoValor = 0;
  private usuarioActual = new Usuario(0, '', '', '', '', '', '');
  verificado = false;
  public tipos: Array<any> = [];
  public selecionado = '';
  public numeroDocumento = '';
  private tipoTurno = '';
  constructor(private _usuarioService: UsuarioService) {
    this.tipos = TIPOS_DOCUMENTO;
  }
  ngOnInit(): void {
    const tabs = document.querySelectorAll('.tabset-nav a');
    const opcionesTurno = document.querySelectorAll('.opcionTurno');
    opcionesTurno.forEach((opcion) => {
      opcion.addEventListener('click', (e) => {
        const opcionactivo = document.querySelector('.opcionTurno.activo');
        if (opcion.classList.toggle('activo')) {
          this.tipoTurno = opcion.id;
          this.progresoValor += 50;
          this.barValue = this.progresoValor + '%';
        } else {
          this.tipoTurno = '';
          this.progresoValor -= 50;
          this.barValue = this.progresoValor + '%';
        }
        if (opcionactivo) {
          opcionactivo.classList.remove('activo');
        }
      });
    });
    tabs.forEach((tab) => {
      tab.addEventListener('click', (e) => {
        e.preventDefault();
        const activeTab = document.querySelector('.tabset-nav a.active');
        const activePanel = document.querySelector('.tab-panel.active');
        if (activeTab && activePanel) {
          activeTab.classList.remove('active');
          activePanel.classList.remove('active');
        }
        tab.classList.add('active');
        const panelId = tab.getAttribute('id');
        if (panelId) {
          const panel = document.querySelector(panelId);
          if (panel) {
            panel.classList.add('active');
          }
        }
      });
    });
  }
  verificar(btn: HTMLElement) {
    if (this.verificado) {
      if (
        this.usuarioActual.numeroDocumento == this.numeroDocumento &&
        this.usuarioActual.tipoDocumento == this.selecionado
      ) {
        return;
      }
    }
    this._usuarioService
      .validarIngreso(this.selecionado, this.numeroDocumento)
      .subscribe((resp) => {
        if (!resp.error) {
          this.usuarioActual = resp;
          if (this.verificado) {
            this.progresoValor -= 50;
            this.barValue = this.progresoValor + '%';
            setTimeout(() => {
              this.progresoValor += 50;
              this.barValue = this.progresoValor + '%';
            }, 500);
          } else {
            this.progresoValor += 50;
            this.barValue = this.progresoValor + '%';
          }

          this.verificado = true;
          btn.innerHTML = 'Verificado';
          btn.style.background = 'green';
        } else {
          btn.innerHTML = 'Verificar';

          btn.style.background = 'red';
          if (this.verificado) {
            this.verificado = false;
            this.progresoValor -= 50;
            this.barValue = this.progresoValor + '%';
          }
        }
      });
  }
}
