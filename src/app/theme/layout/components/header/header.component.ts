import { Component } from '@angular/core';
import { faBars } from '@fortawesome/free-solid-svg-icons/faBars';
import { faList } from '@fortawesome/free-solid-svg-icons/faList';
import { LayoutFacade } from '../../layout.facade.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  faList = faList;
  faBars = faBars;

  constructor(private layoutFacade: LayoutFacade) {}

  openPanel(e): void {
    e.stopPropagation();
    this.layoutFacade.openPanel();
  }

  openMenu(e): void {
    e.stopPropagation();
    this.layoutFacade.openMenu();
  }
}
