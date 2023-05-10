import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-home-coach',
  templateUrl: './home-coach.component.html',
  styleUrls: ['./home-coach.component.css']
})
export class HomeCoachComponent implements OnInit{
  @Output() userInfoActiveEmitter: EventEmitter<any> = new EventEmitter();
  @Output() userInfoEmitter: EventEmitter<any> = new EventEmitter();

  @Input() userLoged: any ;

  date= new Date(Date.now());
  listaAtletas: any;
  listaActividades: any;
  listaDeportes: any;
  
  get_Date(){
    return this.date.toLocaleDateString();
  }
  
  ngOnInit(): void {
    this.getListaDeportes();
    this.getListaAtletas();
    this.getListaAcatividades();
  }

  async getListaAtletas(){
    const response = await fetch('https://btop.es/server/homeListaAtletas.php', { method: 'POST', body: JSON.stringify({'id': this.userLoged.id})});
    this.listaAtletas = await response.json();
    console.log(this.listaAtletas);
  }

  async getListaAcatividades(){
    const response = await fetch('https://btop.es/server/homeListaActividadesHoy.php', { method: 'POST', body: JSON.stringify({'id': this.userLoged.id})});
    this.listaActividades = await response.json();
    console.log(this.listaActividades);
  }

  async getListaDeportes(){
    const response = await fetch('https://btop.es/server/listaDeportes.php', { method: 'POST'});
    this.listaDeportes = await response.json();
    console.log(this.listaDeportes);
  }

  userInfo(user: any){
    this.userInfoActiveEmitter.emit(true);
    this.userInfoEmitter.emit(user);
  }

  calcularEdad(fechaNacimiento: string): number {
    const fechaActual = new Date();
    const fechaNacimientoDate = new Date(fechaNacimiento);
    let edad = fechaActual.getFullYear() - fechaNacimientoDate.getFullYear();
    const mesActual = fechaActual.getMonth();
    const mesNacimiento = fechaNacimientoDate.getMonth();
    if (mesNacimiento > mesActual || (mesNacimiento === mesActual && fechaNacimientoDate.getDate() > fechaActual.getDate())) {
      edad--;
    }
    return edad;
  }
}
