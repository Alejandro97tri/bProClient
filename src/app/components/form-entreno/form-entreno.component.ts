import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-form-entreno',
  templateUrl: './form-entreno.component.html',
  styleUrls: ['./form-entreno.component.css']
})
export class FormEntrenoComponent {

  /// Variables ///

  userLoged:any;

  // Listado para los select
  listaDeportes: any;
  listaTiempos: Array<any> = [
    "00:10:00",
    "00:15:00",
    "00:20:00",
    "00:25:00",
    "00:30:00",
    "00:35:00",
    "00:40:00",
    "00:45:00",
    "00:50:00",
    "00:55:00",

    "01:00:00",
    "01:05:00",
    "01:10:00",
    "01:15:00",
    "01:20:00",
    "01:25:00",
    "01:30:00",
    "01:35:00",
    "01:40:00",
    "01:45:00",
    "01:50:00",
    "01:55:00",

    "02:00:00",
    "02:05:00",
    "02:10:00",
    "02:15:00",
    "02:20:00",
    "02:25:00",
    "02:30:00",
    "02:35:00",
    "02:40:00",
    "02:45:00",
    "02:50:00",
    "02:55:00",

    "03:00:00",
    "03:05:00",
    "03:10:00",
    "03:15:00",
    "03:20:00",
    "03:25:00",
    "03:30:00",
    "03:35:00",
    "03:40:00",
    "03:45:00",
    "03:50:00",
    "03:55:00",

    "04:00:00",
    "04:05:00",
    "04:10:00",
    "04:15:00",
    "04:20:00",
    "04:25:00",
    "04:30:00",
    "04:35:00",
    "04:40:00",
    "04:45:00",
    "04:50:00",
    "04:55:00",

    "05:00:00",
    "05:05:00",
    "05:10:00",
    "05:15:00",
    "05:20:00",
    "05:25:00",
    "05:30:00",
    "05:35:00",
    "05:40:00",
    "05:45:00",
    "05:50:00",
    "05:55:00",

    "06:00:00",
    "06:05:00",
    "06:10:00",
    "06:15:00",
    "06:20:00",
    "06:25:00",
    "06:30:00",
    "06:35:00",
    "06:40:00",
    "06:45:00",
    "06:50:00",
    "06:55:00",

    "07:00:00",
    "07:05:00",
    "07:10:00",
    "07:15:00",
    "07:20:00",
    "07:25:00",
    "07:30:00",
    "07:35:00",
    "07:40:00",
    "07:45:00",
    "07:50:00",
    "07:55:00",

    "08:00:00",
    "08:05:00",
    "08:10:00",
    "08:15:00",
    "08:20:00",
    "08:25:00",
    "08:30:00",
    "08:35:00",
    "08:40:00",
    "08:45:00",
    "08:50:00",
    "08:55:00",

    "09:00:00",
    "09:05:00",
    "09:10:00",
    "09:15:00",
    "09:20:00",
    "09:25:00",
    "09:30:00",
    "09:35:00",
    "09:40:00",
    "09:45:00",
    "09:50:00",
    "09:55:00",

    "10:00:00",
  ]

  idActividad: any;
  actividadHoy:any;

  // Variables de formulario
  deporte: any;
  duracion: any;
  distancia: any;
  ritmoMedio: any;
  fcMedia: any;
  descripcion: any;
  fecha: any;

  day:any;
  mes:any;
  year:any;

  successAlert: boolean = false;
  errorAlert: boolean = false;

  // Errores
  numeroErrores: number = 0;
  erroresNoVacios: any = {};
  errores = {
    fechaVacia:'',
    fechaErrorFormato:'',
    deporteVacio:'',
    duracionVacio:'',
    distanciaErrorFormato:'',
    ritmoMedioErrorFormato:'',
    fcMediaErrorFormato:'',
    descripcionVacia:'',
  }

  constructor(private rutaActiva: ActivatedRoute, private router: Router) {
    let session = sessionStorage.getItem('auth');
    if (session !== null) {
      this.userLoged = JSON.parse(session);
    }
    this.idActividad = this.rutaActiva.snapshot.params['id'];
    this.day = this.rutaActiva.snapshot.params['dia'];
    this.mes = this.rutaActiva.snapshot.params['mes'];
    this.year = this.rutaActiva.snapshot.params['year'];
    this.fecha = this.formatDateMostrar(this.day,this.mes,this.year);
  }

  /// INICIO ///
  ngOnInit(): void {
    this.getListaDeportes();
    this.getActividadModificar();
  }

  /// CONSULTAS /// 

