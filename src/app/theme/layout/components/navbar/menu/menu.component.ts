import { Component } from '@angular/core';
import { faHome } from '@fortawesome/free-solid-svg-icons/faHome';
import { LayoutFacade } from '../../../layout.facade.service';
import { Menu } from '../../../models/menu';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
})
export class MenuComponent {
  activeLink: string;
  isMenuPin: boolean;

  menu: Menu[] = [
    {
      displayedName: 'Dashboard',
      icon: faHome,
      routerLink: '/pages/dashboard',
    },
  ];

  constructor(private facade: LayoutFacade) {
    facade.routerLink$.subscribe(result => (this.activeLink = result));
    this.facade.isMenuPin$.subscribe(result => (this.isMenuPin = result));
  }

  clickedItem(routerLink: string): void {
    if (routerLink) {
      this.facade.goToLink(routerLink);
    }
  }
}
