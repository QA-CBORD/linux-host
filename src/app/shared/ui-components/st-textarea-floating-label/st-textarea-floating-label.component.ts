import { Component, Input, forwardRef, OnInit, AfterViewInit } from '@angular/core';
import { AbstractControl, DefaultValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';

export const CUSTOM_TEXTAREA_CONTROL_VALUE_ACCESSOR: any = {
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
  @Input() rows: string = '3';
  onTouched: () => void;
  onChange: (_: any) => void;
  innerValue: any = '';

  ngAfterViewInit(): void {
    if (this.control && this.control.value) {
      this.writeValue(this.control.value);
    }
  }

  //get accessor
  get value(): any {
    // return this.control.value;
    return this.innerValue;
  }

  //set accessor including call the onchange callback
  set value(v: any) {
    if (v !== this.innerValue) {
      this.writeValue(v);
    }
  }

  //From ControlValueAccessor interface
  writeValue(value: any) {
    console.log('Write Value: ', value);

    // this.inputRef.nativeElement.value = value;
    this.innerValue = value;
  }

  //From ControlValueAccessor interface
  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  //From ControlValueAccessor interface
  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  onChangeHandler({ detail: { value } }: CustomEvent) {
    this.writeValue(value);
    this.onChange(value);
  }

  onBlur() {
    this.onTouched();
  }
}
