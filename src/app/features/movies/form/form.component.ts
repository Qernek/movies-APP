import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  genders: string[] = [];
  actors: string[] = [];
  actorsCtrl = new FormControl();
  filteredActors: Observable<string[]>;
  allActors: string[] = ['1', '2', '3'];
  companies: string[] = ['1', '2'];
  @ViewChild('actorsInput') actorsInput: ElementRef<HTMLInputElement>;

  constructor() {
    this.filteredActors = this.actorsCtrl.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) =>
        fruit ? this._filter(fruit) : this.allActors.slice()
      )
    );
  }

  ngOnInit(): void {}

  /**
   * add chips to field
   * @param event event
   * @param type genders or actors
   */
  add(event: MatChipInputEvent, type: string): void {
    const value = (event.value || '').trim();
    if (value) {
      if (type === 'genders') {
        this.genders.push(value);
      } else if (type === 'actors') {
        this.actors.push(value);
      }
    }
    // Clear the input value
    event.chipInput!.clear();
  }

  /**
   * Remove specific gender from list
   * @param element chip to delete
   * @param type genders or actors
   */
  remove(element: string, type: string): void {
    if (type === 'genders') {
      const index = this.genders.indexOf(element);

      if (index >= 0) {
        this.genders.splice(index, 1);
      }
    } else if (type === 'actors') {
      const index = this.actors.indexOf(element);

      if (index >= 0) {
        this.actors.splice(index, 1);
      }
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.actors.push(event.option.viewValue);
    this.actorsInput.nativeElement.value = '';
    this.actorsCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allActors.filter((actors) =>
      actors.toLowerCase().includes(filterValue)
    );
  }
}
