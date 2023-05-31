import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent {

  /// ENTRADA ///
  userInfo:any = '';
  idUser: any;

  /// INICIO ///
  constructor(private router: Router, private rutaActiva: ActivatedRoute) {}

  ngOnInit() {
    this.idUser = this.rutaActiva.snapshot.params['id'];
    this.getUser();
  }

  // Consulta de los clientes del entrenador
  async getUser() {
    const response = await fetch('https://btop.es/server/userInfo.php', { method: 'POST', body: JSON.stringify({ 'id': this.idUser }) });
    this.userInfo = await response.json();
    this.userInfo = this.userInfo[0];
  }

  /// FUNCIONES ///

  // Función para el calculo de la edad respecto a la fecha de nacimiento
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
