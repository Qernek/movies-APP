import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Movie } from '../../../core/models/movies';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  constructor(private router: Router) {}
  moviesList: Movie[] = [
    {
      id: 1,
      title: 'Dancing Lady',
      poster: 'http://dummyimage.com/400x600.png/cc0000/ffffff',
      genre: ['Comedy', 'Musical', 'Romance'],
      year: 2006,
      duration: 161,
      imdbRating: 8.27,
      actors: [4, 5, 6],
    },
    {
      id: 2,
      title: 'Mooring, The',
      poster: 'http://dummyimage.com/400x600.png/dddddd/000000',
      genre: ['Horror', 'Thriller'],
      year: 1987,
      duration: 187,
      imdbRating: 1.99,
      actors: [5, 6],
    },
    {
      id: 3,
      title: 'Black Rain (Kuroi ame)',
      poster: 'http://dummyimage.com/400x600.png/5fa2dd/ffffff',
      genre: ['Drama', 'War'],
      year: 2010,
      duration: 175,
      imdbRating: 6.25,
      actors: [1],
    },
    {
      id: 4,
      title: 'Spring Break Shark Attack',
      poster: 'http://dummyimage.com/400x600.png/cc0000/ffffff',
      genre: ['Adventure', 'Drama', 'Horror'],
      year: 1985,
      duration: 190,
      imdbRating: 3.66,
      actors: [8, 9, 10],
    },
  ];
  ngOnInit(): void {}

  /**
   * Navigate to movie details component
   * @param movie movie object
   */
  movieInfo(movie: Movie) {
    this.router.navigate(['movies', movie.id]);
  }
}
