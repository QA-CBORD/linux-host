import { Directive, HostListener } from '@angular/core';

import { StepperComponent } from './stepper.component';

@Directive({
  selector: 'button[stepperNext], ion-button[stepperNext]',
})
export class StepperNextDirective {
  constructor(public _stepper: StepperComponent) {}

  @HostListener('click')
  private _handleClick() {
    this._stepper.next();
  }
}

@Directive({
  selector: 'button[stepperBack], ion-button[stepperBack]',
})
export class StepperBackDirective {
  constructor(public _stepper: StepperComponent) {}

  @HostListener('click')
  private _handleClick() {
    this._stepper.back();
  }
}
