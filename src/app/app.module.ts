import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { RouterModule, Routes } from '@angular/router';
import { ApiService } from './services/api.services';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MenuUsersComponent } from './menu-users/menu-users.component';
import { HomeCoachComponent } from './home-coach/home-coach.component';
import { HomeNutritionistComponent } from './home-nutritionist/home-nutritionist.component';
import { HomeAthleteComponent } from './home-athlete/home-athlete.component';
import { MenuCalendarComponent } from './menu-calendar/menu-calendar.component';



const appRoutes: Routes = [
  { path: 'entrenamiento/:dia/:mes/:year', component: HomeComponent },
  { path: '', component: HomeAthleteComponent },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    MenuUsersComponent,
    HomeCoachComponent,
    HomeNutritionistComponent,
    HomeAthleteComponent,
    MenuCalendarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    FormsModule
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }