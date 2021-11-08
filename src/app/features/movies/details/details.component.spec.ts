import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EventsService } from '../../../core/services/events/events.service';
import { DetailsComponent } from './details.component';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { Movie } from '../../../core/models/movies';
import { Actor } from '../../../core/models/actors';
import { Companie } from '../../../core/models/companie';

describe('DetailsComponent', () => {
  let detailsComponent: DetailsComponent;
  let fixture: ComponentFixture<DetailsComponent>;
  let eventsService: EventsService;

  const moviesListMock: Movie[] = [
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
  ];

  const actorsListMock: Actor[] = [
    {
      id: 1,
      first_name: 'Isaak',
      last_name: 'McQuode',
      gender: 'Male',
      bornCity: 'Ciduren',
      birthdate: '24/12/1957',
      img: 'http://dummyimage.com/600x400.png/dddddd/000000',
      rating: 2.03,
      movies: [3, 7],
    },
  ];

  const companiesListMock: Companie[] = [
    {
      id: 1,
      name: 'Jacobson-Dickinson',
      country: 'Colombia',
      createYear: 2010,
      employees: 81,
      rating: 4.32,
      movies: [1, 10],
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TranslateModule.forRoot(),
        RouterTestingModule.withRoutes([
          { path: 'edt/:id', component: DetailsComponent },
          { path: 'movies', component: DetailsComponent },
        ]),
      ],
      declarations: [DetailsComponent],
      providers: [EventsService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsComponent);
    eventsService = TestBed.inject(EventsService);
    detailsComponent = fixture.componentInstance;
    detailsComponent.movieId = 1;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(detailsComponent).toBeTruthy();
  });

  it('should test navEditPage()', () => {
    const router = TestBed.inject(Router);
    const spy = spyOn(router, 'navigate');

    detailsComponent.navEditPage();
    expect(spy).toHaveBeenCalledWith(['movies/edt/', 1]);
  });

  it('should test deleteMovie()', () => {
    const movieListMock: Movie[] = [...moviesListMock];
    const router = TestBed.inject(Router);
    const routerSpy = spyOn(router, 'navigate');
    const serviceSpy = spyOn(eventsService, 'setMoviesList').and.callFake(
      () => null
    );
    detailsComponent['moviesList'] = movieListMock;
    detailsComponent['movie'] = movieListMock[0];
    detailsComponent.deleteMovie();

    expect(detailsComponent['moviesList'].length).toBe(1);
    expect(serviceSpy).toHaveBeenCalled();
    expect(routerSpy).toHaveBeenCalledWith(['movies']);
  });

  it('should test movieDataSubscription()', () => {
    const moviesList: Movie[] = [...moviesListMock];
    const serviceSpy = spyOn(eventsService, 'getMoviesList').and.returnValue(
      of(moviesList)
    );
    const methodSpy = spyOn(detailsComponent, 'searchMovie').and.callFake(
      () => null
    );
    detailsComponent.movieDataSubscription();

    expect(methodSpy).toHaveBeenCalled();
    expect(serviceSpy).toHaveBeenCalled();
    expect(detailsComponent['moviesList'].length).toBe(2);
  });

  it('should test actorDataSubscription()', () => {
    const actorsList: Actor[] = [...actorsListMock];
    const serviceSpy = spyOn(eventsService, 'getActorsList').and.returnValue(
      of(actorsList)
    );
    detailsComponent.actorDataSubscription();

    expect(serviceSpy).toHaveBeenCalled();
    expect(detailsComponent['actorsList'].length).toBe(1);
  });

  it('should test companieDataSubscription()', () => {
    const companiesList: Companie[] = [...companiesListMock];
    const serviceSpy = spyOn(eventsService, 'getCompaniesList').and.returnValue(
      of(companiesList)
    );
    detailsComponent.companieDataSubscription();

    expect(serviceSpy).toHaveBeenCalled();
    expect(detailsComponent['companiesList'].length).toBe(1);
  });

  it('should test searchMovie()', () => {
    const movieListMock: Movie[] = [...moviesListMock];
    detailsComponent['moviesList'] = movieListMock;
    detailsComponent.movieId = 2;
    detailsComponent.searchMovie();
    expect(detailsComponent['movie']).toBe(movieListMock[1]);
  });
});
