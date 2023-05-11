import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-detalle-dia',
  templateUrl: './detalle-dia.component.html',
  styleUrls: ['./detalle-dia.component.css'],
})
export class DetalleDiaComponent {

  /// VARIABLES
  
  day: number = 0;
  mes: string = '';
  year: number = 0;

  /// INICIO ///
  constructor(private rutaActiva: ActivatedRoute) {
    this.day = this.rutaActiva.snapshot.params['dia'];
    this.mes = this.rutaActiva.snapshot.params['mes'];
    this.year = this.rutaActiva.snapshot.params['year'];
  }
}
