import { Component } from '@angular/core';
import { CalendarFacade } from '../../calendar.facade.service';

@Component({
  selector: 'app-calendar-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  calendar: unknown;
  searchBarText!: string;

  constructor(private facade: CalendarFacade) {
    this.facade.calendar$.subscribe(result => {
      this.calendar = result;
    });
    this.facade.search$.subscribe(result => {
      this.searchBarText = result;
    });
  }
}
