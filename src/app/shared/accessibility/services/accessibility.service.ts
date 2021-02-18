import { Injectable } from '@angular/core';
import { Capacitor, Plugins } from '@capacitor/core';
import { ToastService } from '@core/service/toast/toast.service';

const { Accessibility } = Plugins;
const READ_ALOUD_DELAY = 2000;
const TAP_TIME_LAPSE = 300;

@Injectable()
export class AccessibilityService {
  constructor(private readonly toastService: ToastService) {}
  private doubleTapped: boolean = false;

  readAloud(text: string) {
    return Accessibility.isScreenReaderEnabled().then(isRunning => {
      if (isRunning.value) {
        setTimeout(() => {
          Accessibility.speak({ value: text });
        }, READ_ALOUD_DELAY);
      }
    });
  }

  voiceoverTapOnDirective(elements: HTMLCollectionOf<Element>) {
        if (Capacitor.platform === 'ios') {
          const eventName = 'touchstart';
          const touchEvent = new Event(eventName);
          for (let i = 0; i < elements.length; i++) {
            elements[i].addEventListener(eventName, this.tapHandler);
            elements[i].dispatchEvent(touchEvent);
          }
      }
  }

  private async tapHandler(event) {
    if (!this.doubleTapped) {
      this.doubleTapped = true;
      setTimeout(function() {
        this.doubleTapped = false;
      }, TAP_TIME_LAPSE);
      return;
    }
    await this.toastService.showToast.bind(this.toastService);
  }
}
