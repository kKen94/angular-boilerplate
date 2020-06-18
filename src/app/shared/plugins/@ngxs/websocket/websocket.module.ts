import { APP_INITIALIZER, ModuleWithProviders, NgModule } from '@angular/core';
import { noop } from '@utility';
import { WebSocketHandler } from './websocket.service';

@NgModule()
export class NgxsWebsocketCustomPluginModule {
  static forRoot(): ModuleWithProviders<NgxsWebsocketCustomPluginModule> {
    return {
      ngModule: NgxsWebsocketCustomPluginModule,
      providers: [
        WebSocketHandler,
        {
          provide: APP_INITIALIZER,
          useFactory: noop,
          deps: [WebSocketHandler],
          multi: true,
        },
      ],
    };
  }
}
