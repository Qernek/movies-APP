import { Component, OnInit } from '@angular/core';
import { SidenavService } from '../../services/sidenav/sidenav.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  pageTitle: string;

  constructor(private sidenav: SidenavService) {}

  ngOnInit(): void {}

  /**
   * open / close sidenav menu
   */
  toggleSidenav() {
    this.sidenav.toggle();
  }
}
