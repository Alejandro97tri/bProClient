import { Component } from '@angular/core';

@Component({
  selector: 'app-home-nutritionist',
  templateUrl: './home-nutritionist.component.html',
  styleUrls: ['./home-nutritionist.component.css']
})
export class HomeNutritionistComponent {
  date= new Date(Date.now());

  get_Date(){
    return this.date.toLocaleDateString();
  }

  add(){
    
  }
}
