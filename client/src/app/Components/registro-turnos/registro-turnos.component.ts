import { Component, OnInit } from '@angular/core';
import { TIPOS_DOCUMENTO } from 'src/app/Service/Global';

@Component({
  selector: 'app-registro-turnos',
  templateUrl: './registro-turnos.component.html',
  styleUrls: ['./registro-turnos.component.css'],
})
export class RegistroTurnosComponent implements OnInit {
  public barValue = '0%';
  public tipos: Array<any> = [];
  public selecionado = '';
  constructor() {
    this.tipos = TIPOS_DOCUMENTO;
  }
  ngOnInit(): void {
    const tabs = document.querySelectorAll('.tabset-nav a');

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
          switch (panelId) {
            case '#tab1':
              this.barValue = '0%';
              break;
            case '#tab2':
              this.barValue = '50%';
              break;
            case '#tab3':
              this.barValue = '100%';
              break;
          }
          const panel = document.querySelector(panelId);
          if (panel) {
            panel.classList.add('active');
          }
        }
      });
    });
  }
}
