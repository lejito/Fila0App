import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registro-turnos',
  templateUrl: './registro-turnos.component.html',
  styleUrls: ['./registro-turnos.component.css'],
})
export class RegistroTurnosComponent implements OnInit {
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
          const panel = document.querySelector(panelId);
          if (panel) {
            panel.classList.add('active');
          }
        }
      });
    });
  }
}
