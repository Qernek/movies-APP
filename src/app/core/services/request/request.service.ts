import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Actor } from '../../models/actors';
import { Companie } from '../../models/companie';
import { Movie } from '../../models/movies';
import { EventsService } from '../events/events.service';

@Injectable({
  providedIn: 'root',
})
export class RequestService {
  private apiURL = environment.APIEndpoint;

  constructor(
    private readonly http: HttpClient,
    private readonly eventsService: EventsService
  ) {}

  /**
   * get movies data
   * @returns array of movies
   */
  private getMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(this.apiURL + '/movies');
  }

  /**
   * get actor data
   * @returns array of actors
   */
  private getActors(): Observable<Actor[]> {
    return this.http.get<Actor[]>(this.apiURL + '/actors');
  }

  /**
   * get companies data
   * @returns array of companies
   */
  private getCompanies(): Observable<Companie[]> {
    return this.http.get<Companie[]>(this.apiURL + '/companies');
  }

  /**
   * Get movies, companies and actors data and set in BehaviorSubject variable
   * in case the movie cards are removed, it will be possible to see fewer cards
   * as it only makes the call to fetch the data once
   */
  getAllData() {
    this.getMovies().subscribe((movies: Movie[]) => {
      this.eventsService.setMoviesList(movies);
    });

    this.getCompanies().subscribe((companies: Companie[]) => {
      this.eventsService.setCompaniesList(companies);
    });

    this.getActors().subscribe((actors: Actor[]) => {
      this.eventsService.setActorsList(actors);
    });
  }
}
