import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { APP_INITIALIZER, NgModule, Optional, SkipSelf } from '@angular/core';
import { ModalModule } from '@components';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsRouterPluginModule } from '@ngxs/router-plugin';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { NgxsModule } from '@ngxs/store';
import { NgxsWebsocketCustomPluginModule } from '@plugin/@ngxs';
import { noop } from '@utility';
import { environment } from '../../environments/environment';
import { AppRoutingModule } from '../app-routing.module';
import { AuthFacade } from '../modules/auth/auth.facade.service';
import { AuthState } from '../modules/auth/state/auth.state';
import { LayoutFacade } from '../theme/layout/layout.facade.service';
import { LayoutState } from '../theme/layout/state/layout.state';
import { ErrorInterceptor } from './interceptors/error.interceptor';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { ConfigService } from './services/config.service';

export const initializeConfigs = (
  appConfig: ConfigService,
): (() => Promise<void>) => () => appConfig.load();
// export const initializeSettings = (
//   appSettings: SettingsService,
// ): (() => Promise<void>) => () => appSettings.load();
// export const initializeLanguages = (
//   appLanguage: LanguageService,
// ): (() => Promise<void>) => () => appLanguage.load();

const STATES = [AuthState, LayoutState];

@NgModule({
  imports: [
    HttpClientModule,
    AppRoutingModule,
    NgxsModule.forRoot(STATES, { developmentMode: !environment.production }),
    NgxsStoragePluginModule.forRoot({
      key: 'auth.token',
      // storage: per scegliere tra session e local potrei implementare un'interfaccia custom come suggerito dalla documentazione del plugin
    }),
    NgxsFormPluginModule.forRoot(),
    NgxsRouterPluginModule.forRoot(),
    NgxsReduxDevtoolsPluginModule.forRoot({ disabled: environment.production }),
    NgxsWebsocketCustomPluginModule.forRoot(),
    NgxsLoggerPluginModule.forRoot({
      collapsed: false,
      disabled: environment.production,
      logger: console,
    }),
    ModalModule.forRoot(),
  ],
  exports: [
    HttpClientModule,
    AppRoutingModule,
    NgxsModule,
    NgxsStoragePluginModule,
    NgxsFormPluginModule,
    NgxsRouterPluginModule,
    NgxsReduxDevtoolsPluginModule,
    NgxsLoggerPluginModule,
    NgxsWebsocketCustomPluginModule,
    ModalModule,
  ],
  providers: [
    AuthFacade,
    LayoutFacade,
    ConfigService,
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    {
      provide: APP_INITIALIZER,
      useFactory: initializeConfigs,
      deps: [ConfigService],
      multi: true,
    },
    {
      provide: APP_INITIALIZER,
      useFactory: noop, // Trick to listen on RouterDataResolved in LayoutFacade immediatly
      deps: [LayoutFacade],
      multi: true,
    },
  ],
})
export class CoreModule {
  // Make sure CoreModule is imported only by one NgModule the AppModule
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import only in AppModule');
    }
  }
}
