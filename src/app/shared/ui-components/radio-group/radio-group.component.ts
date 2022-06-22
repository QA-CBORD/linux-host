import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  forwardRef,
  Input,
  StaticProvider,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { RadioGroupOption } from './radio-group.model';

export const RADIO_GROUP_VALUE_ACCESSOR: StaticProvider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => RadioGroupComponent),
  multi: true,
};

@Component({
  selector: 'st-radio-group',
  templateUrl: './radio-group.component.html',
  styleUrls: ['./radio-group.component.scss'],
  providers: [RADIO_GROUP_VALUE_ACCESSOR],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RadioGroupComponent implements ControlValueAccessor {
  @Input() value: string;

  @Input() options: RadioGroupOption[];

  isDisabled = false;

  onChange: (value: any) => void;

  onTouched: () => void;

  constructor(private _changeDetector: ChangeDetectorRef) {}

  handleChange(event: CustomEvent): void {
    this.onChange(event.detail.value);
  }

  trackByLabel(_: number, option: RadioGroupOption): string {
    return option.label;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  writeValue(value: any): void {
    if (value !== this.value) {
      this.value = value;
      this._changeDetector.markForCheck();
    }
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
    this._changeDetector.markForCheck();
  }
}
