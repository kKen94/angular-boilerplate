import { Component, HostListener, ViewEncapsulation } from '@angular/core';
import { LayoutFacade } from '../../../layout.facade.service';

@Component({
  selector: 'app-vertical-layout-1',
  templateUrl: './layout-1.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class VerticalLayout1Component {
  isPanelOpened: boolean;

  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    if (event.code === 'Escape') {
      this.closePanel();
    }
  }

  constructor(private layoutFacade: LayoutFacade) {
    this.layoutFacade.isPanelOpened$.subscribe(
      result => (this.isPanelOpened = result),
    );
  }

  closePanel(): void {
    if (this.isPanelOpened) {
      this.layoutFacade.closePanel();
    }
  }
}
