import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ApiService } from './services/api.services';
import { FormNutritionComponent } from './components/form-nutrition/form-nutrition.component';
import { DetalleDiaComponent } from './components/detalle-dia/detalle-dia.component';
import { LoginComponent } from './components/login/login.component';
import { HomeCoachComponent } from './components/home-coach/home-coach.component';
import { HomeNutritionistComponent } from './components/home-nutritionist/home-nutritionist.component';
import { HomeAthleteComponent } from './components/home-athlete/home-athlete.component';
import { MenuCalendarComponent } from './components/menu-calendar/menu-calendar.component';
import { HomeComponent } from './components/home/home.component';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { FormEntrenoComponent } from './components/form-entreno/form-entreno.component';
import { LoginGuardian } from './guards/login-guardian';

@NgModule({
  declarations: [
    AppComponent,
    DetalleDiaComponent,
    LoginComponent,
    HomeCoachComponent,
    HomeNutritionistComponent,
    HomeAthleteComponent,
    MenuCalendarComponent,
    HomeComponent,
    UserInfoComponent,
    FormEntrenoComponent,
    FormNutritionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [ApiService,LoginComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }