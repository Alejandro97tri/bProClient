import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-detalle-dia',
  templateUrl: './detalle-dia.component.html',
  styleUrls: ['./detalle-dia.component.css'],
})
export class DetalleDiaComponent implements OnInit{

  /// VARIABLES
  userLoged:any;

  addVisible: boolean = false;

  id: number = 0;
  day: number = 0;
  mes: string = '';
  year: number = 0;
  formattedMonth: any;

  listaDeportes:any;
  listaEntrenosHoy: any;
  listaNutrisHoy: any;
  fechaSearch: any;
  date: Date = new Date;

  /// INICIO ///
  constructor(private rutaActiva: ActivatedRoute, private router: Router) {
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
    console.log(this.compareDates(this.date));
    this.getListaEntrenos();
    this.getListaDeportes();
    this.getListaNutricion();    
  }
  

  // Consulta de la lista de deportes
  async getListaDeportes(){
    const response = await fetch('https://btop.es/server/listaDeportes.php', { method: 'POST'});
    this.listaDeportes = await response.json();
    console.log(this.listaDeportes);
  }

  async getListaEntrenos(){
      const response = await fetch('https://btop.es/server/listaActividadesDiaAtleta.php', { method: 'POST', body: JSON.stringify({'id': this.id, 'fecha': this.fechaSearch})});
      this.listaEntrenosHoy = await response.json();

    console.log(this.listaEntrenosHoy);
  }

  async getListaNutricion(){

      const response = await fetch('https://btop.es/server/listaNutrisDiaAtleta.php', { method: 'POST', body: JSON.stringify({'id': this.id, 'fecha': this.fechaSearch})});
      this.listaNutrisHoy = await response.json();
    this.listaNutrisHoy.sort((a: { hora: number; }, b: { hora: number; }) => {
      if (a.hora < b.hora) return -1;
      if (a.hora > b.hora) return 1;
      return 0;
    });
    console.log(this.listaNutrisHoy);
  }

  goToFormEnterno(){
    this.router.navigate(['formentreno', this.id, 0, this.day,this.mes,this.year]);
  }

  goToFormActividadModificar(id: any){
    this.router.navigate(['formentreno', this.id, id, this.day,this.mes,this.year]);
  }

  goToFormDieta(){
    this.router.navigate(['formnutricion',this.id, 0,this.day,this.mes,this.year]);
  }

  goToFormDietaModificar(id:any){
    this.router.navigate(['formnutricion',this.id, id,this.day,this.mes,this.year]);
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

  formatDateNow(date: Date): string {
    let year = date.getFullYear();
    let month = date.getMonth() + 1; // Los meses empiezan en 0
    let day = date.getDate();
    let monthStr = month < 10 ? `0${month}` : `${month}`; // Añadir un 0 al mes si es menor a 10
    let dayStr = day < 10 ? `0${day}` : `${day}`; // Añadir un 0 al día si es menor a 10
    return `${year}-${monthStr}-${dayStr}`;
  }

  compareDates(date1: Date) {
    const date1Str = this.formatDateNow(date1);
    const date2Str = this.fechaSearch;
    if (date1Str === date2Str) {
      this.addVisible=true;
    } else if (date1Str < date2Str) {
      this.addVisible=true;
    } else {
      this.addVisible=false;
    }
  }
}
