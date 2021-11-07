import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventsService } from '../../../core/services/events/events.service';
import { Movie } from '../../../core/models/movies';
import { Subscription } from 'rxjs';
import { Actor } from '../../../core/models/actors';
import { Companies } from '../../../core/models/companies';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit, OnDestroy {
  movie: Movie;
  moviesList: Movie[];
  movieId: number = +this.activatedroute.snapshot.paramMap.get('id')!;
  actorsList: Actor[];
  companiesList: Companies[];
  companiesSubscription: Subscription;
  moviesSubscription: Subscription;
  actorsSubscription: Subscription;
  noImage: string =
    'https://dummyimage.com/400x600.png/dddddd/000000&text=No+image+available';

  constructor(
    private readonly eventsService: EventsService,
    private readonly activatedroute: ActivatedRoute,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.movieDataSubscription();
    this.actorDataSubscription();
    this.companieDataSubscription();
  }

  ngOnDestroy(): void {
    this.companiesSubscription.unsubscribe();
    this.moviesSubscription.unsubscribe();
    this.actorsSubscription.unsubscribe();
  }

  /**
   * go to edit page of the movie
   */
  editMovie() {
    this.router.navigate(['movies/edt/', this.movieId]);
  }

  /**
   * delete the movie from the list
   */
  deleteMovie() {
    this.moviesList = this.moviesList.filter((movie) => movie !== this.movie);
    this.eventsService.moviesList.next(this.moviesList);
    this.router.navigate(['movies']);
  }

  /**
   * subscription to movies data
   */
  movieDataSubscription() {
    this.moviesSubscription = this.eventsService.moviesList.subscribe(
      (moviesList: Movie[]) => {
        this.moviesList = moviesList;
        this.searchMovie();
      }
    );
  }

  /**
   * subscription to actors data
   */
  actorDataSubscription() {
    this.actorsSubscription = this.eventsService.actorsList.subscribe(
      (actorsList: Actor[]) => {
        this.actorsList = actorsList;
      }
    );
  }

  /**
   * subscription to companies data
   */
  companieDataSubscription() {
    this.companiesSubscription = this.eventsService.companiesList.subscribe(
      (companiesList: Companies[]) => {
        this.companiesList = companiesList;
      }
    );
  }

  /**
   * Search in the movieList the id of the url and set movie to show the data
   * @param movieList movie list
   */
  searchMovie() {
    const movie = this.moviesList.find((movie) => movie.id === this.movieId);
    if (movie) {
      this.movie = movie;
    }
  }
}
