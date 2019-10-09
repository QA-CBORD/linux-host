import { Directive, Input, HostBinding, OnInit, OnDestroy } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[stEmptyFormControl]',
})
export class EmptyFormControlDirective implements OnInit, OnDestroy {
  @Input()
  stEmptyFormControl: AbstractControl;

  @HostBinding('class.empty-form-control')
  isEmpty: boolean;

  private _subscription: Subscription;

  ngOnInit(): void {
    this._subscription = this.stEmptyFormControl.valueChanges.subscribe((value: any) => this._checkIsEmpty(value));

    this._checkIsEmpty(this.stEmptyFormControl.value);
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  private _checkIsEmpty(value: any): void {
    this.isEmpty = value == null || value === '';
  }
}
