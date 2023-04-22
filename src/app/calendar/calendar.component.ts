import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent {

  date = new Date();
  weeks: Array<Array<number | null>> = [];
  firstDayOfWeek:number  = 1;
  emptyDays: Array<any> = new Array(this.firstDayOfWeek - 1).fill(null);

  ngOnInit() {
    this.generateCalendar();
  }

  generateCalendar() {
    const month = this.date.getMonth();
    const year = this.date.getFullYear();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const weeks: Array<Array<number | null>> = [[]];

    // Determine the index of the first day of the week (0 for Sunday, 1 for Monday, etc.)
    this.firstDayOfWeek = 1;

    // Determine the offset from the first day of the month to the first day of the week
    const offset = (firstDay - this.firstDayOfWeek + 7) % 7;

    // Add empty cells before the first day of the month if necessary
    for (let i = 0; i < offset; i++) {
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

    // Add empty cells after the last day of the month if necessary
    const lastWeek = weeks[weeks.length - 1];
    for (let i = lastWeek.length; i < 7; i++) {
      lastWeek.push(null);
    }

    this.weeks = weeks;
  }
}