  async getActividadModificar(){
    
    if(this.idActividad > 0 ){
      const response = await fetch('https://btop.es/server/entrenoAModificar.php', { method: 'POST', body: JSON.stringify({'id': this.idActividad})});
      this.actividadHoy = await response.json();
      this.deporte = this.actividadHoy[0].id_deporte;
      this.duracion = this.actividadHoy[0].duracion;
      this.distancia = this.actividadHoy[0].distancia;
      this.ritmoMedio = this.actividadHoy[0].ritmo_medio;
      this.fcMedia = this.actividadHoy[0].fc_media;
      this.descripcion = this.actividadHoy[0].descripcion;
    }
  }

  // Consulta del listado de deportes
  async getListaDeportes(){
    const response = await fetch('https://btop.es/server/listaDeportes.php', { method: 'POST'});
    this.listaDeportes = await response.json();
    console.log(this.listaDeportes);
  }

  async updateEntreno() {
    const fechaEnviar =  this.formatDateModificar(this.fecha);
    const response = await fetch('https://btop.es/server/updateEntreno.php', {
      method: 'POST', body: JSON.stringify({
        'fecha':  fechaEnviar, 
        'id_deporte': this.deporte, 
        'duracion': this.duracion, 
        'distancia': this.distancia, 
        'ritmo_medio': this.ritmoMedio, 
        'fc_media': this.fcMedia,
        'descripcion': this.descripcion,
        'id': this.idActividad
        })});
        this.successAlert = true;
  }

  async guardar(){
    console.log(this.numeroErrores);
    this.checkErrores();
    if(this.numeroErrores == 0){
      this.errorAlert = false;
      //if(this.idActividad > 0 ){
      //  await this.updateEntreno();
      //}
      //await this.getActividadModificar();
    }else{
      this.errorAlert = true;
    }
  }

  formatDateMostrar(day: number, month: string, year: number): string {
    interface MonthNames {
      [key: string]: string;
    }

    const monthNames: MonthNames = {
      'ENERO': 'January',
      'FEBRERO': 'February',
      'MARZO': 'March',
      'ABRIL': 'April',
      'MAYO': 'May',
      'JUNIO': 'June',
      'JULIO': 'July',
      'AGOSTO': 'August',
      'SEPTIEMBRE': 'September',
      'OCTUBRE': 'October',
      'NOVIEMBRE': 'November',
      'DICIEMBRE': 'December'
    };
    const monthNumber = new Date(`${monthNames[month]} 1, ${year}`).getMonth() + 1;
    const formattedMonth = monthNumber.toString().padStart(2, '0');
    const formattedDay = day.toString().padStart(2, '0');
    return `${formattedDay}-${formattedMonth}-${year}`;
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

  checkErrores(){

    this.numeroErrores = 0;
    const regexFecha = /^(0[1-9]|1\d|2\d|3[01])-(0[1-9]|1[0-2])-\d{4}$/;
    const regexNumeros = /^\d+$/;
    const regexNumerosDecimales = /^\d+(\.[0-5]?\d)?$/;

    this.errores = {
      fechaVacia:'',
      fechaErrorFormato:'',
      deporteVacio:'',
      duracionVacio:'',
      distanciaErrorFormato:'',
      ritmoMedioErrorFormato:'',
      fcMediaErrorFormato:'',
      descripcionVacia:'',
    }

    if(this.fecha == null || this.fecha == ''){
      this.errores.fechaVacia = "La fecha no puede estar vacía";
      this.numeroErrores++
    }
    if (!this.errores.fechaVacia && !regexFecha.test(this.fecha)) {
         this.errores.fechaErrorFormato = 'La fecha debe tener formato dd-mm-yyyy (Ej. 16-05-2023)';
         this.numeroErrores++;
    }
    if(this.deporte == null || this.deporte == ''){
      this.errores.deporteVacio = "El deporte no puede estar vacío";
      this.numeroErrores++
    }
    if(this.duracion == null || this.duracion == ''){
      this.errores.duracionVacio = "La duración no puede estar vacía";
      this.numeroErrores++
    } 

    if (!regexNumeros.test(this.distancia)) {
      this.errores.distanciaErrorFormato = 'La distancia debe ser un número';
      this.numeroErrores++;
    }

    if (!regexNumerosDecimales.test(this.ritmoMedio)) {
      this.errores.ritmoMedioErrorFormato = 'El ritmo debe ser un número separado por un punto y el decimal no superior a 59 (Ej. 3.59)';
      this.numeroErrores++;
    }

    if (!regexNumeros.test(this.fcMedia)) {
      this.errores.fcMediaErrorFormato = 'La frecuencia cardíaca debe ser un número';
      this.numeroErrores++;
    }

    if(this.descripcion == null || this.descripcion == ''){   
      this.errores.descripcionVacia = "La descripción no puede estar vacía";
      this.numeroErrores++
    }
       
    this.erroresNoVacios = Object.values(this.errores).filter(error => error !== '');
  }
}
