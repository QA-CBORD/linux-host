import { Component, OnInit, Input, forwardRef } from '@angular/core';
import { FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';

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
export class StTextareaFloatingLabelComponent implements OnInit {
  @Input() control: FormControl = new FormControl();
  @Input() label: string;
  @Input() idd: string;
  @Input() rows: string;
  private innerValue: any = '';

  constructor() {}

  ngOnInit() {}

  onChange(e: Event, value: any) {
    //set changed value
    this.innerValue = value;
    // propagate value into form control using control value accessor interface
    this.propagateChange(this.innerValue);
  }

  //get accessor
  get value(): any {
    return this.innerValue;
  }

  //set accessor including call the onchange callback
  set value(v: any) {
    if (v !== this.innerValue) {
      this.innerValue = v;
    }
  }

  //propagate changes into the custom form control
  propagateChange = (_: any) => {};

  //From ControlValueAccessor interface
  writeValue(value: any) {
    // this.inputRef.nativeElement.value = value;
    this.innerValue = value;
  }

  //From ControlValueAccessor interface
  registerOnChange(fn: any) {
    this.propagateChange = fn;
  }

  //From ControlValueAccessor interface
  registerOnTouched(fn: any) {}
}
