import { Pipe, PipeTransform } from '@angular/core';
import { Companies } from '../models/companies';

/**
 * Pipe to search the actor in actorList by the id
 */

@Pipe({
  name: 'findCompanieById',
})
export class CompaniesById implements PipeTransform {
  companie: Companies | undefined;

  transform(companieId: number | string, companiesList: Companies[]) {
    this.companie = companiesList.find(
      (companie) => companie.id === +companieId
    );
    if (!this.companie) return;
    const companieName = this.companie.name;
    return companieName;
  }
}
