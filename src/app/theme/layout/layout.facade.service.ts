import { Injectable } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { TogglePanel } from './state/layout.action';
import { LayoutState } from './state/layout.state';

@Injectable()
export class LayoutFacade {
  @Select(LayoutState.openPanel) isPanelOpened$: Observable<boolean>;

  constructor(private store: Store) {}

  togglePanel(): void {
    this.store.dispatch(new TogglePanel());
  }

  closePanel(): void {
    this.store.dispatch(new TogglePanel(false));
  }
}
