import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MenuModule } from '../menu/menu.module';
import { NavbarVerticalComponent } from './navbar-vertical.component';

@NgModule({
  declarations: [NavbarVerticalComponent],
  imports: [CommonModule, MenuModule, FontAwesomeModule],
  exports: [NavbarVerticalComponent],
})
export class NavbarVerticalModule {}
