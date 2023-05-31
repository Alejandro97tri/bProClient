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
  listaPeticiones: any;
  peticiones: boolean = false;
  infoUserEnvia: any = [];

  
  nutricionEmpty:boolean = false;
  clienteEmpty:boolean = false;

  /// INICIO ///
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.fechaHoy();
    this.getListaNutris();
    this.getListaNutrisHoy();
    this.getPeticiones();
  }

  /// CONSULTAS ///

  async getUser() {
    for (const element of this.listaPeticiones) {
      const response = await fetch('https://btop.es/server/userInfo.php', { method: 'POST', body: JSON.stringify({ 'id': element.id_enviado }) });
      const userInfo = await response.json();
      this.infoUserEnvia.push(userInfo);
    }
  }

  async getPeticiones() {
    const response = await fetch('https://btop.es/server/peticionPendiente.php', { method: 'POST', body: JSON.stringify({ 'id': this.userLoged.id }) });
    this.listaPeticiones = await response.json();
    if (this.listaPeticiones.length > 0) {
      setTimeout(() => {
        this.peticiones = true;
      }, 500)
      this.getUser();
    } else{
      this.peticiones = false;
    }
  }

  // Consulta a la bd para obtener las dietas de hoy
  async getListaNutrisHoy() {
    const response = await fetch('https://btop.es/server/homeListaNutrisHoy.php', { method: 'POST', body: JSON.stringify({ 'id': this.userLoged.id }) });
    this.listaNutrisHoy = await response.json();
    this.listaNutrisHoy.forEach((element: any) => {
      (this.listaNutrisAtletas.includes(element.id_user)) ? null : this.listaNutrisAtletas.push(element.id_user);
    });
    if(this.listaNutrisHoy.length == 0){
      this.nutricionEmpty = true;
    }
    this.listaNutrisHoy.sort((a: { hora: number; }, b: { hora: number; }) => {
      if (a.hora < b.hora) return -1;
      if (a.hora > b.hora) return 1;
      return 0;
    });

  }

  // Consulta a la bd para obtener los clientes del nutricionista
  async getListaNutris() {
    const response = await fetch('https://btop.es/server/homeListaNutris.php', { method: 'POST', body: JSON.stringify({ 'id': this.userLoged.id }) });
    this.listaNutris = await response.json();
    if(this.listaNutris.length == 0){
      this.clienteEmpty = true;
    }
  }

  /// FUNCIONES ///

  aceptar(id: any) {
    fetch('https://btop.es/server/aceptPeticionNutricionista.php', { method: 'POST', body: JSON.stringify({ 'nutritionist': this.userLoged.id, 'id': id }) })
      .then(response => {
        // La petición se completó correctamente, puedes realizar acciones aquí
        // Llamar a la función denegar después de que se complete la solicitud fetch
        this.denegar(id);
      })
      .then(() => {
        return fetch('https://btop.es/server/userInfo.php', { method: 'POST', body: JSON.stringify({ 'id': this.userLoged.id }) });
      })
      .then(response => response.json())
      .then(updatedUser => {
        this.userLoged = updatedUser[0];
        sessionStorage.setItem("auth", JSON.stringify(this.userLoged))
      });
  }
  
  denegar(id: any) {
    this.infoUserEnvia = [];
    fetch('https://btop.es/server/deletePeticion.php', { method: 'POST', body: JSON.stringify({ 'id_enviado': id, 'id_recibido': this.userLoged.id }) })
      .then(response => {
        // La petición se completó correctamente, puedes realizar acciones aquí
        this.getPeticiones();
      })
  }
  
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
