import { Directive, HostListener, Output, EventEmitter } from '@angular/core';

import { StepperComponent } from './stepper.component';

@Directive({
  selector: 'button[stepperNext], ion-button[stepperNext]',
})
export class StepperNextDirective {
  @HostListener('click')
  private _handleClick() {
    this._stepper.next();
    this.next.emit();
  }

  @Output() next: EventEmitter<void> = new EventEmitter();

  constructor(public _stepper: StepperComponent) {}
}

@Directive({
  selector: 'button[stepperBack], ion-button[stepperBack]',
})
export class StepperBackDirective {
  @HostListener('click')
  private _handleClick() {
    this._stepper.back();
    this.back.emit();
  }

  constructor(public _stepper: StepperComponent) {}

  @Output() back: EventEmitter<void> = new EventEmitter();
}
