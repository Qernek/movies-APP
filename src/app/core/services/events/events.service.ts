import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Actor } from '../../models/actors';
import { Companies } from '../../models/companies';
import { Movie } from '../../models/movies';

@Injectable({
  providedIn: 'root',
})
export class EventsService {
  /**
   * Movies data from http request
   */
  public readonly moviesList = new BehaviorSubject<Movie[]>([]);

  /**
   * Actors data from http request
   */
  public readonly actorsList = new BehaviorSubject<Actor[]>([]);

  /**
   * Companies data from http request
   */
  public readonly companiesList = new BehaviorSubject<Companies[]>([]);

  constructor() {}
}
