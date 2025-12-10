import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { MovieData  } from '../admin/movie-dialog/movie-data.model';
import { ShowTime } from './showTime.model';

@Injectable({
  providedIn: 'root'
})

export class showTimeService{
    private baseUrl = 'http://localhost:3000/showtimes';
}