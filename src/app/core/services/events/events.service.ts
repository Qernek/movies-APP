import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Actor } from '../../models/actors';
import { Companie } from '../../models/companie';
import { Movie } from '../../models/movies';

@Injectable({
  providedIn: 'root',
})
export class EventsService {
  /**
   * Movies data from http request
   */
  private moviesList = new BehaviorSubject<Movie[]>([]);

  /**
   * Actors data from http request
   */
  private actorsList = new BehaviorSubject<Actor[]>([]);

  /**
   * Companies data from http request
   */
  private companiesList = new BehaviorSubject<Companie[]>([]);

  constructor() {}

  /**
   * Set/update movies in BehaviorSubject variable
   * @param movies movies
   */
  setMoviesList(movies: Movie[]) {
    this.moviesList.next(movies);
  }

  /**
   * get movies data from BehaviorSubject variable
   * @returns movies
   */
  getMoviesList(): Observable<Movie[]> {
    return this.moviesList.asObservable();
  }

  /**
   * Set/update actors in BehaviorSubject variable
   * @param actors actors
   */
  setActorsList(actors: Actor[]) {
    this.actorsList.next(actors);
  }

  /**
   * get movies data from BehaviorSubject variable
   * @returns actors
   */
  getActorsList(): Observable<Actor[]> {
    return this.actorsList.asObservable();
  }

  /**
   * Set/update companies in BehaviorSubject variable
   * @param companies companies
   */
  setCompaniesList(companies: Companie[]) {
    this.companiesList.next(companies);
  }

  /**
   * get movies data from BehaviorSubject variable
   * @returns companies
   */
  getCompaniesList(): Observable<Companie[]> {
    return this.companiesList.asObservable();
  }
}
