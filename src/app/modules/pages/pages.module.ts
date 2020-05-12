import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LayoutModule } from '@layout';
import { DashboardModule } from './containers/dashboard/dashboard.module';
import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';

@NgModule({
  declarations: [PagesComponent],
  imports: [LayoutModule, CommonModule, PagesRoutingModule, DashboardModule],
})
export class PagesModule {}
