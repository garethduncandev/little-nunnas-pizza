import { Location } from '@angular/common';
import { FetchBackend, HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, mergeMap, tap } from 'rxjs/operators';
import { AppSettingsService } from './app-settings.service';
import { AppSettings } from './appsettings';

export function appSettingsFactory(): () => Observable<void> {
  const location = inject(Location);
  const appSettingsService = inject(AppSettingsService);
  const fetchBackendClient = inject(FetchBackend);
  const httpClient = new HttpClient(fetchBackendClient);

  const buildNumber = '$(build.buildnumber)';

  const appSettingsPath = `assets/appsettings.json?v=${buildNumber}`;
  const fullAppSettingsPath = location.prepareExternalUrl(appSettingsPath);

  const request = (): Observable<void> =>
    httpClient
      .get<AppSettings>(fullAppSettingsPath, {
        responseType: 'json',
      })
      .pipe(
        catchError((error) => {
          console.error(error);
          return of({} as AppSettings);
        }),
        tap((response) => {
          appSettingsService.appSettings = response;
        }),
        mergeMap(() => of(void 0))
      );

  return request;
}
