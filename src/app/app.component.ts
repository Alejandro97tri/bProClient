import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'BTOP';
  showMenu: boolean = true;

  constructor(private router: Router){}
  
  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if (event.url.includes('/login') || event.url.includes('/register')) {
          setTimeout(() => {
            this.showMenu = false;
          }, 0);
        } else {
          this.showMenu = true;
        }
      }
    });
  }


  settings(){
    this.router.navigate(['settings']);
  }

  logout(){
    sessionStorage.setItem("auth", '');
    this.router.navigate(['login']);
  }
  home(){

    this.router.navigate(['']);
  }
}
