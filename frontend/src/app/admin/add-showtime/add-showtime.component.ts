import { Component, inject, signal, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';

import { MovieStoreService } from '../../services/movie.service';
import { theaterService } from '../../services/theater.service';
import { ShowService } from '../../services/show.service';

@Component({
  selector: 'app-add-showtime',
  standalone: true,
  imports: [DatePipe, CommonModule],
  templateUrl: './add-showtime.component.html',
  styleUrl: './add-showtime.component.scss'
})
export class AddShowtimeComponent implements OnInit {


  private route = inject(ActivatedRoute);
  private movieStore = inject(MovieStoreService);
  private theaterService = inject(theaterService);
  private showService = inject(ShowService);


  movieId = signal<number | null>(null);

  theaters = signal<any[]>([]);
  screens = signal<any[]>([]);

  selectedTheaterId = signal<number | null>(null);
  selectedScreenId = signal<number | null>(null);

  selectedMovie = this.movieStore.selectedMovie;
  loading = this.movieStore.loading;
  error = this.movieStore.error;


  ngOnInit(): void {

    this.theaterService.loadTheaters();

    this.theaterService.theaters$.subscribe({
      next: theaters => this.theaters.set(theaters),
      error: () => console.error('Failed to load theaters')
    });

    this.route.paramMap.subscribe(params => {
      const id = params.get('movieId');
      if (id) {
        this.movieId.set(+id);
        this.movieStore.loadMovieById(+id);
      }
    });

    
  }

onTheaterChange(theaterId: string) {
  const id = Number(theaterId);

  if (!id || isNaN(id)) {
    this.selectedTheaterId.set(null);
    this.selectedScreenId.set(null);
    this.screens.set([]);
    return;
  }

  this.selectedTheaterId.set(id);
  this.selectedScreenId.set(null);
  this.screens.set([]);

  this.showService.getScreens(id).subscribe({
    next: screens => {
      this.screens.set(screens); // populate screens signal
    },
    error: () => {
      this.screens.set([]);
      console.error('Failed to load screens');
    }
  });
}


onScreenChange(screenId: string) {
  const id = Number(screenId);
  this.selectedScreenId.set(isNaN(id) ? null : id);
}

}
