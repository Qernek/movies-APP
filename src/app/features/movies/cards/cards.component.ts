import { Component, Input, OnInit } from '@angular/core';
import { Movie } from '../../../core/models/movies';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css'],
})
export class CardsComponent implements OnInit {
  @Input() movie: Movie;
  noImage: string =
    'https://dummyimage.com/400x600.png/dddddd/000000&text=No+image+available';
  constructor() {}

  ngOnInit(): void {}
}
