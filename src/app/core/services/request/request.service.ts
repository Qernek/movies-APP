import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Actor } from '../../models/actors';
import { Companies } from '../../models/companies';
import { Movie } from '../../models/movies';
import { EventsService } from '../events/events.service';

@Injectable({
  providedIn: 'root',
})
export class RequestService {
  apiURL = environment.APIEndpoint;

  constructor(
    private readonly http: HttpClient,
    private readonly eventsService: EventsService
  ) {}

  /**
   * get movies data
   * @returns array of movies
   */
  private getMovies(): Observable<Movie[]> {
    return this.http
      .get<Movie[]>(this.apiURL + '/movies')
      .pipe(catchError(this.handleError));
  }

  /**
   * get actor data
   * @returns array of actors
   */
  private getActors(): Observable<Actor[]> {
    return this.http
      .get<Actor[]>(this.apiURL + '/actors')
      .pipe(catchError(this.handleError));
  }

  /**
   * get companies data
   * @returns array of companies
   */
  private getCompanies(): Observable<Companies[]> {
    return this.http
      .get<Companies[]>(this.apiURL + '/companies')
      .pipe(catchError(this.handleError));
  }

  /**
   * Get movies, companies and actors data and set in BehaviorSubject variable
   * in case the movie cards are removed, it will be possible to see fewer cards
   * as it only makes the call to fetch the data once
   */
  getAllData() {
    this.getMovies().subscribe((movies: Movie[]) => {
      this.eventsService.moviesList.next(movies);
    });

    this.getCompanies().subscribe((companies: Companies[]) => {
      this.eventsService.companiesList.next(companies);
    });

    this.getActors().subscribe((actors: Actor[]) => {
      this.eventsService.actorsList.next(actors);
    });
  }

  /**
   * Error handle
   */
  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}
