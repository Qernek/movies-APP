import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormComponent } from './form/form.component';
import { DetailsComponent } from './details/details.component';
import { MoviesRoutingModule } from './movies-routing.module';
import { CardsComponent } from '../../shared/components/cards/cards.component';
import { MaterialsModule } from '../../core/modules/materials.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CoreModule } from '../../core/core.module';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    DashboardComponent,
    FormComponent,
    DetailsComponent,
    CardsComponent,
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
