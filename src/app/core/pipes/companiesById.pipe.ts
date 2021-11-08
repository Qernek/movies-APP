import { Pipe, PipeTransform } from '@angular/core';
import { Companie } from '../models/companie';

/**
 * Pipe to search the actor in actorList by the id
 */

@Pipe({
  name: 'findCompanieById',
  pure: true,
})
export class CompaniesById implements PipeTransform {
  companie: Companie | undefined;

  transform(companieId: number | string, companiesList: Companie[]) {
    this.companie = companiesList.find(
      (companie) => companie.id === +companieId
    );
    if (!this.companie) return;
    const companieName = this.companie.name;
    return companieName;
  }
}
