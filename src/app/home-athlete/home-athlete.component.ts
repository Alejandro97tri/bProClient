import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-athlete',
  templateUrl: './home-athlete.component.html',
  styleUrls: ['./home-athlete.component.css']
})
export class HomeAthleteComponent implements OnInit, OnChanges {

  constructor(private router: Router){

  }
  
  daysOfWeek: Array<string> = [
    "LUNES",
    "MARTES",
    "MIÉRCOLES",
    "JUEVES",
    "VIERNES",
    "SÁBADO",
    "DOMINGO",
  ]
  selectedDate = new Date();
  date = new Date();
  weeks: Array<Array<number | null>> = [];
  firstDayOfWeek = 1;
  emptyDays: Array<any> = new Array(this.firstDayOfWeek - 1).fill(null);
  year:number = 0;
  mes:string = '';
  offset: number = 0;
  ngOnChanges(changes: SimpleChanges): void {
    this.generateCalendar();
  }
  
  ngOnInit() {
    this.generateCalendar();
  }

  onDateChanged(date: Date) {
    this.selectedDate = date;
    this.generateCalendar();
  }

  generateCalendar() {
    const month = this.selectedDate.getMonth();
    const year = this.selectedDate.getFullYear();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const weeks: Array<Array<number | null>> = [[]];

    // Determine the index of the first day of the week (0 for Sunday, 1 for Monday, etc.)
    this.firstDayOfWeek = 1;

    // Determine the offset from the first day of the month to the first day of the week
    this.offset = (firstDay - this.firstDayOfWeek + 7) % 7;

    // Add empty cells before the first day of the month if necessary
    for (let i = 0; i < this.offset; i++) {
      weeks[0].push(null);
    }

    // Add the days of the month to the calendar
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