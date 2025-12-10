import { Routes } from '@angular/router';
import { LoginCardComponent } from './login-card/login-card.component';
import { HomeComponent } from './home/home.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { AdminHomeComponent } from './admin/home/admin-home.component';
import { NewMovieComponent } from './admin/new/new-movie.component';
import { ManageMovieComponent } from './admin/manage-movie/manage-movie.component';
import { ApprovalComponent } from './admin/approval/approval.component';
import { TheatresComponent } from './admin/theaters/theaters.component';
import { ShowtimesComponent } from './admin/showtimes/showtimes.component';
import { ManageShowtimeComponent } from './admin/manage-showtime/manage-showtime.component';
import { AddShowtimeComponent } from './admin/add-showtime/add-showtime.component';
export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginCardComponent },
  { path: 'signup', component: SignUpComponent },

  {
    path: 'admin',
    component: AdminHomeComponent,
    children: [
      { path: 'new-movie', component: NewMovieComponent },
      { path: 'manage-movie', component: ManageMovieComponent },
      {path: 'approval', component: ApprovalComponent},
      {path: 'theatres', component: TheatresComponent},
      {path: 'view-showtimes', component: ShowtimesComponent},
      {path: 'manage-showtimes', component: ManageShowtimeComponent},
    {path: 'add-showtimes/:movieId', component: AddShowtimeComponent}
    ],
  },
];
