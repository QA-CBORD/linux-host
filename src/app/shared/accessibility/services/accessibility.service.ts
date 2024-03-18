import { Injectable } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { of } from 'rxjs/internal/observable/of';
import { Platform } from '@ionic/angular';
import { ScreenReader } from '@capacitor/screen-reader';
import { TranslateService } from '@ngx-translate/core';
const READ_ALOUD_DELAY = 2000;
const TAP_TIME_LAPSE = 300;
const A11Y_FOCUS = 1500;

export enum PLATFORM {
  ios = 'ios',
  android = 'android',
  web = 'web',
}
@Injectable()
export class AccessibilityService {
  constructor(private readonly platform: Platform, private readonly translateService: TranslateService) {}
  private toggle = false;

  readAloud(text: string, delay: number = READ_ALOUD_DELAY) {
    if (!this.platform.is('cordova')) return;

    return ScreenReader.isEnabled().then(isRunning => {
      if (isRunning.value) {
        setTimeout(() => {
          ScreenReader.speak({ value: text });
        }, delay);
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

  focusElementById(elementId: string) {
    setTimeout(() => {
      document.getElementById(elementId)?.focus();
    }, A11Y_FOCUS);
  }

  excuteSearchSpeech(list: any[]) {
    const { length } = list;
    const message =
      length === 1
        ? this.translateService.instant('patron-ui.ordering.one_search_available')
        : `${length} ${this.translateService.instant('patron-ui.ordering.searches_available')} `;
    const delay = 1000;
    this.readAloud(message, delay);
  }
}
