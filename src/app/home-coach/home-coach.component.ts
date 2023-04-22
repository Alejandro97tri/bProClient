import { Component } from '@angular/core';

@Component({
  selector: 'app-home-coach',
  templateUrl: './home-coach.component.html',
  styleUrls: ['./home-coach.component.css']
})
export class HomeCoachComponent {
  date= new Date(Date.now());

  get_Date(){
    return this.date.toLocaleDateString();
  }
}
