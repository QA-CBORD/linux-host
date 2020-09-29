import { Directive, Input, HostBinding } from '@angular/core';
import { IonSelect } from '@ionic/angular';

@Directive({
  selector: 'ion-select',
})
export class AccessibleSelectDirective {

  @Input('attr.aria-placeholder')
  ariaPlaceholder: string;

  @HostBinding('attr.aria-label') get ariaLabel() {
    return this.host.selectedText || '';
  }

  @HostBinding('attr.placeholder') get placeholder() {
    // To prevent Screen readers from read both value and placeholder text.
    return this.host.selectedText ? '' : this.ariaPlaceholder || this.host.placeholder;
  }

  constructor(private readonly host: IonSelect) {}
}
