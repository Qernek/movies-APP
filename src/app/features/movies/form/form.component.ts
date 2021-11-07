import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Actor } from '../../../core/models/actors';
import { Companies } from '../../../core/models/companies';
import { Movie } from '../../../core/models/movies';
import { EventsService } from '../../../core/services/events/events.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit, OnDestroy {
  isCreation: boolean;
  companiesSubscription: Subscription;
  moviesSubscription: Subscription;
  actorsSubscription: Subscription;
  companiesList: Companies[];
  moviesList: Movie[];
  movie: Movie;
  actorsList: Actor[];

  actorsControl = new FormControl([]);
  actorsSelectData: string[] = [];
  companiesSelectData: string[] = [];
  genders: string[] = [];

  constructor(
    private readonly eventsService: EventsService,
    private readonly activatedroute: ActivatedRoute,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.formMode();
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
   * adds actors select data
   */
  addActorsToSelect() {
    for (let i = 0; i < this.actorsList.length; i++) {
      this.actorsSelectData.push(this.actorsList[i].id.toString());
    }
  }

  /**
   * adds companies select data
   */
  addCompaniesToSelect() {
    for (let i = 0; i < this.companiesList.length; i++) {
      this.companiesSelectData.push(this.companiesList[i].id.toString());
    }
  }

  /**
   * check if the form is create or edit
   */
  formMode() {
    if (this.activatedroute.snapshot.routeConfig?.path === 'edt/:id') {
      this.isCreation = false;
    } else if (this.activatedroute.snapshot.routeConfig?.path === 'add') {
      this.isCreation = true;
    }
  }

  /**
   * add chips to genders field
   * @param event event
   * @param type genders
   */
  addGender(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.genders.push(value);
    }
    event.chipInput!.clear();
  }

  /**
   * Remove specific gender from list
   * @param element chip to delete
   * @param type genders
   */
  removeGender(element: string): void {
    const index = this.genders.indexOf(element);

    if (index >= 0) {
      this.genders.splice(index, 1);
    }
  }

  /**
   * Remove specific actor from list
   * @param actor actor
   */
  removeActor(actor: string): void {
    const actors = this.actorsControl.value as string[];
    this.removeFirst(actors, actor);
    this.actorsControl.setValue(actors);
  }

  private removeFirst<T>(array: T[], toRemove: T): void {
    const index = array.indexOf(toRemove);
    if (index !== -1) {
      array.splice(index, 1);
    }
  }

  /**
   * subscription to movies data
   */
  movieDataSubscription() {
    this.moviesSubscription = this.eventsService.moviesList.subscribe(
      (moviesList: Movie[]) => {
        this.moviesList = moviesList;
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
        this.addActorsToSelect();
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
        this.addCompaniesToSelect();
      }
    );
  }
}
