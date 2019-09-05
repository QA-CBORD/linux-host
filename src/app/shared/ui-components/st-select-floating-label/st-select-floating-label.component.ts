import { Component, OnInit, Input, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormControl } from '@angular/forms';

export const CUSTOM_SELECT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => StSelectFloatingLabelComponent),
  multi: true,
};

@Component({
  selector: 'st-select-floating-label',
  templateUrl: './st-select-floating-label.component.html',
  styleUrls: ['./st-select-floating-label.component.scss'],
  providers: [CUSTOM_SELECT_CONTROL_VALUE_ACCESSOR],
})
export class StSelectFloatingLabelComponent implements OnInit, ControlValueAccessor {
  @Input() control: FormControl = new FormControl();
  @Input() interface: string;
  @Input() interfaceOptions;
  @Input() label: string;
  @Input() isError: boolean;
  @Input() idd: string;
  private innerValue: any = '';

  constructor() {}

  ngOnInit() {
    this.value = this.control.value;
  }

  // event fired when input value is changed . later propagated up to the form control using the custom value accessor interface
  onChange(e: CustomEvent, value: any) {
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
  @Input()
  set value(v: any) {
    if (v !== this.innerValue) {
      this.writeValue(v);
    }
  }

  //propagate changes into the custom form control
  propagateChange = (_: any) => {};
  onTouched = () => {};

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
  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  onBlur() {
    this.onTouched()
  }
}
