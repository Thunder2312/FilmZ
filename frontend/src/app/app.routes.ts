import { Routes } from '@angular/router';
import { LoginCardComponent } from './login-card/login-card.component';
import { HomeComponent } from './home/home.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { AdminHomeComponent } from './admin/home/admin-home.component';
import { NewMovieComponent } from './admin/new/new-movie.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginCardComponent },
  { path: 'signup', component: SignUpComponent },

  {
    path: 'admin',
    component: AdminHomeComponent,
    children: [
      { path: 'new-movie', component: NewMovieComponent },
      // future routes
      // { path: 'manage-movies', component: ManageMoviesComponent },
      // { path: 'bookings', component: AdminBookingsComponent },
    ],
  },
];
