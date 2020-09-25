import { Directive, Input, HostBinding } from '@angular/core';
import { IonSelect } from '@ionic/angular';

@Directive({
  selector: '[stAccessibleSelect]',
})
export class AccessibleSelectDirective {
  @Input('stAccessibleSelect')
  selectedText: string;

  @HostBinding('attr.aria-label') get ariaLabel() {
    return this.selectedText || this.host.placeholder;
  }

  constructor(private host: IonSelect) {}
}
