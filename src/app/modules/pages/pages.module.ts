import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { LayoutModule } from '../../theme/layout/layout.module';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';

@NgModule({
  declarations: [PagesComponent],
  imports: [LayoutModule, CommonModule, PagesRoutingModule],
})
export class PagesModule {}
