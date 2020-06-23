import { NgModule } from '@angular/core';
import { ModalModule } from '@components';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';
import { NgxsModule } from '@ngxs/store';
import { CalendarApi } from './api/calendar.api.service';
import { CalendarRoutingModule } from './calendar-routing.module';
import { CalendarComponent } from './calendar.component';
import { CalendarFacade } from './calendar.facade.service';
import { HomeModule } from './containers/home/home.module';
import { CalendarState } from './state/calendar.state';

const STATES = [CalendarState];

@NgModule({
  declarations: [CalendarComponent],
  imports: [
    CalendarRoutingModule,
    HomeModule,
    NgxsFormPluginModule,
    ModalModule.forChild(),
    NgxsModule.forFeature(STATES),
  ],
  providers: [
    CalendarApi,
    CalendarFacade,
  ],
})
export class CalendarModule {}
