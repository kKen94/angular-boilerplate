import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, StateToken } from '@ngxs/store';
import { TogglePanel } from './layout.action';

/******************************** STATE MODEL ********************************/

interface LayoutStateModel {
  openPanel: boolean;
}

class LayoutStateModel {
  constructor() {
    this.openPanel = false;
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

  @Action(TogglePanel)
  togglePanel(ctx: StateContext<LayoutStateModel>, action: TogglePanel): void {
    const isPanelOpen = ctx.getState().openPanel;
    ctx.patchState({
      openPanel: action.openPanel ?? !isPanelOpen,
    });
  }
}
