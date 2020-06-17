import { Component } from '@angular/core';
import { faHome } from '@fortawesome/free-solid-svg-icons/faHome';
import { LayoutFacade } from '../../../layout.facade.service';
import { Menu } from '../../../models/menu';
import { MENU } from './menu';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
})
export class MenuComponent {
  actualMenu: Menu;
  isMenuPin: boolean;
  isNavbarHover: boolean;
  menu = MENU;

  constructor(private facade: LayoutFacade) {
    this.facade.isNavbarHover$.subscribe(
      result => (this.isNavbarHover = result),
    );
    facade.menu$.subscribe(result => (this.actualMenu = result));
    this.facade.isMenuPin$.subscribe(result => (this.isMenuPin = result));
  }

  clickedItem(routerLink: string): void {
    if (routerLink) {
      this.facade.goToLink(routerLink);
    }
  }

  checkId(id: string): boolean {
    return this.actualMenu?.id.includes(id);
  }
}
