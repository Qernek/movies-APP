import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { RequestService } from '../../services/request/request.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(
    private readonly translate: TranslateService,
    private readonly requestService: RequestService
  ) {
    this.translate.setDefaultLang('es');
    this.requestService.getAllData();
  }
}
