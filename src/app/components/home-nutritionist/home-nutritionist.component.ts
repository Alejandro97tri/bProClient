import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

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
  @Input() userLoged: any;


  /// VARIABLES ///

  dia: any;
  mes: any;
  ano: any;

  // Listado de clientes
  listaNutris: any;
  listaNutrisAtletas: any = [];
  // Listado de dietas hoy
  listaNutrisHoy: any;

  /// INICIO ///
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.fechaHoy();
    this.getListaNutris();
    this.getListaNutrisHoy();
  }

  /// CONSULTAS ///

  // Consulta a la bd para obtener las dietas de hoy
  async getListaNutrisHoy() {
    const response = await fetch('https://btop.es/server/homeListaNutrisHoy.php', { method: 'POST', body: JSON.stringify({ 'id': this.userLoged.id }) });
    this.listaNutrisHoy = await response.json();
    this.listaNutrisHoy.forEach((element: any) => {
      (this.listaNutrisAtletas.includes(element.id_user)) ? null : this.listaNutrisAtletas.push(element.id_user);
    });
    this.listaNutrisHoy.sort((a: { hora: number; }, b: { hora: number; }) => {
      if (a.hora < b.hora) return -1;
      if (a.hora > b.hora) return 1;
      return 0;
    });

    console.log(this.listaNutrisAtletas)
    console.log(this.listaNutrisHoy, "sdfsd");
  }

  // Consulta a la bd para obtener los clientes del nutricionista
  async getListaNutris() {
    const response = await fetch('https://btop.es/server/homeListaNutris.php', { method: 'POST', body: JSON.stringify({ 'id': this.userLoged.id }) });
    this.listaNutris = await response.json();
    console.log(this.listaNutris);
  }

  /// FUNCIONES ///

  calendario(id: any) {
    this.router.navigate(['calendario-cliente', id]);
  }

  // Emisor de la informacion de usuario para verla
  userInfo(user: any) {
    this.router.navigate(['userinfo',user]);
  }

  goToFormDietaModificar(uer_id:any, id: any) {
    this.router.navigate(['formnutricion', uer_id, id, this.dia, this.mes, this.ano]);
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

  fechaHoy() {
    const fechaHoy: Date = new Date();

    // Obtener día con dos cifras
    this.dia = ("0" + fechaHoy.getDate()).slice(-2);

    // Obtener mes en letras y mayúsculas
    const meses: string[] = [
      "ENERO", "FEBRERO", "MARZO", "ABRIL", "MAYO", "JUNIO",
      "JULIO", "AGOSTO", "SEPTIEMBRE", "OCTUBRE", "NOVIEMBRE", "DICIEMBRE"
    ];
    this.mes = meses[fechaHoy.getMonth()];

    // Obtener año con cuatro cifras
    this.ano  = fechaHoy.getFullYear().toString();
  }

}
