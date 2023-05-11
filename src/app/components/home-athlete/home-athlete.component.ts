import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-athlete',
  templateUrl: './home-athlete.component.html',
  styleUrls: ['./home-athlete.component.css']
})
export class HomeAthleteComponent implements OnInit, OnChanges {

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


  /// INICIO ///
  constructor(private router: Router){}
  
  ngOnInit() {
    this.generateCalendar();
  }


  /// CAMBIOS ///
  ngOnChanges(changes: SimpleChanges): void {
    this.generateCalendar();
  }

  onDateChanged(date: Date) {
    this.selectedDate = date;
    this.generateCalendar();
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
}