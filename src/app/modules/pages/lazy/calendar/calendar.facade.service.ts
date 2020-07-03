import { Injectable } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { LayoutState } from '../../../../theme/layout/state/layout.state';
import { CalendarState } from './state/calendar.state';

@Injectable()
export class CalendarFacade {
  @Select(CalendarState.calendar) calendar$!: Observable<any>;
  @Select(LayoutState.textSearch) search$!: Observable<string>;

  constructor(private store: Store) {}
}
