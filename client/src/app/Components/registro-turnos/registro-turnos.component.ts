import { Component, OnInit } from '@angular/core';
import { TIPOS_DOCUMENTO } from 'src/app/Service/Global';
import { AlertService } from 'src/app/Service/alert.service';
import { TurnoService } from 'src/app/Service/turno.service';
import { UsuarioService } from 'src/app/Service/usuario.service';
import { Turno } from 'src/app/models/Turno';
import { Usuario } from 'src/app/models/Usuario';

@Component({
  selector: 'app-registro-turnos',
  templateUrl: './registro-turnos.component.html',
  styleUrls: ['./registro-turnos.component.css'],
})
export class RegistroTurnosComponent implements OnInit {
  public turno: Turno = new Turno(-1, '', '', '');
  public turnoGenerado = false;
  public barValue = '0%';
  public progresoValor = 0;
  private usuarioActual = new Usuario(0, '', '', '', '', '', '');
  verificado = false;
  public tipos: Array<any> = [];
  public selecionado = '';
  public numeroDocumento = '';
  private tipoTurno = '';
  constructor(
    private _alertService: AlertService,
    private _usuarioService: UsuarioService,
    private _turnoService: TurnoService
  ) {
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
        if (!resp.error && !resp.warning) {
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
            this.verificado = true;
            btn.innerHTML = 'Verificado';
            btn.style.background = 'green';
            btn.style.borderColor = 'green';
          }
        } else {
          this._alertService.showAlert(resp);

          btn.innerHTML = 'Verificar';

          btn.style.background = 'red';
          btn.style.borderColor = 'red';
          if (this.verificado) {
            this.verificado = false;
            this.progresoValor -= 50;
            this.barValue = this.progresoValor + '%';
          }
        }
      });
  }

  generarTurno(btn: HTMLButtonElement) {
    btn.disabled = true;
    let idStr = String(this.usuarioActual.id);
    this._turnoService.registrar(idStr, this.tipoTurno).subscribe((resp) => {
      if (!resp.error && !resp.warning) {
        this.turno = resp;
        this.turnoGenerado = true;
        setTimeout(() => {
          this.turnoGenerado = false;
          this.resetearFormulario();
        }, 5000);
      } else {
        this._alertService.showAlert(resp);
      }
    });
  }

  resetearFormulario() {
    this.progresoValor = 0;
    this.barValue = '0%';
    this.numeroDocumento = '';
    this.selecionado = '';
    this.verificado = false;
    const opcionactivo = document.querySelector('.opcionTurno.activo');
    const btnVerificar = document.getElementById('btnVerificar');
    if (opcionactivo) {
      opcionactivo.classList.remove('activo');
    }
    if (btnVerificar) {
      btnVerificar.style.background = 'blue';
      btnVerificar.style.borderColor = 'blue';
    }
  }
}
