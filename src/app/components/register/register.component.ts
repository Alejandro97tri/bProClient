import { Component } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  deporte: string = '';
  username: any;
  password1: any;
  password2: any;
  nombre: any;
  apellidos: any;
  fecha_nacimiento: any;
  email: any;
  genero: string = "";
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

  registro() {
    fetch('https://btop.es/server/registro.php', {
      method: 'POST', body: JSON.stringify({
        username: this.username,
        password: this.password1,
        nombre: this.nombre,
        apellidos: this.apellidos,
        fecha_nacimiento: this.fecha_nacimiento,
        email: this.email,
        genero: this.genero,
        rol: this.rol,
        peso: this.peso,
        altura: this.altura,
      })
    });
  }

  enviar(){
    this.registro();
  }
}
