import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from "@angular/forms";
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { OnInit } from '@angular/core';
@Component({
  selector: 'app-manage-movie',
  imports: [FormsModule, CommonModule, RouterOutlet],
  templateUrl: './manage-movie.component.html',
  styleUrl: './manage-movie.component.scss'
})
export class ManageMovieComponent {
  constructor(private http: HttpClient){
  }

  
  ngOnInit(){
    this.getMovie();
  }

  movies: any[] = [];   // <-- Make this accessible to HTML

getMovie() {
  this.http.get('http://localhost:3000/movies/getMovie').subscribe({
    next: (res: any) => {
      this.movies = res.result.map((movie: any) => ({
        movie_id: movie.movie_id,
        description: movie.description,
        title: movie.title,
        duration: movie.duration_minutes,
        genre: movie.genre,
        language: movie.language,
        rated: movie.rated,
        date: movie.release_date,
        image: movie.image
      }));

      console.log(res);
    }
  });
}

  
}
