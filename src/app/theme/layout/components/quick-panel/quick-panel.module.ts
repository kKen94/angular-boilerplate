import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { QuickPanelComponent } from './quick-panel.component';

@NgModule({
  declarations: [QuickPanelComponent],
  imports: [CommonModule],
  exports: [QuickPanelComponent],
})
export class QuickPanelModule {}
