import { A11yModule } from '@angular/cdk/a11y';
import { BidiModule } from '@angular/cdk/bidi';
import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PopoverHoverDirective } from './popover-hover.directive';
import { PopoverAnchorDirective, PopoverComponent } from './popover.component';

@NgModule({
  declarations: [
    PopoverComponent,
    PopoverAnchorDirective,
    PopoverHoverDirective,
  ],
  imports: [CommonModule, OverlayModule, A11yModule, BidiModule],
  exports: [
    PopoverComponent,
    PopoverAnchorDirective,
    PopoverHoverDirective,
    BidiModule,
  ],
})
export class PopoverModule {}
