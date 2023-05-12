import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-detalle-dia',
  templateUrl: './detalle-dia.component.html',
  styleUrls: ['./detalle-dia.component.css'],
})
export class DetalleDiaComponent implements OnInit{

  /// VARIABLES
  userLoged:any;

  id: number = 0;
  day: number = 0;
  mes: string = '';
  year: number = 0;
  formattedMonth: any;

  listaDeportes:any;
  listaEntrenosHoy: any;
  fechaSearch: any;

  /// INICIO ///
  constructor(private rutaActiva: ActivatedRoute) {
    let session = sessionStorage.getItem('auth');
    if (session !== null) {
      this.userLoged = JSON.parse(session);
    }
    this.id = this.rutaActiva.snapshot.params['id'];
    this.day = this.rutaActiva.snapshot.params['dia'];
    this.mes = this.rutaActiva.snapshot.params['mes'];
    this.year = this.rutaActiva.snapshot.params['year'];
    this.fechaSearch = this.formatDate(this.day,this.mes,this.year);
  }
  
  ngOnInit(): void {
    this.getListaEntrenos();
    this.getListaDeportes();
  }
  

  // Consulta de la lista de deportes
  async getListaDeportes(){
    const response = await fetch('https://btop.es/server/listaDeportes.php', { method: 'POST'});
    this.listaDeportes = await response.json();
    console.log(this.listaDeportes);
  }

  async getListaEntrenos(){
    
    if(this.id == 0 ){
      const response = await fetch('https://btop.es/server/listaActividadesDiaAtleta.php', { method: 'POST', body: JSON.stringify({'id': this.userLoged.id, 'fecha': this.fechaSearch})});
      this.listaEntrenosHoy = await response.json();
    }else{
      const response = await fetch('https://btop.es/server/listaActividadesDiaAtleta.php', { method: 'POST', body: JSON.stringify({'id': this.id, 'fecha': this.fechaSearch})});
      this.listaEntrenosHoy = await response.json();
    }
    console.log(this.listaEntrenosHoy);
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
    this.formattedMonth = monthNumber.toString().padStart(2, '0');
    const formattedDay = day.toString().padStart(2, '0');
    return `${year}-${this.formattedMonth}-${formattedDay}`;
  }
}
