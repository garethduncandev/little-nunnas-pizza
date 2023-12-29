import { PlatformLocation } from '@angular/common';

export function BaseHrefFactory(platformLocation: PlatformLocation): string {
  const defaultBaseHref = platformLocation.getBaseHrefFromDOM();

  return defaultBaseHref;
}
