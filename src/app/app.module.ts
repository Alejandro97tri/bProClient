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
import { CalendarComponent } from './calendar/calendar.component';
import { MenuCalendarComponent } from './menu-calendar/menu-calendar.component';



const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'calendar', component: CalendarComponent },
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
    CalendarComponent,
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