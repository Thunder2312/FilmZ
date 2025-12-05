import { Component } from '@angular/core';
import { MovieData } from '../movie-dialog/movie-data.model';
import { MovieStoreService } from '../../services/movie.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule, DatePipe } from '@angular/common';
import { theaterService } from '../../services/theater.service';
import { theaterData } from '../../services/theater.model';
import { FormsModule } from '@angular/forms';
import { ShowtimePayload } from './showtime.model';
import { ShowtimeInput } from './showtimeinput.model';
@Component({
  selector: 'app-showtimes',
  imports: [DatePipe, FormsModule, CommonModule],
  templateUrl: './showtimes.component.html',
  styleUrl: './showtimes.component.scss'
})
export class ShowtimesComponent {
getScreenArray(count: number): number[] {
  return Array.from({ length: count }, (_, i) => i);
}

showtimeData: {
  [movieId: number]: { [theaterId: number]: ShowtimeInput[] }
} = {};

constructor(
    private movieStore: MovieStoreService,
    private snackBar: MatSnackBar,
    private theaterStore: theaterService
  ) {}

  theaters: theaterData[] = [];
  movies: MovieData[] = [];

  selectedMovieId: number | null = null;   // <— NEW

  ngOnInit() {
    this.movieStore.movies$.subscribe(movies => {
      this.movies = movies;
    });

    this.movieStore.loadMovies();

    // Load theaters
    this.theaterStore.theaters$.subscribe(t => {
      this.theaters = t;
    });
    this.theaterStore.loadTheaters();
  }

trackByMovie(index: number, movie: any) {
  return movie.movie_id;
}

trackByTheater(index: number, theater: any) {
  return theater.theater_id;
}


openShowtimeTable(movieId: number) {
  this.selectedMovieId = movieId;

  if (!this.showtimeData[movieId]) {
    this.showtimeData[movieId] = {};
  }

  for (const theater of this.theaters) {
    if (!this.showtimeData[movieId][theater.theater_id]) {
      this.showtimeData[movieId][theater.theater_id] = 
        Array.from({ length: theater.total_screens }, () => ({
          start: '',
          end: '',
          price: 0
        }));
    }
  }
}



saveShowtimes(movieId: number) {
  const payload: ShowtimePayload[] = [];

  for (const theater of this.theaters) {
    const theaterId = theater.theater_id;
    const screens = this.showtimeData[movieId][theaterId];

    screens.forEach((screen, index) => {
      payload.push({
        movie_id: movieId,
        theater_id: theaterId,
        screen: index + 1,
        start: screen.start,
        end: screen.end,
        price: screen.price
      });
    });
  }

  console.log("Final payload:", payload);
}



toggleShowtimeAccordion(movieId: number) {
  if (this.selectedMovieId === movieId) {
    this.selectedMovieId = null; // Collapse if already open
  } else {
    this.selectedMovieId = movieId; // Open selected movie

    // Initialize showtimeData if not already
    if (!this.showtimeData[movieId]) {
      this.showtimeData[movieId] = {};
    }

    for (const theater of this.theaters) {
      if (!this.showtimeData[movieId][theater.theater_id]) {
        this.showtimeData[movieId][theater.theater_id] =
          Array.from({ length: theater.total_screens }, () => ({
            start: '',
            end: '',
            price: 0
          }));
      }
    }
  }
}




}
