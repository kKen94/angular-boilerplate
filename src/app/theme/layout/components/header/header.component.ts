import { Component } from '@angular/core';
import { faList } from '@fortawesome/free-solid-svg-icons/faList';
import { LayoutFacade } from '../../layout.facade.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  faList = faList;

  constructor(private layoutFacade: LayoutFacade) {}

  togglePanel(): void {
    this.layoutFacade.togglePanel();
  }
}
