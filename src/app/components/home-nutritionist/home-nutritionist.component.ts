import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-home-nutritionist',
  templateUrl: './home-nutritionist.component.html',
  styleUrls: ['./home-nutritionist.component.css']
})
export class HomeNutritionistComponent {
  @Input() userLoged: any ;

  date= new Date(Date.now());
  listaNutris: any;
  listaNutrisHoy: any;
  
  get_Date(){
    return this.date.toLocaleDateString();
  }
  
  ngOnInit(): void {
    this.getListaNutris();
    this.getListaNutrisHoy();
  }

  async getListaNutrisHoy(){
    const response = await fetch('https://btop.es/server/homeListaNutrisHoy.php', { method: 'POST', body: JSON.stringify({'id': this.userLoged.id})});
    this.listaNutrisHoy = await response.json();
    console.log(this.listaNutrisHoy);
  }

  async getListaNutris(){
    const response = await fetch('https://btop.es/server/homeListaNutris.php', { method: 'POST', body: JSON.stringify({'id': this.userLoged.id})});
    this.listaNutris = await response.json();
    console.log(this.listaNutris);
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
