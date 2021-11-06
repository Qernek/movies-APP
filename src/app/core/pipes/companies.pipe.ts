import { Pipe, PipeTransform } from '@angular/core';
import { Companies } from '../models/companies';
import { TranslateService } from '@ngx-translate/core';

/**
 * Pipe to search the companies in companiesList with the id of the movie
 */

@Pipe({
  name: 'findCompanie',
})
export class CompaniesPipe implements PipeTransform {
  constructor(private readonly translateService: TranslateService) {}
  companieName: string;

  transform(movieId: number, companiesList: Companies[]) {
    console.log(companiesList);
    for (let i = 0; i < companiesList.length; i++) {
      const companie = companiesList[i];
      for (let z = 0; z < companie.movies.length; z++) {
        const companieMovie = companie.movies[z];
        if (companieMovie === movieId) {
          this.companieName = companie.name;
        }
      }
    }
    return this.companieName
      ? this.companieName
      : this.translateService.instant('shared.components.cards.companies');
  }
}
