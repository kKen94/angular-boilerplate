import { Injectable } from '@angular/core';
import { Navigate, RouterState } from '@ngxs/router-plugin';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Menu, QuickPanel, TogglePinMenu } from './state/layout.action';
import { LayoutState } from './state/layout.state';
import OpenPanel = QuickPanel.Open;
import ClosePanel = QuickPanel.Close;
import OpenMenu = Menu.Open;
import CloseMenu = Menu.Close;

@Injectable()
export class LayoutFacade {
  @Select(LayoutState.openPanel) isPanelOpen$: Observable<boolean>;
  @Select(LayoutState.openMenu) isMenuOpen$: Observable<boolean>;
  @Select(LayoutState.pinMenu) isMenuPin$: Observable<boolean>;
  @Select(RouterState.url) routerLink$: Observable<string>;

  constructor(private store: Store) {}

  closePanel(): void {
    this.store.dispatch(new ClosePanel());
  }

  openPanel(): void {
    this.store.dispatch(new OpenPanel());
  }

  openMenu(): void {
    this.store.dispatch(new OpenMenu());
  }

  closeMenu(): void {
    this.store.dispatch(new CloseMenu());
  }

  togglePinMenu(open?: boolean): void {
    this.store.dispatch(new TogglePinMenu(open));
  }

  goToLink(routerLink: string): void {
    this.store.dispatch(new Navigate([routerLink]));
  }
}
