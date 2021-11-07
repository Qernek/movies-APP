import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormComponent } from './form/form.component';
import { DetailsComponent } from './details/details.component';
import { MoviesRoutingModule } from './movies-routing.module';
import { CardsComponent } from './cards/cards.component';
import { MaterialsModule } from '../../core/modules/materials.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CoreModule } from '../../core/core.module';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TimePipe } from '../../core/pipes/time.pipe';
import { ActorsPipe } from '../../core/pipes/actors.pipe';
import { CompaniesByMoviePipe } from '../../core/pipes/companiesByMovie.pipe';
import { CompaniesById } from '../../core/pipes/companiesById.pipe';

@NgModule({
  declarations: [
    DashboardComponent,
    FormComponent,
    DetailsComponent,
    CardsComponent,
    TimePipe,
    ActorsPipe,
    CompaniesByMoviePipe,
    CompaniesById,
  ],
  imports: [
    CommonModule,
    MoviesRoutingModule,
    MaterialsModule,
    FlexLayoutModule,
    CoreModule,
    TranslateModule,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class MoviesModule {}
