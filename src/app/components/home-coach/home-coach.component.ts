import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-coach',
  templateUrl: './home-coach.component.html',
  styleUrls: ['./home-coach.component.css']
})
export class HomeCoachComponent implements OnInit{
  @Input() userLoged: any ;

  date= new Date(Date.now());
  listaAtletas: any;
  
  get_Date(){
    return this.date.toLocaleDateString();
  }
  
  ngOnInit(): void {
    this.getAtletas();
  }

  async getAtletas(){
    const response = await fetch('https://btop.es/server/home.php', { method: 'POST', body: JSON.stringify({'id': this.userLoged.id})});
    this.listaAtletas = await response.json();
    console.log(this.listaAtletas);
}
}
