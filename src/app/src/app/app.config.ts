import { APP_INITIALIZER, ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { API_BASE_URL, DiagnosticsClient } from './web-api-client';
import { appSettingsFactory } from './appsettings/app-settings.factory';
import { AppSettingsService } from './appsettings/app-settings.service';
import { HttpBackend } from '@angular/common/http';
import { LocationStrategy } from '@angular/common';
import { ApiBaseUrlFactory } from './appsettings/api-url.factory';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    DiagnosticsClient,
    {
      provide: APP_INITIALIZER,
      useFactory: appSettingsFactory,
      deps: [Location, LocationStrategy, HttpBackend, AppSettingsService],
      multi: true,
    },
    {
      provide: API_BASE_URL,
      useFactory: ApiBaseUrlFactory,
      deps: [AppSettingsService],
    },
  ],
};
