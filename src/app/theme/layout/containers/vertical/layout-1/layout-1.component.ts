import {
  Component,
  HostListener,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { faSearch } from '@fortawesome/free-solid-svg-icons/faSearch';
// @ts-ignore
import * as tailwind from '@tailwind-config';
import { navbar } from '../../../animations/navbar';
import { LayoutFacade } from '../../../layout.facade.service';
import { Menu } from '../../../models/menu';

@Component({
  selector: 'app-vertical-layout-1',
  templateUrl: './layout-1.component.html',
  encapsulation: ViewEncapsulation.None,
  animations: [navbar],
})
export class VerticalLayout1Component implements OnInit {
  mdWidth = parseInt(tailwind.theme.screens.md.max);
  previousWidth!: number;
  isNavbarHover!: boolean;
  isPanelOpen!: boolean;
  isMenuOpen!: boolean;
  isMenuPin!: boolean;
  actualMenu!: Menu;
  faSearch = faSearch;
  searchForm: FormGroup;

  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent): void {
    if (event.code === 'Escape') {
      this.closePanel();
      this.closeMenu();
      this.hoverOutNavbar();
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: { _: unknown; target: Window }): void {
    if (
      event.target.innerWidth <= this.mdWidth &&
      this.previousWidth > this.mdWidth
    ) {
      this.closeMenu();
      this.facade.togglePinMenu(true);
    }
    if (
      this.previousWidth <= this.mdWidth &&
      event.target.innerWidth > this.mdWidth
    ) {
      this.openMenu();
    }
    this.previousWidth = event.target.innerWidth;
  }

  constructor(private facade: LayoutFacade, private fb: FormBuilder) {
    this.searchForm = fb.group({
      textField: [''],
    });
    this.facade.isNavbarHover$.subscribe(
      result => (this.isNavbarHover = result),
    );
    this.facade.isPanelOpen$.subscribe(result => (this.isPanelOpen = result));
    this.facade.isMenuOpen$.subscribe(result => (this.isMenuOpen = result));
    this.facade.isMenuPin$.subscribe(result => (this.isMenuPin = result));
    this.facade.menu$.subscribe(result => (this.actualMenu = result));
  }

  ngOnInit(): void {
    this.previousWidth = window.innerWidth;
    if (window.innerWidth <= this.mdWidth) {
      this.closeMenu();
    }
  }

  closePanel(): void {
    if (this.isPanelOpen) {
      this.facade.closePanel();
    }
  }

  closeMenu(): void {
    if (this.isMenuOpen && window.innerWidth <= this.mdWidth) {
      this.facade.closeMenu();
    }
  }

  openMenu(): void {
    if (!this.isMenuOpen) {
      this.facade.openMenu();
    }
  }

  hoverInNavbar(): void {
    this.facade.hoverInNavbar();
  }

  hoverOutNavbar(): void {
    if (this.isNavbarHover) {
      this.facade.hoverOutNavbar();
    }
  }
}
