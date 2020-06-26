import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { NgModule } from '@angular/core';
import { Dialog, MAT_DIALOG_SCROLL_STRATEGY_PROVIDER } from './dialog';
import { DialogContainerComponent } from './dialog-container.component';
import {
  DialogActionsDirective,
  DialogCloseDirective,
  DialogContentDirective,
  DialogTitleDirective,
} from './dialog-content.directive';

@NgModule({
  imports: [OverlayModule, PortalModule],
  exports: [
    DialogContainerComponent,
    DialogCloseDirective,
    DialogTitleDirective,
    DialogContentDirective,
    DialogActionsDirective,
  ],
  declarations: [
    DialogContainerComponent,
    DialogCloseDirective,
    DialogTitleDirective,
    DialogActionsDirective,
    DialogContentDirective,
  ],
  providers: [Dialog, MAT_DIALOG_SCROLL_STRATEGY_PROVIDER],
  entryComponents: [DialogContainerComponent],
})
export class DialogModule {}
