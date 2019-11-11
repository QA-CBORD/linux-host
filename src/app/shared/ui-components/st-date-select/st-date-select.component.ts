import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'st-date-select',
  templateUrl: './st-date-select.component.html',
  styleUrls: ['./st-date-select.component.scss'],
})
export class StDateSelectComponent implements OnInit, OnDestroy {
  private _subscription: Subscription;

  @Input() parentGroup: FormGroup;

  @Input() label: string;

  @Input() name: string;

  @Input()
  get idd(): string {
    return this._id;
  }

  set idd(value: string) {
    this._id = value || this.name;
  }
  private _id: string;

  @Input() displayFormat: string;

  isFilled: boolean;

  ngOnInit(): void {
    const control: AbstractControl = this.parentGroup.get(this.name);

    this._subscription = control.valueChanges.subscribe((value: any) => this._checkIsFilled(value));

    this._checkIsFilled(control.value);
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  private _checkIsFilled(value: any): void {
    this.isFilled = value != null && value !== '';
  }
}
