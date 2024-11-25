import { Component, Input, forwardRef, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { AbstractControl, DefaultValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { hasRequiredField } from '@core/utils/general-helpers';

export const CUSTOM_TEXTAREA_CONTROL_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => StTextareaFloatingLabelComponent),
  multi: true,
};

@Component({
  selector: 'st-textarea-floating-label',
  templateUrl: './st-textarea-floating-label.component.html',
  styleUrls: ['./st-textarea-floating-label.component.scss'],
  providers: [CUSTOM_TEXTAREA_CONTROL_VALUE_ACCESSOR],
})
export class StTextareaFloatingLabelComponent extends DefaultValueAccessor implements AfterViewInit {
  @Input() control: AbstractControl = new FormControl();
  @Input() label: string;
  @Input() idd: string;
  @Input() isError: boolean;
  @Input() rows = '3';
  @Input() isDisabled: boolean;
  @Input() maxLength;
  @Input() placeholder: string;
  @Input() isAttachment: boolean;
  onTouched: () => void;
  onChange: (_) => void;
  innerValue = '';
  @Output() onFocus: EventEmitter<Event> = new EventEmitter<Event>();
  @Output() onBlur: EventEmitter<Event> = new EventEmitter<Event>();

  ngAfterViewInit(): void {
    if (this.control && this.control.value) {
      this.control.markAsTouched();
    }
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
    // this.inputRef.nativeElement.value = value;
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

  //From ControlValueAccessor interface
  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  onChangeHandler({ detail: { value } }: CustomEvent) {
    this.writeValue(value);
    this.onChange(value);
  }

  ionBlur(event: Event) {
    this.onTouched();
    this.onBlur.emit(event);
  }

  ionFocus(event: Event) {
    this.onFocus.emit(event);
  }

  get isRequired(): boolean {
    return hasRequiredField(this.control);
  }
}
