import { Directive, Input, HostBinding, OnDestroy } from '@angular/core';
import { IonSelect } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Plugins } from '@capacitor/core';

const { Accessibility } = Plugins;
const READ_ALOUD_DELAY = 2000;

@Directive({
  selector: 'ion-select',
})
export class AccessibleSelectDirective implements OnDestroy {
  ngOnDestroy(): void {
    this.subs && this.subs.unsubscribe();
  }

  @Input('attr.a11y-placeholder') a11yPlaceholder: string

  @HostBinding('attr.aria-placeholder') get ariaPlaceholder() {
    return this.host.selectedText ? '' : this.host.placeholder || this.a11yPlaceholder;
  }

  @HostBinding('attr.aria-label') get ariaLabel() {
    return this.host.selectedText || '';
  }

  subs: Subscription;

  constructor(private readonly host: IonSelect) {
    this.subs = this.host.ionChange.subscribe(() =>
      Accessibility.isScreenReaderEnabled().then(isRunning => {
        if (isRunning.value) {
          setTimeout(() => {
            Accessibility.speak({ value: this.host.selectedText || this.host.value });
          }, READ_ALOUD_DELAY);
        }
      })
    );
  }
}
