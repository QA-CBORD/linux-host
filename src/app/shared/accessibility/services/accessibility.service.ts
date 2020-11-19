import { Injectable } from '@angular/core';
import { Plugins } from '@capacitor/core';

const { Accessibility } = Plugins;
const READ_ALOUD_DELAY = 2000;

@Injectable()
export class AccessibilityService {
  constructor() {}

  readAloud(text: string) {
    return Accessibility.isScreenReaderEnabled().then(isRunning => {
      if (isRunning.value) {
        setTimeout(() => {
          Accessibility.speak({ value: text });
        }, READ_ALOUD_DELAY);
      }
    });
  }
}
