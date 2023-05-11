import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  /// VARIABLEs ///

  // Usuario de la sesion
  userLoged: any;

  // Informacion de usario pulsado
  userInfoActive: boolean = false;

  // Usuario pulsado
  userInfo: any;


  /// INICIO ///
  constructor() {
    let session = sessionStorage.getItem('auth');
    if (session !== null) {
      this.userLoged = JSON.parse(session);
    }
  }


  /// FUNCIONES ///

  // Mostrar ocultar el infouser
  setUserInfoActive(e: any){
    this.userInfoActive = e;
  }

  // Definir el usuario pulsado
  setUserInfo(e: any){
    this.userInfo = e;
  }

}

