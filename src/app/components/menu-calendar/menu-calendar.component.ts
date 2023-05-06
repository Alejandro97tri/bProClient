import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-menu-calendar',
  templateUrl: './menu-calendar.component.html',
  styleUrls: ['./menu-calendar.component.css']
})
export class MenuCalendarComponent {

  @Output() dateChanged = new EventEmitter<Date>();
  @Output() mes = new EventEmitter<string>();
  @Output() year = new EventEmitter<number>();

  date = new Date();
  month: string | undefined;

  ngOnInit() {
    this.mes.emit(this.get_Month());
    this.year.emit(this.get_Year());
  }

  get_Month() {
    this.month = this.date.toLocaleString('es', { month: 'long' }).toUpperCase();
    this.dateChanged.emit(this.date);
    return this.month;
  }

  get_Year() {
    return this.date.getFullYear();
  }

  goToPreviousMonth() {
    this.date.setMonth(this.date.getMonth() - 1);
    this.get_Month();
    this.mes.emit(this.get_Month());
    this.year.emit(this.get_Year());
  }

  goToNextMonth() {
    this.date.setMonth(this.date.getMonth() + 1);
    this.get_Month();
    this.mes.emit(this.get_Month());
    this.year.emit(this.get_Year());
  }

  goToToday() {
    this.date = new Date();
    this.get_Month();
    this.mes.emit(this.get_Month());
    this.year.emit(this.get_Year());
  }
}