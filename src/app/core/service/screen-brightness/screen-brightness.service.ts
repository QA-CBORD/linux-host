import { Injectable } from '@angular/core';
import { NativeProvider } from '@core/provider/native-provider/native.provider';
import { ScreenBrightness, GetBrightnessReturnValue, SetBrightnessOptions } from '@capacitor-community/screen-brightness';

@Injectable({ providedIn: 'root' })
export class ScreenBrigtnessService {

  constructor (
    private readonly nativeProvider: NativeProvider) {
  }

  getBrightness(): Promise<GetBrightnessReturnValue> {
    if (this.nativeProvider.isMobile()) return ScreenBrightness.getBrightness();
  }

  setBrightness(value: SetBrightnessOptions): Promise<void> {
    if (this.nativeProvider.isMobile() && value) return ScreenBrightness.setBrightness(value);
  }
}
