import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from "@angular/forms";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-home',
  imports: [HeaderComponent, HttpClientModule, FormsModule,CommonModule],
  templateUrl: './admin-home.component.html',
  styleUrl: './admin-home.component.scss'
})
export class AdminHomeComponent {

  search_text: string = '';
  constructor(private http: HttpClient){}



  onSearch() {
    const url = `https://www.omdbapi.com/?t=${this.search_text}&apikey=`;
  
    this.http.get(url).subscribe({
      next: (res: any) => {
        if (res && res.Response === "True") {
          console.log('Movie found:', res);
        } else {
          console.log('Movie not found:', res?.Error || 'Unknown error');
        }
      },
      error: (err: any) => {
        if (err.status === 401) {
          console.log('Unauthorized - invalid API key or request');
        } else {
          console.log('Server Error:', err);
        }
        console.error('Error fetching data:', err);
      },
    });
  }
  
}
