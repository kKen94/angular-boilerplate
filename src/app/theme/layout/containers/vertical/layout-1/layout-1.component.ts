import { Component, ViewEncapsulation } from '@angular/core';
import { LayoutFacade } from '../../../layout.facade.service';

@Component({
  selector: 'app-vertical-layout-1',
  templateUrl: './layout-1.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class VerticalLayout1Component {
  isPanelOpen: boolean;

  constructor(private layoutFacade: LayoutFacade) {
    this.layoutFacade.isPanelOpen$.subscribe(
      result => (this.isPanelOpen = result),
    );
  }
}
