import { Component } from '@angular/core';
import { faThumbtack } from '@fortawesome/free-solid-svg-icons/faThumbtack';
import { LayoutFacade } from '../../../layout.facade.service';

@Component({
  selector: 'app-navbar-vertical',
  templateUrl: './navbar-vertical.component.html',
})
export class NavbarVerticalComponent {
  faThumbtack = faThumbtack;
  isMenuPin: boolean;

  constructor(private facade: LayoutFacade) {
    this.facade.isMenuPin$.subscribe(result => (this.isMenuPin = result));
  }

  togglePin(): void {
    this.facade.togglePinMenu();
  }
}
