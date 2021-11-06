import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventsService } from '../../../core/services/events/events.service';
import { Movie } from '../../../core/models/movies';
import { Subscription } from 'rxjs';
import { Actor } from 'src/app/core/models/actors';
import { Companies } from 'src/app/core/models/companies';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit, OnDestroy {
  movie: Movie;
  movieId: number = +this.route.snapshot.paramMap.get('id')!;
  actorsList: Actor[];
  companiesList: Companies[];
  companiesSubscription: Subscription;
  moviesSubscription: Subscription;
  actorsSubscription: Subscription;
  noImage: string =
    'https://dummyimage.com/400x600.png/dddddd/000000&text=No+image+available';

  constructor(
    private readonly eventsService: EventsService,
    private readonly route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.movieDataSubscription();
    this.actorDataSubscription();
    this.companieDataSubscription();
  }

  ngOnDestroy(): void {
    this.moviesSubscription.unsubscribe();
    this.actorsSubscription.unsubscribe();
  }

  /**
   * subscription to movies data
   */
  movieDataSubscription() {
    this.moviesSubscription = this.eventsService.moviesList.subscribe(
      (moviesList: Movie[]) => {
        this.searchMovie(moviesList);
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
  searchMovie(movieList: Movie[]) {
    const movie = movieList.find((movie) => movie.id === this.movieId);
    if (movie) {
      this.movie = movie;
    }
  }
}
