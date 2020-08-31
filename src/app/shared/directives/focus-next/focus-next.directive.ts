import { Directive, HostListener, Input } from '@angular/core';
import { FocusableElement } from '@core/interfaces/focusable-element.interface';

@Directive({
  selector: '[stFocusNext]',
})
export class FocusNextDirective {
  @Input('stFocusNext')
  nextField: FocusableElement;

  @HostListener('keydown.enter')
  onInputChange() {
    if (this.nextField) {
      setTimeout(() => {
        this.nextField.focus();
      }, 100);
    }
  }
}
