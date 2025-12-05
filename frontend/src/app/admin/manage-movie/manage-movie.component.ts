import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from "@angular/forms";
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { OnInit } from '@angular/core';
import { MovieData } from '../movie-dialog/movie-data.model';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MovieStoreService } from '../../services/movie.service';

@Component({
  selector: 'app-manage-movie',
  imports: [FormsModule, CommonModule, RouterOutlet, MatSnackBarModule],
  templateUrl: './manage-movie.component.html',
  styleUrl: './manage-movie.component.scss'
})
export class ManageMovieComponent {
constructor(
  private movieStore: MovieStoreService,
  private snackBar: MatSnackBar
) {}

movies: MovieData[] = [];

ngOnInit() {
  // Subscribe to movie data (auto-updates)
  this.movieStore.movies$.subscribe(movies => {
    this.movies = movies;
  });

  // load once
  this.movieStore.loadMovies();
}

removeMovie(id: number) {
  this.movieStore.removeMovie(id).subscribe({
    next: () => {
      this.snackBar.open('Movie removed successfully!', 'Close', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'right',
      });
    },
    error: () => {
      this.snackBar.open('Failed to remove movie.', 'Close', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'right',
      });
    }
  });
}

}
