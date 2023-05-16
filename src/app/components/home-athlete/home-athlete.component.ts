import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home-athlete',
  templateUrl: './home-athlete.component.html',
  styleUrls: ['./home-athlete.component.css']
})
export class HomeAthleteComponent implements OnInit, OnChanges {

  @Input() userLoged: any ;

  /// VARIABLEs ///
  
  // Lista de dias de la semana
  daysOfWeek: Array<string> = [
    "LUNES",
    "MARTES",
    "MIÉRCOLES",
    "JUEVES",
    "VIERNES",
    "SÁBADO",
    "DOMINGO",
  ]

  // 
  selectedDate = new Date();
  date = new Date();
  weeks: Array<Array<number | null>> = [];
  firstDayOfWeek = 1;

  // Dias que no se van a rellenar por que forman parte del otro mes
  emptyDays: Array<any> = new Array(this.firstDayOfWeek - 1).fill(null);

  year:number = 0;
  mes:string = '';
  offset: number = 0;

  listaEntrenos: any;
  listaNutricion: any;

  fechaSearch: any;
  dateNow: Date = new Date;

  /// INICIO ///
  constructor(private router: Router){}
  
  ngOnInit() {
    this.generateCalendar();
    this.getListaEntrenos();
    this.getListaNutricion();
  }


  /// CAMBIOS ///
  ngOnChanges(changes: SimpleChanges): void {
    this.generateCalendar();
  }

  onDateChanged(date: Date) {
    this.selectedDate = date;
    this.generateCalendar();
  }


  async getListaEntrenos(){
    const response = await fetch('https://btop.es/server/homeListaActividadesAtleta.php', { method: 'POST', body: JSON.stringify({'id': this.userLoged.id})});
    this.listaEntrenos = await response.json();
    console.log(this.listaEntrenos);
  }

  async getListaNutricion(){
    const response = await fetch('https://btop.es/server/homeListaNutricionAtleta.php', { method: 'POST', body: JSON.stringify({'id': this.userLoged.id})});
    this.listaNutricion = await response.json();
    console.log(this.listaNutricion);
  }

  /// FUNCIONES ///

  // Función para generar el calendario
  generateCalendar() {
    const month = this.selectedDate.getMonth();
    const year = this.selectedDate.getFullYear();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const weeks: Array<Array<number | null>> = [[]];

    this.firstDayOfWeek = 1;

    this.offset = (firstDay - this.firstDayOfWeek + 7) % 7;

    for (let i = 0; i < this.offset; i++) {
      weeks[0].push(null);
    }

    for (let i = 1; i <= daysInMonth; i++) {
      const dayOfWeek = new Date(year, month, i).getDay();
      if (dayOfWeek === this.firstDayOfWeek) {
        weeks.push([]);
      }
      weeks[weeks.length - 1].push(i);
    }

    this.weeks = weeks;
  }

  goToDay(day:number|null){
  this.router.navigate(['entrenamiento',0,day,this.mes,this.year]);
  }

  setYear(e:any){
    this.year = e;
  }

  setMes(e:any){
    this.mes = e;
  }

  getEntreno(day: number){
    this.fechaSearch = this.formatDate(day,this.mes,this.year);
    return !this.listaEntrenos || !this.listaEntrenos.find((e: { fecha: string; }) => e.fecha === this.fechaSearch);
  }

  getNutricion(day: number){
    this.fechaSearch = this.formatDate(day,this.mes,this.year);
    return !this.listaNutricion || !this.listaNutricion.find((e: { fecha: string; }) => e.fecha === this.fechaSearch);
  }

  
  formatDateNow(date: Date): string {
    let year = date.getFullYear();
    let month = date.getMonth() + 1; // Los meses empiezan en 0
    let day = date.getDate();
    let monthStr = month < 10 ? `0${month}` : `${month}`; // Añadir un 0 al mes si es menor a 10
    let dayStr = day < 10 ? `0${day}` : `${day}`; // Añadir un 0 al día si es menor a 10
    return `${year}-${monthStr}-${dayStr}`;
  }

  formatDate(day: number|null, month: string, year: number): string {
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
    if(day!==null){
      const formattedDay = day.toString().padStart(2, '0');
      return `${year}-${formattedMonth}-${formattedDay}`;
    }else{
      return `Fecha erronea`;
    }
  }
  
}