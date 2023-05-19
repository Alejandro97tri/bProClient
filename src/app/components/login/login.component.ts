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

  /// VARIABLES ///

  // Form inputs
  username: string = "";
  password: string = "";

  // Error de login
  error: string = "Username o Password erroneos";
  errorcheck: boolean = true;
  

  /// INICIO ///
  constructor(private router: Router, private apiService: ApiService){}


  /// FUNCIONES ///

  // Función de login
  login = async() => {
    this.errorcheck = true;
    const response = await fetch('https://btop.es/server/login.php', { method: 'POST', body: JSON.stringify({ 'username': this.username, 'password': this.password})});
    const data = await response.json()
    console.log(data);
    
    if(data){
      sessionStorage.setItem("auth", JSON.stringify(data[0]))
      this.router.navigate(['']);
    }else{
      this.errorcheck = false;
    }
  }

  // Función para comprobar si se esta logueado y que actie el guard
  estaLogueado(){
    return sessionStorage.getItem('auth');
  }

}