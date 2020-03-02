import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

export interface ErrorMessages {
  [key: string]: string;
}

@Component({
  selector: 'st-control-errors',
  templateUrl: './control-errors.component.html',
})
export class ControlErrorsComponent {
  @Input() control: AbstractControl;

  @Input() errorMessages: ErrorMessages;

  get hasError(): boolean {
    return this.control && this.control.errors && this.control.touched;
  }

  get error(): string {
    return Object.keys(this.control.errors).map((key: string) => this.errorMessages[key])[0];
  }
}
