import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard.component';
import { DialogModule } from '../../../../shared/components/dialog';

@NgModule({
  declarations: [DashboardComponent],
  imports: [CommonModule, DialogModule],
})
export class DashboardModule {}
