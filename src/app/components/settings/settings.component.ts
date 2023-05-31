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
  userInfo: any = "";

  successAlert: boolean = false;
  errorAlert: boolean = false;

  // Errores
  numeroErrores: number = 0;
  erroresNoVacios: any = {};
  errores = {
    fecha_nacimientoVacio: '',
    fecha_nacimientoErrorFormato: '',
    generoVacio: '',
    pesoVacio: '',
    pesoErrorFormato: '',
    alturaVacio: '',
    alturaErrorFormato: '',
    deporte_principalVacio: '',
    // objetivosVacio: '',
    // horario_entrenamientosVacio: '',
    // horario_comidasVacio: '',
  }


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
  }

  async getUser() {
    const response = await fetch('https://btop.es/server/userInfo.php', { method: 'POST', body: JSON.stringify({ 'id': this.userLoged.id }) });
    this.userInfo = await response.json();
    this.userInfo = this.userInfo[0];
    this.fecha_nacimiento =  this.formatDateMostrar(this.userInfo.fecha_nacimiento);
    this.genero = this.userInfo.genero;
    this.peso = this.userInfo.peso;
    this.altura = this.userInfo.altura;
    this.deporte_principal = this.userInfo.deporte_principal;
    this.objetivos = this.userInfo.objetivos;
    this.horario_entrenamientos = this.userInfo.horario_entrenamiento;
    this.horario_comidas = this.userInfo.horario_comidas;
  }

  async updateSetings() {
    const fechaEnviar = this.formatDateModificar(this.fecha_nacimiento);
    const response = await fetch('https://btop.es/server/updateSettings.php', {
      method: 'POST', body: JSON.stringify({
        'fecha_nacimiento': fechaEnviar,
        'genero': this.genero,
        'peso': this.peso,
        'altura': this.altura,
        'deporte_principal': this.deporte_principal,
        'objetivos': this.objetivos,
        'horario_entrenamiento': this.horario_entrenamientos,
        'horario_comidas': this.horario_comidas,
        'id': this.userLoged.id
      })
      
    });
    this.successAlert = true;
  }

  /// FUNCIONES ///

  // Función para insertar en la bd las variables
  async guardar() {
    this.successAlert= false;
    this.errorAlert= false;
    this.checkErrores();
    if (this.numeroErrores == 0) {
      this.errorAlert = false;
      await this.updateSetings();
      await this.getUser();
    } else {
      this.errorAlert = true;
    }
  }

  formatDateMostrar(fecha: string): string {
    const partes = fecha.split('-');
    const year = partes[0];
    const mes = partes[1];
    const dia = partes[2];

    // Formatear la fecha en el nuevo formato
    const nuevaFecha = `${dia}-${mes}-${year}`;

    return nuevaFecha;
  }

  formatDateModificar(fecha: string): string {
    const partes = fecha.split('-');
    const dia = partes[0];
    const mes = partes[1];
    const year = partes[2];

    // Formatear la fecha en el nuevo formato
    const nuevaFecha = `${year}-${mes}-${dia}`;

    return nuevaFecha;
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

  checkErrores() {

    this.numeroErrores = 0;
    const regexFecha = /^(0[1-9]|1\d|2\d|3[01])-(0[1-9]|1[0-2])-\d{4}$/;
    const regexNumeros = /^\d+$/;

    this.errores = {
      fecha_nacimientoVacio: '',
      fecha_nacimientoErrorFormato: '',
      generoVacio: '',
      pesoVacio: '',
      pesoErrorFormato: '',
      alturaVacio: '',
      alturaErrorFormato: '',
      deporte_principalVacio: '',
      // objetivosVacio: '',
      // horario_entrenamientosVacio: '',
      // horario_comidasVacio: '',
    }

    if (this.fecha_nacimiento == null || this.fecha_nacimiento == '') {
      this.errores.fecha_nacimientoVacio = "La fecha de nacimiento no puede estar vacía";
      this.numeroErrores++
    }
    if (!this.errores.fecha_nacimientoVacio && !regexFecha.test(this.fecha_nacimiento)) {
      this.errores.fecha_nacimientoErrorFormato = 'La fecha debe tener formato dd-mm-yyyy (Ej. 16-05-2023)';
      this.numeroErrores++;
    }

    if (this.genero == null || this.genero == '') {
      this.errores.generoVacio = "El género no puede estar vacío";
      this.numeroErrores++;
    }

    if(this.peso == null || this.peso == '') {
      this.errores.pesoVacio = "El peso no puede estar vacío";
      this.numeroErrores++;
    }

    if (!this.errores.pesoVacio && !regexNumeros.test(this.peso)) {
      this.errores.pesoErrorFormato = 'El peso debe ser un número entero';
      this.numeroErrores++;
    }

    if(this.altura == null || this.altura == '') {
      this.errores.alturaVacio = "La altura no puede estar vacía";
      this.numeroErrores++;
    }

    if(!this.errores.alturaVacio && !regexNumeros.test(this.altura)) {
      this.errores.alturaErrorFormato = 'La altura debe ser un número entero';
      this.numeroErrores++;
    }

    if(this.deporte_principal == null || this.deporte_principal == '') {
      this.errores.deporte_principalVacio = "El deporte principal no puede estar vacío";
      this.numeroErrores++;
    }

    this.erroresNoVacios = Object.values(this.errores).filter(error => error !== '');
  }
}
