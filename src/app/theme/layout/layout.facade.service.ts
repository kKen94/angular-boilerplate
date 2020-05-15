import { Injectable } from '@angular/core';
import { Navigate, RouterState } from '@ngxs/router-plugin';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { AuthState } from '../../modules/auth/state/auth/auth.state';
import { Menu, Navbar, QuickPanel } from './state/layout.action';
import { LayoutState } from './state/layout.state';
import OpenPanel = QuickPanel.Open;
import ClosePanel = QuickPanel.Close;
import OpenMenu = Menu.Open;
import CloseMenu = Menu.Close;
import TogglePin = Menu.TogglePin;
import HoverIn = Navbar.HoverIn;
import HoverOut = Navbar.HoverOut;

@Injectable()
export class LayoutFacade {
  @Select(LayoutState.hoverNavbar) isNavbarHover$: Observable<boolean>;
  @Select(LayoutState.openPanel) isPanelOpen$: Observable<boolean>;
  @Select(LayoutState.openMenu) isMenuOpen$: Observable<boolean>;
  @Select(LayoutState.pinMenu) isMenuPin$: Observable<boolean>;
  @Select(RouterState.url) routerLink$: Observable<string>;
  @Select(AuthState.username) username$: Observable<string>;

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

  hoverInNavbar(): void {
    this.store.dispatch(new HoverIn());
  }

  hoverOutNavbar(): void {
    this.store.dispatch(new HoverOut());
  }

  togglePinMenu(open?: boolean): void {
    this.store.dispatch(new TogglePin(open));
  }

  goToLink(routerLink: string): void {
    this.store.dispatch(new Navigate([routerLink]));
  }
}
