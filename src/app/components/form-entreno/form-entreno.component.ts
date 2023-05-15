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

  constructor(private rutaActiva: ActivatedRoute, private router: Router) {
    let session = sessionStorage.getItem('auth');
    if (session !== null) {
      this.userLoged = JSON.parse(session);
    }
    this.idActividad = this.rutaActiva.snapshot.params['id'];
    this.day = this.rutaActiva.snapshot.params['dia'];
    this.mes = this.rutaActiva.snapshot.params['mes'];
    this.year = this.rutaActiva.snapshot.params['year'];
    this.fecha = this.formatDate(this.day,this.mes,this.year);
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

  formatDate(day: number, month: string, year: number): string {
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
}
