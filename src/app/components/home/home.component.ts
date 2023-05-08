import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  userLoged: any;

  constructor() {
    let session = sessionStorage.getItem('auth');
    if (session !== null) {
      this.userLoged = JSON.parse(session);
    }
  }
}

