import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-home-coach',
  templateUrl: './home-coach.component.html',
  styleUrls: ['./home-coach.component.css']
})
export class HomeCoachComponent implements OnInit{

  /// SALIDA ///
  @Output() userInfoActiveEmitter: EventEmitter<any> = new EventEmitter();
  @Output() userInfoEmitter: EventEmitter<any> = new EventEmitter();

  /// ENTRADA ///
  @Input() userLoged: any ;


  /// VARIABLES ///

  // Lista de clientes
  listaAtletas: any;

  // Lista de entrenos de hoy
  listaActividades: any;

  // Lista de deportes
  listaDeportes: any;
  

  /// INICIO ///

  constructor(private router: Router){}

  ngOnInit(): void {
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
    console.log(this.listaActividades);
  }

  // Consulta de la lista de deportes
  async getListaDeportes(){
    const response = await fetch('https://btop.es/server/listaDeportes.php', { method: 'POST'});
    this.listaDeportes = await response.json();
    console.log(this.listaDeportes);
  }

  /// FUNCIONES ///

  calendario(id: any){
    this.router.navigate(['calendario-cliente',id]);
  }

  // Emisor de los datos de usuario para verlos en detalle
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
