import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormNutritionComponent } from './components/form-nutrition/form-nutrition.component';
import { DetalleDiaComponent } from './components/detalle-dia/detalle-dia.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { FormEntrenoComponent } from './components/form-entreno/form-entreno.component';
import { LoginGuardian } from './guards/login-guardian';
import { SettingsComponent } from './components/settings/settings.component';
import { CalendarioClienteComponent } from './components/calendario-cliente/calendario-cliente.component';
import { RegisterComponent } from './components/register/register.component';
import { AmistadesComponent } from './components/amistades/amistades.component';


const appRoutes: Routes = [
  { path: 'entrenamiento/:id/:dia/:mes/:year', component: DetalleDiaComponent,canActivate:[LoginGuardian] },
  { path: '', component: HomeComponent, canActivate:[LoginGuardian] },
  { path: 'login', component: LoginComponent},
  { path: 'userinfo/:id', component: UserInfoComponent, canActivate:[LoginGuardian] },
  { path: 'formentreno/:id_user/:id/:dia/:mes/:year', component: FormEntrenoComponent, canActivate:[LoginGuardian] },
  { path: 'formnutricion/:id_user/:id/:dia/:mes/:year', component: FormNutritionComponent, canActivate:[LoginGuardian] },
  { path: 'settings', component: SettingsComponent, canActivate:[LoginGuardian] },
  { path: 'calendario-cliente/:id', component: CalendarioClienteComponent, canActivate:[LoginGuardian] },
  { path: 'contactos', component: AmistadesComponent, canActivate:[LoginGuardian] },
  { path: 'register', component: RegisterComponent},
];

@NgModule({
  providers: [LoginGuardian],
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
