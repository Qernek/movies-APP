import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { AppComponent } from './components/base/app.component';
import { RouterModule } from '@angular/router';
import { MaterialsModule } from './modules/materials.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SidenavComponent,
  ],
  exports: [],
  imports: [CommonModule, RouterModule, MaterialsModule],
})
export class CoreModule {}
