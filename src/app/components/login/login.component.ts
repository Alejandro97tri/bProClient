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
  error: string = "Username o Password erroneos";
  errorcheck: boolean = true;
  
  constructor(private router: Router, private apiService: ApiService){}

  login = async() => {
    this.errorcheck = true;
    const response = await fetch('https://btop.es/server/login.php', { method: 'POST', body: JSON.stringify({ 'username': this.username, 'password': this.password})});
    const data = await response.json()
    if(data){
      sessionStorage.setItem("auth", JSON.stringify(data))
      this.router.navigate(['']);
    }else{
      this.errorcheck = false;
    }
  }

  estaLogueado(){
    return sessionStorage.getItem('auth');
  }

}