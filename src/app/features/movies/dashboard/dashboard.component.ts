import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Movie } from '../../../core/models/movies';
import { EventsService } from '../../../core/services/events/events.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  private moviesSubscription: Subscription;
  moviesList: Movie[];

  constructor(
    private readonly router: Router,
    private readonly eventsService: EventsService
  ) {}

  ngOnInit(): void {
    this.movieDataSubscription();
  }

  ngOnDestroy(): void {
    this.moviesSubscription.unsubscribe();
  }

  /**
   * Navigate to movie details component
   * @param movie movie object
   */
  movieInfo(movie: Movie) {
    this.router.navigate(['movies', movie.id]);
  }

  /**
   * subscription to keep the movie list updated
   */
  movieDataSubscription() {
    this.moviesSubscription = this.eventsService.moviesList.subscribe(
      (movies: Movie[]) => {
        this.moviesList = movies;
      }
    );
  }
}
