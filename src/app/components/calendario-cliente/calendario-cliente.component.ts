import { Component, Input, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-calendario-cliente',
  templateUrl: './calendario-cliente.component.html',
  styleUrls: ['./calendario-cliente.component.css']
})
export class CalendarioClienteComponent {


  /// INICIO ///
  @Input() userLoged: any ;
  
  /// VARIABLEs ///
  
  idUser: any ;
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


  /// INICIO ///
  constructor(private router: Router, private rutaActiva: ActivatedRoute){}
  
  ngOnInit() {
    this.idUser = this.rutaActiva.snapshot.params['id'];
    console.log(this.idUser);
    
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
    const response = await fetch('https://btop.es/server/homeListaActividadesAtleta.php', { method: 'POST', body: JSON.stringify({'id': this.idUser})});
    this.listaEntrenos = await response.json();
    console.log(this.listaEntrenos);
  }

  async getListaNutricion(){
    const response = await fetch('https://btop.es/server/homeListaNutricionAtleta.php', { method: 'POST', body: JSON.stringify({'id': this.idUser})});
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
  this.router.navigate(['entrenamiento',day,this.mes,this.year]);
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
    return `${year}-${formattedMonth}-${formattedDay}`;
  }
  
}