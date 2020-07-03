import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { faBars } from '@fortawesome/free-solid-svg-icons/faBars';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons/faChevronDown';
import { faList } from '@fortawesome/free-solid-svg-icons/faList';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons/faSignOutAlt';
import { AuthFacade } from '../../../../modules/auth/auth.facade.service';
import { LayoutFacade } from '../../layout.facade.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  faList = faList;
  faBars = faBars;
  faChevronDown = faChevronDown;
  faSignOut = faSignOutAlt;
  username!: string;
  showPanel = false;

  constructor(
    private layoutFacade: LayoutFacade,
    private authFacade: AuthFacade,
  ) {
    this.layoutFacade.username$.subscribe(result => (this.username = result));
  }

  openPanel(e: MouseEvent): void {
    e.stopPropagation();
    this.layoutFacade.openPanel();
  }

  openMenu(e: MouseEvent): void {
    e.stopPropagation();
    this.layoutFacade.openMenu();
  }

  logout(): void {
    this.authFacade.logout();
  }
}
