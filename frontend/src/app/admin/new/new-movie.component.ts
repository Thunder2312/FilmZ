import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { forkJoin } from 'rxjs';
import {MatDialog, MatDialogModule, MatDialogConfig} from '@angular/material/dialog';
import { MovieDialogComponent } from '../movie-dialog/movie-dialog.component';
@Component({
  selector: 'app-new-movie',
  templateUrl: './new-movie.component.html',
  styleUrls: ['./new-movie.component.scss'],
  imports: [CommonModule, FormsModule, HttpClientModule, MatDialogModule ]
})
export class NewMovieComponent {
  search_text = '';
  movieDetails: any = null; // single movie
  apiKey = 'lol';

  constructor(private http: HttpClient, private dialog: MatDialog) {}
  


  onSearch() {
    const title = this.search_text.trim();
    if (!title) return;

    this.http
      .get<any>(`https://www.omdbapi.com/?s=${encodeURIComponent(title)}&apikey=${this.apiKey}&type=movie`)
      .subscribe((data) => {
        if (data && data.Response !== 'False') {
          const ids = data.Search.map((movie:any)=> movie.imdbID); //map ids to variable from multiple titles
          
          const requests = ids.map((id: any) => this.http.get(`https://www.omdbapi.com/?i=${id}&apikey=${this.apiKey}`));

          forkJoin(requests).subscribe((movies)=>{
            this.movieDetails = movies;
            console.log('Full Movie Details')
          })
        } else {
          this.movieDetails = [];
        }
      });
  }



  addMovie(){
    console.log("How do you do")
  }
}
