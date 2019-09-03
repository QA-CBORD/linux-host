import { Component, OnInit, Input, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormControl } from '@angular/forms';

export const CUSTOM_SELECT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => SelectFloatingLabelComponent),
  multi: true,
};

@Component({
  selector: 'st-select-floating-label',
  templateUrl: './select-floating-label.component.html',
  styleUrls: ['./select-floating-label.component.scss'],
  providers: [CUSTOM_SELECT_CONTROL_VALUE_ACCESSOR],
})
export class SelectFloatingLabelComponent implements OnInit, ControlValueAccessor {
  @Input() control: FormControl = new FormControl();
  @Input() interface: string;
  @Input() interfaceOptions;
  @Input() label: string;
  @Input() idd: string;
  private innerValue: any = '';

  constructor() { }

  ngOnInit() { }

  // event fired when input value is changed . later propagated up to the form control using the custom value accessor interface
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
  propagateChange = (_: any) => { };

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
  registerOnTouched(fn: any) { }
}
