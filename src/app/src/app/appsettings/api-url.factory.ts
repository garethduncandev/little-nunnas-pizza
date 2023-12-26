import { AppSettingsService } from './app-settings.service';

export const ApiBaseUrlFactory = (environmentServiceHost: AppSettingsService): string => {
  return environmentServiceHost.appSettings.apiUrl;
};
