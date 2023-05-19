import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
type response = ({ error: string } & { warning?: never }) | ({ warning: string } & { error?: never });

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  constructor() {}

  showAlert(res: response): void {
    const type = res.error ? 'error' : 'warning';
    const message = res.error ?? res.warning;

    Swal.fire({
      icon: type,
      title: 'Mensaje del sistema',
      text: message,
    });
  }
}
