import { Injectable } from '@angular/core';
import { AppSettings } from './appsettings';

@Injectable({
  providedIn: 'root',
})
export class AppSettingsService {
  public appSettings!: AppSettings;
  public constructor() {}
}
