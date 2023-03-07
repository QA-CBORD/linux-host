import { Component, OnInit, Input, forwardRef, ChangeDetectionStrategy } from '@angular/core';
import { MenuGroupItemInfo } from '@sections/ordering/shared/models';
import { AbstractControl, FormControl, NG_VALUE_ACCESSOR, DefaultValueAccessor } from '@angular/forms';

export const CUSTOM_SINGLELIST_CONTROL_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => SingleListComponent),
  multi: true,
};

@Component({
  selector: 'st-single-list',
  templateUrl: './single-list.component.html',
  styleUrls: ['./single-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [CUSTOM_SINGLELIST_CONTROL_VALUE_ACCESSOR],
})
export class SingleListComponent extends DefaultValueAccessor implements OnInit {
  @Input() name: string;
  @Input() mealBased: boolean;
  @Input() options: MenuGroupItemInfo[];
  @Input() control: AbstractControl = new FormControl();
  @Input() isError: boolean;
  onTouched: () => void;
  onChange: (_) => void;
  innerValue = '';

  ngOnInit() {
    this.writeValue(this.control.value);
    this.onChange(this.control.value);
  }

  itemChosen({ detail: { value } }: CustomEvent) {
    this.writeValue(value);
    this.onChange(value);
  }

  //get accessor
  get value() {
    return this.innerValue;
  }

  //set accessor including call the onchange callback
  set value(v) {
    if (v !== this.innerValue) {
      this.writeValue(v);
    }
  }

  //From ControlValueAccessor interface
  writeValue(value) {
    this.innerValue = value;
  }

  //From ControlValueAccessor interface
  registerOnChange(fn) {
    this.onChange = fn;
  }

  //From ControlValueAccessor interface
  registerOnTouched(fn) {
    this.onTouched = fn;
  }

  onBlur() {
    this.onTouched();
  }
}
