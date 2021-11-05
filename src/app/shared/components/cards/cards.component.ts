import { Component, Input, OnInit } from '@angular/core';
import { Movies } from '../../../core/models/movies';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css'],
})
export class CardsComponent implements OnInit {
  @Input() card: Movies;
  constructor() {}

  ngOnInit(): void {}
}
