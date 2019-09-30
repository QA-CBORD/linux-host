import { Directive, HostListener } from '@angular/core';

import { StepperComponent } from './stepper.component';

@Directive({
  selector: 'button[stepperNext], ion-button[stepperNext]',
})
export class StepperNext {
  constructor(public _stepper: StepperComponent) {}

  @HostListener('click')
  _handleClick() {
    console.log('next');
    this._stepper.next();
  }
}

@Directive({
  selector: 'button[stepperBack], ion-button[stepperBack]',
})
export class StepperBack {
  constructor(public _stepper: StepperComponent) {}

  @HostListener('click')
  _handleClick() {
    console.log('back');
    this._stepper.back();
  }
}
