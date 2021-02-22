import { Injectable } from '@angular/core';
import { Capacitor, Plugins } from '@capacitor/core';

const { Accessibility } = Plugins;
const READ_ALOUD_DELAY = 2000;
const TAP_TIME_LAPSE = 300;

@Injectable()
export class AccessibilityService {
  constructor() {}
  private toggle = false;

  readAloud(text: string) {
    return Accessibility.isScreenReaderEnabled().then(isRunning => {
      if (isRunning.value) {
        setTimeout(() => {
          Accessibility.speak({ value: text });
        }, READ_ALOUD_DELAY);
      }
    });
  }

  get isVoiceOverEnabled$(): Promise<boolean> {
    return Accessibility.isScreenReaderEnabled().then(isRunning => {
      if (isRunning.value) {
        if (Capacitor.platform === 'ios') {
          return true;
        }
      }
      return false;
    });
  }

  get isVoiceOverClick$(): Promise<boolean> {
    return this.isVoiceOverEnabled$.then(enabled => {
      if (enabled) {
        if (this.isDoubleTapSequence()) {
          return true;
        }
      }
      return false;
    });
  }

  private isDoubleTapSequence() {
    if (!this.toggle) {
      this.toggle = true;
      setTimeout(() => {
        this.toggle = false;
      }, TAP_TIME_LAPSE);
      return false;
    }
    return true;
  }
}
