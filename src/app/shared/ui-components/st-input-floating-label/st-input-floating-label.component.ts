import { Component, OnInit, Input, forwardRef, ViewChild, ElementRef } from '@angular/core';
import { FormControl, NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => StInputFloatingLabelComponent),
  multi: true,
};

@Component({
  selector: 'st-input-floating-label',
  templateUrl: './st-input-floating-label.component.html',
  styleUrls: ['./st-input-floating-label.component.scss'],
  providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR],
})
export class StInputFloatingLabelComponent implements OnInit, ControlValueAccessor {
  @Input() control: FormControl = new FormControl();
  @Input() label: string;
  @Input() type: string;
  @Input() maxlength: string = '';
  @Input() idd: string;
  @Input() isError: boolean;
  @ViewChild('input') inputRef: ElementRef;
  private innerValue: any = '';

  constructor() {}

  ngOnInit() {
    if (this.control.value !== '') {
      this.control.markAsDirty();
      this.value = this.control.value;
    }
  }

  ngAfterViewInit() {
    // RESET the custom input form control UI when the form control is RESET
    this.control.valueChanges.subscribe(() => {
      // check condition if the form control is RESET
      if (this.control.value == '' || this.control.value == null || this.control.value == undefined) {
        this.innerValue = '';
        this.inputRef.nativeElement.value = '';
      }
    });
  }

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
  propagateChange = (_: any) => {};

  //From ControlValueAccessor interface
  writeValue(value: any) {
    this.inputRef.nativeElement.value = value;
    this.innerValue = value;
  }

  //From ControlValueAccessor interface
  registerOnChange(fn: any) {
    this.propagateChange = fn;
  }

  //From ControlValueAccessor interface
  registerOnTouched(fn: any) {}

  onBlur() {
    !this.control.touched && this.control.markAsTouched();
  }
}
