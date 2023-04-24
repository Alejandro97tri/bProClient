import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-menu-calendar',
  templateUrl: './menu-calendar.component.html',
  styleUrls: ['./menu-calendar.component.css']
})
export class MenuCalendarComponent {

  @Output() dateChanged = new EventEmitter<Date>();

  date = new Date();
  month: string | undefined;

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
  }

  goToNextMonth() {
    this.date.setMonth(this.date.getMonth() + 1);
    this.get_Month();
  }

  goToToday() {
    this.date = new Date();
    this.get_Month();
  }
}
