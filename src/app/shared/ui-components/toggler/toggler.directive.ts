import { Directive } from '@angular/core';

@Directive({
  selector: '[stToggler]',
})
export class TogglerDirective {
  toggled: boolean = false;

  toggle(): void {
    this.toggled = !this.toggled;
  }
}
