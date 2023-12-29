import { APP_INITIALIZER, ApplicationConfig } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { Location, LocationStrategy } from '@angular/common';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideClientHydration } from '@angular/platform-browser';
import { routes } from './app.routes';
import { appSettingsFactory } from './appsettings/app-settings.factory';
import { AppSettingsService } from './appsettings/app-settings.service';
import { API_BASE_URL } from './web-api-client';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(withFetch(), withInterceptors([])),
    // {
    //   provide: APP_BASE_HREF,
    //   useFactory: BaseHrefFactory,
    //   deps: [PlatformLocation],
    // },
    {
      provide: APP_INITIALIZER,
      useFactory: appSettingsFactory,
      deps: [Location, LocationStrategy, AppSettingsService],
      multi: true,
    },
    {
      provide: API_BASE_URL,
      useFactory: (appSettingsService: AppSettingsService) => appSettingsService.appSettings.apiUrl,
      deps: [AppSettingsService],
    },

    provideClientHydration(),
  ],
};
