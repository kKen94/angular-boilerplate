import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  Navigate,
  RouterDataResolved,
  RouterError,
  RouterState,
} from '@ngxs/router-plugin';
import { Actions, ofActionSuccessful, Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { AuthState } from '../../modules/auth/state/auth.state';
import OpenPanel = QuickPanel.Open;
import ClosePanel = QuickPanel.Close;
import OpenMenu = Menu.Open;
import CloseMenu = Menu.Close;
import TogglePin = Menu.TogglePin;
import HoverIn = Navbar.HoverIn;
import HoverOut = Navbar.HoverOut;
import { Menu as MenuModel } from './models/menu';
import { Menu, Navbar, QuickPanel, SetMenu } from './state/layout.action';
import { LayoutState } from './state/layout.state';

@Injectable()
export class LayoutFacade {
  @Select(LayoutState.hoverNavbar) isNavbarHover$: Observable<boolean>;
  @Select(LayoutState.openPanel) isPanelOpen$: Observable<boolean>;
  @Select(LayoutState.openMenu) isMenuOpen$: Observable<boolean>;
  @Select(LayoutState.pinMenu) isMenuPin$: Observable<boolean>;
  @Select(LayoutState.actualMenu) menu$: Observable<MenuModel>;
  @Select(AuthState.username) username$: Observable<string>;

  constructor(
    private store: Store,
    private actions$: Actions,
    private router: Router,
  ) {
    this.actions$
      .pipe(ofActionSuccessful(RouterError))
      .subscribe(() =>
        this.store.dispatch(new Navigate([router.routerState.snapshot.url])),
      );
    this.actions$.pipe(ofActionSuccessful(RouterDataResolved)).subscribe(() => {
      const activeUrl = this.store.selectSnapshot(RouterState.url);
      this.store.dispatch(new SetMenu(activeUrl));
    });
  }

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
