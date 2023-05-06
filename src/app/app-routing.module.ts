import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormNutritionComponent } from './components/form-nutrition/form-nutrition.component';
import { DetalleDiaComponent } from './components/detalle-dia/detalle-dia.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { FormEntrenoComponent } from './components/form-entreno/form-entreno.component';
import { LoginGuardian } from './guards/login-guardian';


const appRoutes: Routes = [
  { path: 'entrenamiento/:dia/:mes/:year', component: DetalleDiaComponent },
  { path: '', component: HomeComponent, canActivate:[LoginGuardian] },
  { path: 'login', component: LoginComponent},
  { path: 'userinfo', component: UserInfoComponent, canActivate:[LoginGuardian] },
  { path: 'formentreno', component: FormEntrenoComponent, canActivate:[LoginGuardian] },
  { path: 'formnutri', component: FormNutritionComponent, canActivate:[LoginGuardian] }
];

@NgModule({
  providers: [LoginGuardian],
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
