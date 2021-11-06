import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { AppComponent } from './components/base/app.component';
import { RouterModule } from '@angular/router';
import { MaterialsModule } from './modules/materials.module';
import { TranslateModule } from '@ngx-translate/core';
import { NgxSpinnerModule } from 'ngx-spinner';
@NgModule({
  declarations: [AppComponent, HeaderComponent, SidenavComponent],
  exports: [],
  imports: [
    CommonModule,
    RouterModule,
    MaterialsModule,
    TranslateModule,
    NgxSpinnerModule,
  ],
})
export class CoreModule {}
