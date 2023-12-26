import { Location } from '@angular/common';
import { HttpBackend, HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { mergeMap, tap } from 'rxjs/operators';
import { AppSettingsService } from './app-settings.service';
import { AppSettings } from './appsettings';

export function appSettingsFactory(
  location: Location,
  httpBackend: HttpBackend,
  appSettingsService: AppSettingsService
): () => Observable<void> {
  const httpClient = new HttpClient(httpBackend);
  const appSettingsPath = 'assets/appsettings.json?v=$(build.buildnumber)';

  const fullAppSettingsPath = location.prepareExternalUrl(appSettingsPath);

  const request = (): Observable<void> =>
    httpClient.get<AppSettings>(fullAppSettingsPath).pipe(
      tap((response) => {
        appSettingsService.appSettings = response;
      }),
      mergeMap(() => of(void 0))
    );

  return request;
}
