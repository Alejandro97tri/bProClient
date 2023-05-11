import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-menu-calendar',
  templateUrl: './menu-calendar.component.html',
  styleUrls: ['./menu-calendar.component.css'],
})
export class MenuCalendarComponent {
  
  /// SALIDA ///
  @Output() dateChanged = new EventEmitter<Date>();
  @Output() mes = new EventEmitter<string>();
  @Output() year = new EventEmitter<number>();

  /// VARIABLES ///
  date = new Date();
  month: string | undefined;

  /// INICIO ///
  ngOnInit() {
    this.mes.emit(this.get_Month());
    this.year.emit(this.get_Year());
  }

  /// FUNCIONES ///

  // Función para obtener el mes
  get_Month() {
    this.month = this.date
      .toLocaleString('es', { month: 'long' })
      .toUpperCase();
    this.dateChanged.emit(this.date);
    return this.month;
  }

  // Función para obtener el año
  get_Year() {
    return this.date.getFullYear();
  }

  // Función para pasar al mes anterior
  goToPreviousMonth() {
    this.date.setMonth(this.date.getMonth() - 1);
    this.get_Month();
    this.mes.emit(this.get_Month());
    this.year.emit(this.get_Year());
  }

  // Función para ir al mes siguiente
  goToNextMonth() {
    this.date.setMonth(this.date.getMonth() + 1);
    this.get_Month();
    this.mes.emit(this.get_Month());
    this.year.emit(this.get_Year());
  }

  // Función para ir al dia actual
  goToToday() {
    this.date = new Date();
    this.get_Month();
    this.mes.emit(this.get_Month());
    this.year.emit(this.get_Year());
  }
}
