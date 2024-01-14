import { Injectable, signal } from '@angular/core';
import { AppSettings } from './appsettings';

@Injectable({
  providedIn: 'root',
})
export class AppSettingsService {
  public appSettings = signal<AppSettings | undefined>(undefined);
  public constructor() {}
}
