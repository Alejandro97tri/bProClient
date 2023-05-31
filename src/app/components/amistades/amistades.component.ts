import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-amistades',
  templateUrl: './amistades.component.html',
  styleUrls: ['./amistades.component.css']
})
export class AmistadesComponent implements OnInit {

  userLoged: any;

  listaUsuarios: any;
  listaPeticiones: any;
  entrenador: any = [{
    nombre: '',
    apellidos: '',
  }];
  nutricionista: any = [{
    nombre: '',
    apellidos: '',
  }];

  successAlert: boolean = false;

  errorMismoRol: boolean = false;
  errorContactoExistente: boolean = false;
  errorUsuarioConProfesionales: boolean = false;
  errorEntrenadorExistente: boolean = false;
  errorNutricionistaExistente: boolean = false;
  errorSoloAtletas: boolean = false;
  errorPeticionEnviada: boolean = false;
  errorPeticionEsperando: boolean = false;

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
    this.getPeticiones();
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
  }

  async getNutricionista() {
    const response = await fetch('https://btop.es/server/selectContactos.php', { method: 'POST', body: JSON.stringify({ 'id': this.userLoged.nutritionist }) });
    this.nutricionista = await response.json()
  }

  async getPeticiones() {
    const response = await fetch('https://btop.es/server/selectPeticiones.php', { method: 'POST' });
    this.listaPeticiones = await response.json();
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
    let errores = 0;
    this.usuarioEncontrado = false;
    this.errorMismoRol = false;
    this.errorContactoExistente = false;
    this.errorUsuarioConProfesionales = false;
    this.errorEntrenadorExistente = false;
    this.errorNutricionistaExistente = false;
    this.errorSoloAtletas = false;
    this.errorPeticionEnviada = false;
    this.errorPeticionEsperando = false;
    this.usuarioBuscado = this.listaUsuarios.find((usuario: { username: any; }) => usuario.username.toLowerCase() == this.busqueda.toLowerCase());

    if ((this.usuarioBuscado.trainer && this.userLoged.rol == "TRA") || (this.usuarioBuscado.nutritionist && this.userLoged.rol == "NUT")) {
      this.errorUsuarioConProfesionales = true;
    } else {
      for (let peticion of this.listaPeticiones) {
        if (this.usuarioBuscado.id == peticion.id_recibido && peticion.id_enviado == this.userLoged.id) {
          this.errorPeticionEnviada = true;
          errores++;
        }
        if (this.usuarioBuscado.id == peticion.id_enviado && peticion.id_recibido == this.userLoged.id) {
          this.errorPeticionEsperando = true;
          errores++;
        }
      }
      if (this.usuarioBuscado.rol == this.userLoged.rol) {
        this.errorMismoRol = true;
        errores++;
      } else if (this.userLoged.rol !== 'ATH' && this.usuarioBuscado.rol !== "ATH") {
        this.errorSoloAtletas = true;
        errores++;
      } else if (this.entrenador || this.nutricionista) {
        if (this.usuarioBuscado.username == this.entrenador[0].username || this.usuarioBuscado.username == this.nutricionista[0].username) {
          this.errorContactoExistente = true;
          errores++;
        } else if (this.usuarioBuscado.rol == 'TRA' && this.entrenador[0].username !== undefined) {
          this.errorEntrenadorExistente = true;
          errores++;
        } else if (this.usuarioBuscado.rol == 'NUT' && this.nutricionista[0].username !== undefined) {
          this.errorNutricionistaExistente = true;
          errores++;
        } else if (this.usuarioBuscado && errores == 0) {
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
      }
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
      });
  }


  async enviarPeticion() {
    await this.insertContacto();
    await this.getPeticiones();
    this.usuarioBuscado = '';
    this.usuarioEncontrado = false;
  }


}
