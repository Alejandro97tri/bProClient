import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { LoginComponent } from "../components/login/login.component";
import { Injectable } from "@angular/core";

@Injectable()
export class LoginGuardian implements CanActivate{

    constructor( private loginService: LoginComponent, private router: Router) {
        
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if(this.loginService.estaLogueado()){
            return true;
        }else{
            this.router.navigate(['/login']);
            return false;
        }
    }
    
}