import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormNutritionComponent } from './form-nutrition/form-nutrition.component';
import { FormEntrenoComponent } from './form-entreno/form-entreno.component';
import { UserInfoComponent } from './user-info/user-info.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { DetalleDiaComponent } from './detalle-dia/detalle-dia.component';

const appRoutes: Routes = [
  { path: 'entrenamiento/:dia/:mes/:year', component: DetalleDiaComponent },
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'userinfo', component: UserInfoComponent },
  { path: 'formentreno', component: FormEntrenoComponent },
  { path: 'formnutri', component: FormNutritionComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
