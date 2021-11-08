import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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
  private companiesSubscription: Subscription;
  private moviesSubscription: Subscription;
  private actorsSubscription: Subscription;
  private moviesList: Movie[];
  private movieId: number = +this.activatedroute.snapshot.paramMap.get('id')!;
  isCreation: boolean;
  companiesList: Companies[];
  movie: Movie | undefined;
  actorsList: Actor[];
  actorsSelectData: number[] = [];
  companiesSelectData: number[] = [];
  genders: string[] = [];

  movieForm: FormGroup = new FormGroup({
    id: new FormControl(),
    title: new FormControl(''),
    poster: new FormControl(''),
    genre: new FormControl([]),
    year: new FormControl(),
    duration: new FormControl(),
    imdbRating: new FormControl(),
    actors: new FormControl([]),
    companies: new FormControl(),
  });

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
   * add new movie to movie list
   */
  addNewMovie() {
    let newMovie: Movie[] = this.moviesList;
    this.movieForm.controls['id'].setValue(Math.floor(Math.random() * 1000));
    newMovie.push(this.movieForm.value);
    this.eventsService.moviesList.next(newMovie);
    this.router.navigate(['movies']);
  }

  /**
   * adds actors select data
   */
  addActorsToSelect() {
    for (let i = 0; i < this.actorsList.length; i++) {
      this.actorsSelectData.push(this.actorsList[i].id);
    }
  }

  /**
   * adds companies select data
   */
  addCompaniesToSelect() {
    for (let i = 0; i < this.companiesList.length; i++) {
      this.companiesSelectData.push(this.companiesList[i].id);
    }
  }

  /**
   * check if the form is create or edit
   * if it is edition add the fields
   */
  formMode() {
    if (this.activatedroute.snapshot.routeConfig?.path === 'edt/:id') {
      this.isCreation = false;
    } else if (this.activatedroute.snapshot.routeConfig?.path === 'add') {
      this.isCreation = true;
    }
  }

  /**
   * edit the movie
   */
  editMovie() {
    this.moviesList = this.moviesList.filter((movie) => movie !== this.movie);
    this.moviesList.push(this.movieForm.value);
    this.eventsService.moviesList.next(this.moviesList);
    this.router.navigate(['movies']);
  }

  /**
   * search movie by url movie id
   */
  searchMovie() {
    this.movie = this.moviesList.find((movie) => movie.id === this.movieId);
    if (!this.isCreation && this.movie) {
      this.movieForm.patchValue(this.movie);
      this.genders = this.movie.genre;
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
      this.movieForm.controls['genre'].setValue(this.genders);
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
    const actors = this.movieForm.controls['actors'].value as string[];
    this.removeFirst(actors, actor);
    this.movieForm.controls['actors'].setValue(actors);
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
