import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-home-coach',
  templateUrl: './home-coach.component.html',
  styleUrls: ['./home-coach.component.css']
})
export class HomeCoachComponent implements OnInit{

  /// ENTRADA ///
  @Input() userLoged: any ;


  /// VARIABLES ///

  dia: any;
  mes: any;
  ano: any;

  // Lista de clientes
  listaAtletas: any;

  // Lista de entrenos de hoy
  listaActividades: any;
  listaActividadesAtletas:any = [];

  // Lista de deportes
  listaDeportes: any;
  

  /// INICIO ///

  constructor(private router: Router){}

  ngOnInit(): void {
    this.fechaHoy();
    this.getListaDeportes();
    this.getListaAtletas();
    this.getListaAcatividades();
  }


  /// CONSULTAS ///

  // Consulta de los clientes del entrenador
  async getListaAtletas(){
    const response = await fetch('https://btop.es/server/homeListaAtletas.php', { method: 'POST', body: JSON.stringify({'id': this.userLoged.id})});
    this.listaAtletas = await response.json();
    console.log(this.listaAtletas);
  }

  // Consulta de las actividades de hoy de los clientes del entrenador
  async getListaAcatividades(){
    const response = await fetch('https://btop.es/server/homeListaActividadesHoy.php', { method: 'POST', body: JSON.stringify({'id': this.userLoged.id})});
    this.listaActividades = await response.json();
    this.listaActividades.forEach((element:any) => {
      (this.listaActividadesAtletas.includes(element.id_user)) ? null : this.listaActividadesAtletas.push(element.id_user);
    });
    console.log(this.listaActividadesAtletas)
    console.log(this.listaActividades);
  }

  // Consulta de la lista de deportes
  async getListaDeportes(){
    const response = await fetch('https://btop.es/server/listaDeportes.php', { method: 'POST'});
    this.listaDeportes = await response.json();
    console.log(this.listaDeportes);
  }

  /// FUNCIONES ///

  goToFormActividadModificar(id: any) {
    this.router.navigate(['formentreno', id, this.dia, this.mes, this.ano]);
  }

  calendario(id: any){
    this.router.navigate(['calendario-cliente',id]);
  }

  // Emisor de los datos de usuario para verlos en detalle
  userInfo(user: any){
    this.router.navigate(['userinfo',user]);
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
