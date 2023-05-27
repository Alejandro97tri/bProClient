import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-amistades',
  templateUrl: './amistades.component.html',
  styleUrls: ['./amistades.component.css']
})
export class AmistadesComponent implements OnInit{

  userLoged: any;

  listaUsuarios: any;
  entrenador: any;
  nutricionista: any;

  successAlert: boolean = false;
  errorMismoRol: boolean = false;
  errorContactoExistente: boolean = false;
  errorUsuarioConProfesionales: boolean = false;
  errorEntrenadorExistente: boolean = false;
  errorNutricionistaExistente: boolean = false;
  errorSoloAtletas: boolean = false;

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
  }

  async getEntrenador() {
    const response = await fetch('https://btop.es/server/selectContactos.php', { method: 'POST', body: JSON.stringify({ 'id': this.userLoged.trainer }) });
    this.entrenador = await response.json();
    console.log(this.entrenador);
  }

  async getNutricionista() {
    const response = await fetch('https://btop.es/server/selectContactos.php', { method: 'POST', body: JSON.stringify({ 'id': this.userLoged.nutritionist }) });
    this.nutricionista = await response.json();
  }


  async insertContacto() {
    let myInit: any = { method: 'POST' }
    switch (this.usuarioBuscado.rol) {
      case 'ATH':
        if (this.userLoged.rol == 'TRA') {
          myInit.body = JSON.stringify({ 'id_enviado': this.userLoged.id, 'id_recibido': this.usuarioBuscado.id });
        }
        if (this.userLoged.rol == 'NUT') {
          myInit.body = JSON.stringify({ 'id_enviado': this.userLoged.id, 'id_recibido': this.usuarioBuscado.id });
        }
        break;

      case 'TRA':
        if (this.userLoged.rol == 'NUT') {
          break;
        }
        if (this.userLoged.rol == 'ATH') {
          myInit.body = JSON.stringify({ 'id_enviado': this.userLoged.id, 'id_recibido': this.usuarioBuscado.id });
        }
        break;

      case 'NUT':
        if (this.userLoged.rol == 'TRA') {
          break;
        }
        if (this.userLoged.rol == 'ATH') {
          myInit.body = JSON.stringify({ 'id_enviado': this.userLoged.id, 'id_recibido': this.usuarioBuscado.id });
        }
        break;
    }
    await fetch('https://btop.es/server/insertContacto.php', myInit)
    .then(response => {
      this.successAlert = true; 
    });

  }


  buscar() {
    this.usuarioEncontrado = false;
    this.errorMismoRol = false;
    this.errorContactoExistente = false;
    this.errorNutricionistaExistente = false;
    this.errorEntrenadorExistente = false;
    this.errorUsuarioConProfesionales = false;
    this.usuarioBuscado = this.listaUsuarios.find((usuario: { username: any; }) => usuario.username.toLowerCase() == this.busqueda.toLowerCase());

    if ((this.usuarioBuscado.trainer && this.userLoged.rol == "TRA") || (this.usuarioBuscado.nutritionist && this.userLoged.rol == "NUT")) {
      this.errorUsuarioConProfesionales = true;
    } else {
      if (this.usuarioBuscado.rol == this.userLoged.rol) {
        this.errorMismoRol = true;

      } else if (this.userLoged.rol !== 'ATH' && this.usuarioBuscado.rol !== "ATH") {
        this.errorSoloAtletas = true;

      } else if (this.entrenador || this.nutricionista) {
        if (this.usuarioBuscado.username == this.entrenador[0].username || this.usuarioBuscado.username == this.nutricionista[0].username) {
          this.errorContactoExistente = true;
        }

      } else if (this.usuarioBuscado.rol == 'TRA' && this.entrenador) {
        this.errorEntrenadorExistente = true;

      } else if (this.usuarioBuscado.rol == 'NUT' && this.nutricionista) {
        this.errorNutricionistaExistente = true;

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
  }

  eliminarEntrenador() {
    fetch('https://btop.es/server/deleteTrainer.php', { method: 'POST', body: JSON.stringify({ 'id': this.userLoged.id }) })
      .then(() => {
        return fetch('https://btop.es/server/userInfo.php', { method: 'POST', body: JSON.stringify({ 'id': this.userLoged.id }) });
      })
      .then(response => response.json())
      .then(updatedUser => {
        this.entrenador = null;
        this.userLoged = updatedUser[0];
        sessionStorage.setItem("auth", JSON.stringify(this.userLoged))
        console.log(this.userLoged);
      });
  }

  eliminarNutricionista() {
    fetch('https://btop.es/server/deleteNutritionist.php', { method: 'POST', body: JSON.stringify({ 'id': this.userLoged.id }) })
      .then(() => {
        return fetch('https://btop.es/server/userInfo.php', { method: 'POST', body: JSON.stringify({ 'id': this.userLoged.id }) });
      })
      .then(response => response.json())
      .then(updatedUser => {
        this.nutricionista = null;
        this.userLoged = updatedUser[0];
        sessionStorage.setItem("auth", JSON.stringify(this.userLoged))
        console.log(this.userLoged);
      });
  }
  

  enviarPeticion() {
    this.insertContacto();
  }

}
