import { Directive, Input, HostBinding } from '@angular/core';
import { IonSelect } from '@ionic/angular';

@Directive({
  selector: '[stAccessibleSelect]',
})
export class AccessibleSelectDirective {
  @Input('stAccessibleSelect')
  selectedText: string;

  @Input('attr.aria-placeholder')
  ariaPlaceholder: string;

  @HostBinding('attr.aria-label') get ariaLabel() {
    return this.selectedText || '';
  }

  @HostBinding('attr.placeholder') get placeholder() {
    // To prevent Screen readers from read both value and placeholder text.
    return this.selectedText ? '' : this.ariaPlaceholder;
  }
}
