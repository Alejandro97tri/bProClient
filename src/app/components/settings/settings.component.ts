import { Component } from '@angular/core';
import { Router } from '@angular/router';

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
  userInfo: any ="";


  /// INICIO ///
  constructor() {
    let session = sessionStorage.getItem('auth');
    if (session !== null) {
      this.userLoged = JSON.parse(session);
    }
  }

  ngOnInit(): void {
    this.getUser();
    this.getListaDeportes();
  }

  /// CONSULTAS ///

  // Consulta para obtener la lista de deportes
  async getListaDeportes() {
    const response = await fetch('https://btop.es/server/listaDeportes.php', { method: 'POST' });
    this.listaDeportes = await response.json();
    console.log(this.listaDeportes);
  }

  async getUser() {
    const response = await fetch('https://btop.es/server/userInfo.php', { method: 'POST' , body: JSON.stringify({'id':this.userLoged.id})});
    this.userInfo = await response.json();
    this.userInfo = this.userInfo[0];
    this.fecha_nacimiento = this.userInfo.fecha_nacimiento;
    this.genero = this.userInfo.genero;
    this.peso = this.userInfo.peso;
    this.altura = this.userInfo.altura;
    this.deporte_principal = this.userInfo.deporte_principal;
    this.objetivos = this.userInfo.objetivos;
    this.horario_entrenamientos = this.userInfo.horario_entrenamiento;
    this.horario_comidas = this.userInfo.horario_comidas;
  }

  async updateSetings() {
    const response = await fetch('https://btop.es/server/updateSettings.php', {
      method: 'POST', body: JSON.stringify({
        'fecha_nacimiento': this.fecha_nacimiento,
        'genero': this.genero,
        'peso': this.peso,
        'altura': this.altura,
        'deporte_principal': this.deporte_principal,
        'objetivos': this.objetivos,
        'horario_entrenamientos': this.horario_entrenamientos,
        'horario_comidas': this.horario_comidas,
        'id': this.userLoged.id
      })
    });
    
  }

  /// FUNCIONES ///

  // Función para insertar en la bd las variables
  async guardar() {
    await this.updateSetings();
    await this.getUser();
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
