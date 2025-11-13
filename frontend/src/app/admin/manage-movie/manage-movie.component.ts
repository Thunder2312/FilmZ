import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from "@angular/forms";
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-manage-movie',
  imports: [FormsModule, CommonModule, RouterOutlet],
  templateUrl: './manage-movie.component.html',
  styleUrl: './manage-movie.component.scss'
})
export class ManageMovieComponent {
  constructor(private http: HttpClient){
  }

  getMovies(){
    this.http.get('http://localhost:3000/movies/getMovie')
  }
  
}
