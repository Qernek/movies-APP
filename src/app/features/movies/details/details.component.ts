import { Component, OnInit } from '@angular/core';
import { Movie } from '../../../core/models/movies';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit {
  movie: Movie = {
    id: 1,
    title: 'Dancing Lady',
    poster: 'http://dummyimage.com/400x600.png/cc0000/ffffff',
    genre: ['Comedy', 'Musical', 'Romance'],
    year: 2006,
    duration: 161,
    imdbRating: 8.27,
    actors: [4, 5, 6],
  };

  constructor() {}

  ngOnInit(): void {}
}
