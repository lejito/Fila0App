import { Component } from '@angular/core';

@Component({
  selector: 'app-gestion-turnos',
  templateUrl: './gestion-turnos.component.html',
  styleUrls: ['./gestion-turnos.component.css']
})
export class GestionTurnosComponent {
  toggle() {
    let wrapper = document.getElementById('wrapper');
    if (wrapper) {
      wrapper.classList.toggle('toggled');
    }
  }

}
