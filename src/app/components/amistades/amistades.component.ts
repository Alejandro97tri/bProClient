import { Component } from '@angular/core';

@Component({
  selector: 'app-amistades',
  templateUrl: './amistades.component.html',
  styleUrls: ['./amistades.component.css']
})
export class AmistadesComponent {

  userLoged: any;

  listaUsuarios: any;
  entrenador: any;
  nutricionista: any;

  errorMismoRol: boolean = false;
  errorProfesionalExistente: boolean = false;

  usuarioBuscado: any = '';
  usuarioEncontrado: boolean = false;
  busqueda: any;
  rol: any;
  constructor() {
    let session = sessionStorage.getItem('auth');
    if (session !== null) {
      this.userLoged = JSON.parse(session);
    }
  }

  ngOnInit(): void {
    this.getListaUsuarios();
    console.log(this.usuarioBuscado);
    if (this.userLoged.trainer !== null) {
      this.getEntrenador();
    }
    if (this.userLoged.nutritionist !== null) {
      this.getNutricionista();
    }
  }


  /// CONSULTAS ///

  // Consulta de los clientes del entrenador
  async getListaUsuarios() {
    const response = await fetch('https://btop.es/server/selectUsers.php', { method: 'POST', body: JSON.stringify({}) });
    this.listaUsuarios = await response.json();
    console.log(this.listaUsuarios);
  }

  async getEntrenador() {
    const response = await fetch('https://btop.es/server/selectContactos.php', { method: 'POST', body: JSON.stringify({ 'id': this.userLoged.trainer }) });
    this.entrenador = await response.json();
    console.log(this.entrenador);
  }

  async getNutricionista() {
    const response = await fetch('https://btop.es/server/selectContactos.php', { method: 'POST', body: JSON.stringify({ 'id': this.userLoged.nutritionist }) });
    this.nutricionista = await response.json();
    console.log(this.nutricionista);
  }

  async insertContacto() {
    let myInit: any = { method: 'POST' }

    switch (this.usuarioBuscado.rol) {
      case 'ATH':
        if (this.userLoged.rol == 'TRA') {
          myInit.body = JSON.stringify({
            'id_ath': this.usuarioBuscado.id,
            'id_nut': null,
            'id_tra': this.userLoged.id,
            'ath_username': this.usuarioBuscado.username,
            'nut_username': null,
            'tra_username': this.userLoged.username,
          });
        }
        if (this.userLoged.rol == 'NUT') {
          myInit.body = JSON.stringify({
            'id_ath': this.usuarioBuscado.id,
            'id_nut': this.userLoged.id,
            'id_tra': null,
            'ath_username': this.usuarioBuscado.username,
            'nut_username': this.userLoged.username,
            'tra_username': null,
          });
        }
        break;
      case 'TRA':
        if (this.userLoged.rol == 'NUT') {
          break;
        }
        if (this.userLoged.rol == 'ATH') {
          myInit.body = JSON.stringify({
            'id_ath': this.userLoged.id,
            'id_nut': null,
            'id_tra': this.usuarioBuscado.id,
            'ath_username': this.userLoged.username,
            'nut_username': null,
            'tra_username': this.usuarioBuscado.username,
          });
        }
        break;
      case 'NUT':
        if (this.userLoged.rol == 'TRA') {
          break;
        }
        if (this.userLoged.rol == 'ATH') {
          myInit.body = JSON.stringify({
            'id_ath': this.userLoged.id,
            'id_nut': this.usuarioBuscado.id,
            'id_tra': null,
            'ath_username': this.userLoged.username,
            'nut_username': this.usuarioBuscado.username,
            'tra_username': null,
          });
        }
        break;
    }
    await fetch('https://btop.es/server/insertContacto.php', myInit);
   
  }


  buscar() {
    this.usuarioEncontrado = false;
    this.errorMismoRol = false;
    this.errorProfesionalExistente = false;
    this.usuarioBuscado = this.listaUsuarios.find((usuario: { username: any; }) => usuario.username.toLowerCase() == this.busqueda.toLowerCase());

    if (this.usuarioBuscado.rol == this.userLoged.rol) {
      this.errorMismoRol = true;

    } else if (this.usuarioBuscado.username == this.entrenador[0].username || this.usuarioBuscado.username == this.nutricionista[0].username) {
      this.errorProfesionalExistente = true;

    } else if (this.usuarioBuscado) {
      switch (this.usuarioBuscado.rol) {
        case 'ATH':
          this.rol = 'Atleta';
          break;
        case 'TRA':
          this.rol = 'Entrenador';
          break;
        case 'NUT':
          this.rol = 'Nutricionista';
      }
      this.usuarioEncontrado = true;
    }
    console.log(this.usuarioBuscado);
  }

  enviarPeticion() {
    this.insertContacto();
  }

}
