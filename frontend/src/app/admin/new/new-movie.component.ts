import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../header/header.component';
import { RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-new-movie',
  imports: [HttpClientModule, FormsModule, CommonModule, HeaderComponent, RouterOutlet],
  templateUrl: './new-movie.component.html',
  styleUrl: './new-movie.component.scss'
})
export class NewMovieComponent {
 search_text = '';
  showResults: any[] = [];
  apiKey = 'lol';
  movieDetails: any;
  constructor(private http: HttpClient) {}

 onSearch() {
  const title = this.search_text.trim();
  if (!title) return;

  this.http
    .get<any>(`https://www.omdbapi.com/?t=${encodeURIComponent(title)}&apikey=${this.apiKey}`)
    .subscribe((data) => {
      if (data && data.Response !== 'False') {
        this.movieDetails = data; // show in UI
      } else {
        this.movieDetails = null;
      }
    });
}

}
