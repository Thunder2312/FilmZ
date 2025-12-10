import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-showtime',
  imports: [],
  templateUrl: './add-showtime.component.html',
  styleUrl: './add-showtime.component.scss'
})
export class AddShowtimeComponent {

movieId!: number;

constructor(private route: ActivatedRoute) {}

ngOnInit() {
  this.movieId = Number(this.route.snapshot.paramMap.get('movieId'));
}

}