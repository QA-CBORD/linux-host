import { Platform } from '@ionic/angular';
import { Platforms } from '@core/utils/platform.enum';

/**
 * Checks to see if device is mobile
 * @param platform - Ionic Platform
 */
export function isMobile(platform: Platform): boolean {
  return (platform.is(Platforms.ANDROID)
    || platform.is(Platforms.IOS)
    || platform.is(Platforms.MOBILE)
    || platform.is(Platforms.TABLET)
  )
}
