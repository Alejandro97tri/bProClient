import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginComponent]
})
export class LoginComponent {

  username: string = "";
  password: string = "";
  
  constructor(private router: Router, private apiService: ApiService){}

  login = async() => {
    const response = await fetch('https://btop.es/server/login.php', { method: 'POST', body: JSON.stringify({ 'username': this.username, 'password': this.password})});
    const data = await response.json()
    if(data){
      console.log(data)
      sessionStorage.setItem("auth", data[0])
      this.router.navigate(['']);
    }
  }

  estaLogueado(){
    return sessionStorage.getItem('auth');
  }

}