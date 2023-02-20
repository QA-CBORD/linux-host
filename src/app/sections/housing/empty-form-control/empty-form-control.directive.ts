import { Directive, Input, HostBinding, OnInit, OnDestroy } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[stEmptyFormControl]',
})
export class EmptyFormControlDirective implements OnInit, OnDestroy {
  private _subscription: Subscription = new Subscription();

  @Input()
  stEmptyFormControl: AbstractControl;

  @HostBinding('class.form-control--empty')
  isEmpty: boolean;

  @HostBinding('class.form-control--filled')
  isFilled: boolean;

  ngOnInit(): void {
    const valueChangesSubscription: Subscription = this.stEmptyFormControl.valueChanges.subscribe((value) =>
      this._checkIsEmpty(value)
    );

    this._subscription.add(valueChangesSubscription);

    this._checkIsEmpty(this.stEmptyFormControl.value);
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  private _checkIsEmpty(value: object | string): void {
    if (value == null || value === '') {
      this.isEmpty = true;
      this.isFilled = false;
    } else {
      this.isFilled = true;
      this.isEmpty = false;
    }
  }
}
