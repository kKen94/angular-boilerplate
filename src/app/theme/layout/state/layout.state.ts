import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, StateToken } from '@ngxs/store';
import { MENU } from '../components/navbar/menu/menu';
import HoverInNavbar = Navbar.HoverIn;
import HoverOutNavbar = Navbar.HoverOut;
import OpenPanel = QuickPanel.Open;
import ClosePanel = QuickPanel.Close;
import OpenMenu = Menu.Open;
import CloseMenu = Menu.Close;
import TogglePin = Menu.TogglePin;
import { Menu as MenuModel } from '../models/menu';
import { Menu, Navbar, QuickPanel, SetMenu } from './layout.action';
import { SearchForm } from '../models/layout';
import { FormState } from '@model';

/******************************** STATE MODEL ********************************/

interface LayoutStateModel {
  hoverNavbar: boolean;
  openPanel: boolean;
  openMenu: boolean;
  pinMenu: boolean;
  actualMenu: MenuModel;
  searchForm: FormState<SearchForm>;
}

class LayoutStateModel {
  constructor() {
    this.hoverNavbar = false;
    this.openPanel = false;
    this.openMenu = true;
    this.pinMenu = true;
    this.actualMenu = undefined;
    this.searchForm = new FormState();
  }
}

/******************************** STATE DECLARATION *************************/

export const LAYOUT_STATE_TOKEN = new StateToken<LayoutStateModel>('layout');

@State({
  name: LAYOUT_STATE_TOKEN,
  defaults: new LayoutStateModel(),
})
/****************************** COMPONENT ***********************************/

@Injectable()
export class LayoutState {
  @Selector([LAYOUT_STATE_TOKEN])
  static openPanel(state: LayoutStateModel): boolean {
    return state.openPanel;
  }

  @Selector([LAYOUT_STATE_TOKEN])
  static openMenu(state: LayoutStateModel): boolean {
    return state.openMenu;
  }

  @Selector([LAYOUT_STATE_TOKEN])
  static pinMenu(state: LayoutStateModel): boolean {
    return state.pinMenu;
  }

  @Selector([LAYOUT_STATE_TOKEN])
  static hoverNavbar(state: LayoutStateModel): boolean {
    return state.hoverNavbar;
  }

  @Selector([LAYOUT_STATE_TOKEN])
  static actualMenu(state: LayoutStateModel): MenuModel {
    return state.actualMenu;
  }

  @Selector([LAYOUT_STATE_TOKEN])
  static textSearch(state: LayoutStateModel): string {
    return state.searchForm.model.textField;
  }

  @Action(HoverInNavbar)
  hoverInNavbar(ctx: StateContext<LayoutStateModel>): void {
    ctx.patchState({
      hoverNavbar: true,
    });
  }

  @Action(HoverOutNavbar)
  hoverOutNavbar(ctx: StateContext<LayoutStateModel>): void {
    ctx.patchState({
      hoverNavbar: false,
    });
  }

  @Action(OpenPanel)
  openQuickPanel(ctx: StateContext<LayoutStateModel>): void {
    ctx.patchState({
      openPanel: true,
    });
  }

  @Action(ClosePanel)
  closeQuickPanel(ctx: StateContext<LayoutStateModel>): void {
    ctx.patchState({
      openPanel: false,
    });
  }

  @Action(OpenMenu)
  openMenu(ctx: StateContext<LayoutStateModel>): void {
    ctx.patchState({
      openMenu: true,
    });
  }

  @Action(CloseMenu)
  closeMenu(ctx: StateContext<LayoutStateModel>): void {
    ctx.patchState({
      openMenu: false,
    });
  }

  @Action(TogglePin)
  togglePinMenu(ctx: StateContext<LayoutStateModel>, action: TogglePin): void {
    const pinMenu = ctx.getState().pinMenu;
    ctx.patchState({
      pinMenu: action.open ?? !pinMenu,
    });
  }

  @Action(SetMenu)
  setMenu(ctx: StateContext<LayoutStateModel>, action: SetMenu): void {
    let menu = MENU.find(c => c.routerLink.includes(action.activeUrl));
    if (!menu && !action.activeUrl.includes('cart')) {
      const s = action.activeUrl.split('/').slice(0, -1).join('/');
      menu = MENU.find(
        c =>
          c.routerLink.includes(s) &&
          c.routerLink.includes('{') &&
          c.routerLink.includes('}'),
      );
    }
    ctx.patchState({
      actualMenu: menu,
    });
  }
}
