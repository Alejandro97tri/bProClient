import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-home-nutritionist',
  templateUrl: './home-nutritionist.component.html',
  styleUrls: ['./home-nutritionist.component.css']
})
export class HomeNutritionistComponent {

  /// SALIDA ///
  @Output() userInfoActiveEmitter: EventEmitter<any> = new EventEmitter();
  @Output() userInfoEmitter: EventEmitter<any> = new EventEmitter();
  

  /// ENTRADA ///
  @Input() userLoged: any ;


  /// VARIABLES ///
  
  // Listado de clientes
  listaNutris: any;

  // Listado de dietas hoy
  listaNutrisHoy: any;
  
  /// INICIO ///
  ngOnInit(): void {
    this.getListaNutris();
    this.getListaNutrisHoy();
  }

  /// CONSULTAS ///

  // Consulta a la bd para obtener las dietas de hoy
  async getListaNutrisHoy(){
    const response = await fetch('https://btop.es/server/homeListaNutrisHoy.php', { method: 'POST', body: JSON.stringify({'id': this.userLoged.id})});
    this.listaNutrisHoy = await response.json();
    console.log(this.listaNutrisHoy);
  }

  // Consulta a la bd para obtener los clientes del nutricionista
  async getListaNutris(){
    const response = await fetch('https://btop.es/server/homeListaNutris.php', { method: 'POST', body: JSON.stringify({'id': this.userLoged.id})});
    this.listaNutris = await response.json();
    console.log(this.listaNutris);
  }

  /// FUNCIONES ///

  // Emisor de la informacion de usuario para verla
  userInfo(user: any){
    this.userInfoActiveEmitter.emit(true);
    this.userInfoEmitter.emit(user);
  }

  // Calculo de la edad respecto a la fecha de nacimiento
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
