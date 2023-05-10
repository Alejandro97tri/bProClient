import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  userLoged: any;
  userInfoActive: boolean = false;
  userInfo: any;

  constructor() {
    let session = sessionStorage.getItem('auth');
    if (session !== null) {
      this.userLoged = JSON.parse(session);
    }
  }

  setUserInfoActive(e: any){
    this.userInfoActive = e;
  }

  setUserInfo(e: any){
    this.userInfo = e;
  }

}

