import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  forwardRef,
  HostBinding,
  Input,
  StaticProvider,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { hasValue } from '@sections/housing/utils';

export const DATE_SELECT_VALUE_ACCESSOR: StaticProvider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => StDateSelectComponent),
  multi: true,
};

@Component({
  selector: 'st-date-select',
  templateUrl: './st-date-select.component.html',
  styleUrls: ['./st-date-select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DATE_SELECT_VALUE_ACCESSOR],
})
export class StDateSelectComponent implements ControlValueAccessor {
  @Input() label: string;

  @Input() name: string;

  @Input() idd: string;

  // @Input() displayFormat = 'MMM DD, YYYY';

  @HostBinding('class.date-select__disabled')
  @Input()
  isDisabled = false;

  onChange: (value: any) => void;

  onTouched: () => void;

  value: string;

  isFilled: boolean;

  constructor(private _changeDetector: ChangeDetectorRef) {
    this.idd = this.name;
  }

  handleChange(event: CustomEvent): void {
    const value: string = event.detail.value;

    this.onChange(value);
    this._checkIsFilled(value);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
    this._changeDetector.markForCheck();
  }

  writeValue(value: any): void {
    if (value !== this.value) {
      this.value = value;
      this._checkIsFilled(value);
    }
  }

  private _checkIsFilled(value: any): void {
    this.isFilled = hasValue(value);
    this._changeDetector.markForCheck();
  }
}
