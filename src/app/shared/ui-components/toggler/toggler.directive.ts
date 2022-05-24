import { Directive, HostBinding } from '@angular/core';

@Directive({
  selector: '[stToggler]',
})
export class TogglerDirective {
  @HostBinding('class.toggled')
  toggled = false;

  toggle(): void {
    this.toggled = !this.toggled;
  }
}
