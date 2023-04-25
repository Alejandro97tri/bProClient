import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  day: number = 0;
  mes: string = '';
  year: number = 0;

  constructor(private rutaActiva: ActivatedRoute) {
    this.day = this.rutaActiva.snapshot.params['dia'];
    this.mes = this.rutaActiva.snapshot.params['mes'];
    this.year = this.rutaActiva.snapshot.params['year'];
  }
}
