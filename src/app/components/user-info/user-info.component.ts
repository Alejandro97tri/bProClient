import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent {

    @Input() userInfo: any;

    calcularEdad(fechaNacimiento: string): number {
      const fechaActual = new Date();
      const fechaNacimientoDate = new Date(fechaNacimiento);
      let edad = fechaActual.getFullYear() - fechaNacimientoDate.getFullYear();
      const mesActual = fechaActual.getMonth();
      const mesNacimiento = fechaNacimientoDate.getMonth();
      if (mesNacimiento > mesActual || (mesNacimiento === mesActual && fechaNacimientoDate.getDate() > fechaActual.getDate())) {
        edad--;
      }
      return edad;
    }
}
