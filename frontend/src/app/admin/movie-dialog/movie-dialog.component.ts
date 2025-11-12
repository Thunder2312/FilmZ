import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-movie',
  templateUrl: './movie-dialog.component.html',
  styleUrls: ['./movie-dialog.component.scss'],
  imports:[FormsModule, CommonModule]
})
export class MovieDialogComponent {
  movieData = {
    title: '',
  description: '',
  duration_minutes: 0,
  genre: '',
  language: '',
  rated: '',
  img_link: '',
  release_date: ''
  };

  constructor(private http: HttpClient) {}

  onsubmit() {
    // Get token from localStorage (or wherever you store it)
    const token = sessionStorage.getItem('jwtToken');


    if (!token) {
      console.log('No authentication token found.');
      console.log('Token:', token);
      return;
    }

    // Add Authorization header
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    // Send POST request to backend
    this.http.post('http://localhost:3000/user/addMovie', this.movieData, { headers })
      .subscribe({
        next: (res: any) => {
          console.log('Movie Added Successfully:', res.message || res);
          
          this.movieData = {
            title: '',
            description: '',
            duration_minutes: 0,
            genre: '',
            language: '',
            rated: '',
            img_link: '',
            release_date: ''
          };
        },
        error: (err: any) => {
          if (err.status === 400) {
            console.log('Missing required fields. Please fill all inputs.');
          } else if (err.status === 401) {
            console.log('Unauthorized: Invalid or expired token.');
          } else if (err.status === 403) {
            console.log('Access Denied: You do not have permission to add movies.');
          } else if (err.status === 500) {
            console.log('Server Error. Please try again later.');
          } else {
            console.log('Unknown Error Occurred:', err.message);
          }
          console.error('Error saving movie data:', err);
        },
      });
  }
}
