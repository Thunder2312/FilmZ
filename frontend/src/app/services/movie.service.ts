import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { MovieData  } from '../admin/movie-dialog/movie-data.model';
import { ShowTime } from './showTime.model';
@Injectable({
  providedIn: 'root'
})
export class MovieStoreService {

  private baseUrl = 'http://localhost:3000/movies';

  // BehaviorSubject holds the current movie list
  private moviesSubject = new BehaviorSubject<MovieData[]>([]);
  movies$ = this.moviesSubject.asObservable(); // components subscribe here

  constructor(private http: HttpClient) {}

  // Load movies from server and update the subject
  loadMovies() {
    this.http.get<{ result: any[] }>(`${this.baseUrl}/getMovie`)
      .pipe(
        tap(res => {
          const movies = res.result.map(movie => ({
            movie_id: movie.movie_id,
            title: movie.title,
            description: movie.description,
            duration: movie.duration_minutes,
            genre: movie.genre,
            language: movie.language,
            rated: movie.rated,
            date: movie.release_date,
            image: movie.image
          }));
          this.moviesSubject.next(movies);
        })
      )
      .subscribe();
  }

  // Remove movie and update subject
  removeMovie(movie_id: number) {
    return this.http.post(`${this.baseUrl}/deactivateMovie`, { movie_id }).pipe(
      tap(() => {
        const updated = this.moviesSubject
          .value
          .filter(movie => movie.movie_id !== movie_id);

        this.moviesSubject.next(updated);
      })
    );
  }

  
  // Add a showtime for a movie
  addShowtime(showtime: ShowTime): Observable<any> {
    return this.http.post('/api/showtimes', showtime);
  }

  // Add multiple showtimes at once
  addMultipleShowtimes(showtimes: ShowTime[]): Observable<any> {
    return this.http.post('/api/showtimes/bulk', showtimes);
  }
}

