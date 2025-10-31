import { Routes } from '@angular/router';
import { LoginCardComponent } from './login-card/login-card.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },      // default route
  { path: 'login', component: LoginCardComponent }  // login page
];
