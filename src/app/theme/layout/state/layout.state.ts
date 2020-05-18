import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, StateToken } from '@ngxs/store';
import { Menu, Navbar, QuickPanel } from './layout.action';
import HoverInNavbar = Navbar.HoverIn;
import HoverOutNavbar = Navbar.HoverOut;
import OpenPanel = QuickPanel.Open;
import ClosePanel = QuickPanel.Close;
import OpenMenu = Menu.Open;
import CloseMenu = Menu.Close;
import TogglePin = Menu.TogglePin;

/******************************** STATE MODEL ********************************/

interface LayoutStateModel {
  hoverNavbar: boolean;
  openPanel: boolean;
  openMenu: boolean;
  pinMenu: boolean;
}

class LayoutStateModel {
  constructor() {
    this.hoverNavbar = false;
    this.openPanel = false;
    this.openMenu = true;
    this.pinMenu = true;
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
}
