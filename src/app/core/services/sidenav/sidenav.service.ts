import { Injectable } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Injectable({
  providedIn: 'root',
})
export class SidenavService {
  private sidenav: MatSidenav;

  constructor() {}

  /**
   * sidenav is given value to interact with it
   * @param sidenav sidenav element
   */
  public setSidenav(sidenav: MatSidenav) {
    this.sidenav = sidenav;
  }

  /**
   * Open or close the sidenav menu
   * @returns sidenav element
   */
  public toggle() {
    return this.sidenav.toggle();
  }

  /**
   * Open the sidenav menu
   * @returns sidenav element
   */
  public open() {
    return this.sidenav.open();
  }

  /**
   * Close the sidenav menu
   * @returns sidenav element
   */
  public close() {
    return this.sidenav.close();
  }
}
