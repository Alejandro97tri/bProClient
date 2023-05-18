import { Component } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  deporte: string = '';
  username: any;
  password: any;
  nombre: any;
  apellidos: any;
  fecha_nacimiento: any;
  email: any;
  genero: string = '';
  rol: string = '';
  peso: any;
  altura: any;


  listaDeportes: any;

  ngOnInit(): void {
    this.getListaDeportes();
  }

  async getListaDeportes() {
    const response = await fetch('https://btop.es/server/listaDeportes.php', { method: 'POST' });
    this.listaDeportes = await response.json();
    console.log(this.listaDeportes);
  }

  enviar(){
    
  }
}
