import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

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

  showForm: boolean = true;

  

  constructor(private http: HttpClient, 
    private dialogRef: MatDialogRef<MovieDialogComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any) {
  if (data) {
    this.movieData = {
      title: data.Title || '',
      description: data.Plot || '',
      duration_minutes: parseInt(data.Runtime) || 0,
      genre: data.Genre || '',
      language: data.Language || '',
      rated: data.Rated || '',
      img_link: data.Poster || '',
      release_date: this.changeDate(data.Released) || '', // formatted for input
    };
  }
}

  

  onsubmit() {
    this.http.post('http://localhost:3000/movies/addMovie', this.movieData)
      .subscribe({
        next: (res: any) => {
          console.log('Movie Added Successfully:', res.message || res);
          this.showForm = false;
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

  changeDate(Released: string | Date): string {
  const date2 = new Date(Released);

  if (isNaN(date2.getTime())) return '';

  const day = String(date2.getDate()).padStart(2, '0');
  const month = String(date2.getMonth() + 1).padStart(2, '0');
  const year = date2.getFullYear();

  return `${year}-${month}-${day}`; // Correct format for <input type="date">
}


 
}
