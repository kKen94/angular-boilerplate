import { AppRoutingModule } from '../app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { environment } from '../../environments/environment';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { AuthState } from '../modules/auth/state/auth/auth.state';
import { NgxsRouterPluginModule } from '@ngxs/router-plugin';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';
import { AuthFacade } from '../modules/auth/auth.facade.service';

// export const initializeConfigs = (
//   appConfig: ConfigService,
// ): (() => Promise<void>) => () => appConfig.load();
// export const initializeSettings = (
//   appSettings: SettingsService,
// ): (() => Promise<void>) => () => appSettings.load();
// export const initializeLanguages = (
//   appLanguage: LanguageService,
// ): (() => Promise<void>) => () => appLanguage.load();

const STATES = [AuthState];

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
    NgxsLoggerPluginModule.forRoot({
      collapsed: false,
      disabled: environment.production,
      logger: console,
    }),
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
  ],
  providers: [
    AuthFacade,
    // ConfigService,
    // SettingsService,
    // LanguageService,
    // TranslationService,
    // { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    // { provide: HTTP_INTERCEPTORS, useClass: BasicAuthInterceptor, multi: true },
    // { provide: HTTP_INTERCEPTORS, useClass: SpinnerInterceptor, multi: true },
    // {
    //   provide: APP_INITIALIZER,
    //   useFactory: initializeConfigs,
    //   deps: [ConfigService],
    //   multi: true,
    // },
    // {
    //   provide: APP_INITIALIZER,
    //   useFactory: initializeSettings,
    //   deps: [SettingsService],
    //   multi: true,
    // },
    // {
    //   provide: APP_INITIALIZER,
    //   useFactory: initializeLanguages,
    //   deps: [LanguageService],
    //   multi: true,
    // },
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
