import { Routes } from '@angular/router';
import { LoginCardComponent } from './login-card/login-card.component';
import { HomeComponent } from './home/home.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },      // default route
  { path: 'login', component: LoginCardComponent },  // login page
  {path: 'signup', component: SignUpComponent},
  {path: 'admin/dashboard', component: AdminHomeComponent}
];
