import { Directive, Input, HostBinding, OnDestroy } from '@angular/core';
import { IonSelect } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { AccessibilityService } from '../services/accessibility.service';

@Directive({
  selector: 'ion-select',
})
export class AccessibleSelectDirective implements OnDestroy {
  ngOnDestroy(): void {
    this.subs && this.subs.unsubscribe();
  }

  @Input('attr.aria-placeholder') get ariaPlaceholder() {
    return this.host.placeholder;
  }

  @HostBinding('attr.aria-label') get ariaLabel() {
    return this.host.selectedText || '';
  }

  subs: Subscription;

  constructor(private readonly host: IonSelect, readonly a11yService: AccessibilityService) {
    this.subs = this.host.ionChange.subscribe(() => a11yService.readAloud(this.host.selectedText));
  }
}
