import { Injectable } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { of } from 'rxjs/internal/observable/of';
import { Platform } from '@ionic/angular';
import { ScreenReader } from '@capacitor/screen-reader';

const READ_ALOUD_DELAY = 2000;
const TAP_TIME_LAPSE = 300;

export enum PLATFORM {
  ios = 'ios',
  android = 'android',
  web = 'web',
}
@Injectable()
export class AccessibilityService {
  constructor(private readonly platform: Platform) {}
  private toggle = false;

  readAloud(text: string) {
    if (!this.platform.is('cordova')) return;

    return ScreenReader.isEnabled().then(isRunning => {
      if (isRunning.value) {
        setTimeout(() => {
          ScreenReader.speak({ value: text });
        }, READ_ALOUD_DELAY);
      }
    });
  }

  get isVoiceOverEnabled$(): Promise<boolean> {
    if (Capacitor.getPlatform() === PLATFORM.web) {
        return of(false).toPromise();
    }

    return ScreenReader.isEnabled().then(isRunning => {
      if (isRunning.value) {
        if (Capacitor.getPlatform() === PLATFORM.ios) {
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

  async hideElementsByClassName(hide = true, className = 'browser-hidden') {
    if (this.isVoiceOverEnabled$) {
      const displayType = hide ? 'none' : 'block';
      const elements = document.getElementsByClassName(className);
      if (elements) {
        for (let i = 0; i < elements.length; i++) {
          const element = elements[i];
          if (element instanceof HTMLElement) {
            element.style.display = displayType;
          }
        }
      }
    }
  }
}
