import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  username: string = "";
  password: string = "";
  
  constructor(private router: Router, private apiService: ApiService){

  }
}