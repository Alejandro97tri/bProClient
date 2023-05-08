import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  userLoged: any;

  
  constructor() {
    let session = sessionStorage.getItem('auth');
    if (session !== null) {
      this.userLoged = JSON.parse(session);
      console.log(this.userLoged.id);
      
    }
  }

  ngOnInit () {
    this.getAtletas();
  }

  async getAtletas(){

      const response = await fetch('https://btop.es/server/home.php', { method: 'POST', body: JSON.stringify({'id': this.userLoged.id})});
      const data = await response.json();
      console.log(data);
  }
}

