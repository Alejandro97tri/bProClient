import { Component } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent {

  /// VARIABLE ///

  // Usuario actual
  userLoged: any;

  // Listado de deportes
  listaDeportes: any;
  
  // Formulario
  fecha_nacimiento: any;
  genero: any;
  peso: any;
  altura: any;
  deporte_principal: any;
  objetivos: any;
  horario_entrenamientos: any;
  horario_comidas: any;


  /// INICIO ///
  constructor() {
    let session = sessionStorage.getItem('auth');
    if (session !== null) {
      this.userLoged = JSON.parse(session);
    }
  }

  ngOnInit(): void {
    this.fecha_nacimiento= this.userLoged.fecha_nacimiento;
    this.genero= this.userLoged.genero;
    this.peso= this.userLoged.peso;
    this.altura= this.userLoged.altura;
    this.deporte_principal= this.userLoged.deporte_principal;
    this.objetivos= this.userLoged.objetivos;
    this.horario_entrenamientos= this.userLoged.horario_entrenamiento;
    this.horario_comidas= this.userLoged.horario_comidas;
    this.getListaDeportes();
  }

  /// CONSULTAS ///

  // Consulta para obtener la lista de deportes
  async getListaDeportes(){
    const response = await fetch('https://btop.es/server/listaDeportes.php', { method: 'POST'});
    this.listaDeportes = await response.json();
    console.log(this.listaDeportes);
  }

  /// FUNCIONES ///
  
  // Función para insertar en la bd las variables
  guardar(){
    console.log(this.fecha_nacimiento);
    console.log(this.genero);
    console.log(this.peso);
    console.log(this.altura);
    console.log(this.deporte_principal);
    console.log(this.objetivos);
    console.log(this.horario_entrenamientos);
    console.log(this.horario_comidas);
  }

  // Función para calcular la edad respecto a la fecha de nacimiento
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
