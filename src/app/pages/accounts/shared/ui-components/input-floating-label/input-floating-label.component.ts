import { Component, OnInit, Input, forwardRef, ViewChild, ElementRef } from '@angular/core';
import { FormControl, NG_VALUE_ACCESSOR, ControlValueAccessor, NG_VALIDATORS, Validator } from '@angular/forms';


export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => InputFloatingLabelComponent),
  multi: true
};

@Component({
  selector: 'st-input-floating-label',
  templateUrl: './input-floating-label.component.html',
  styleUrls: ['./input-floating-label.component.scss'],
  providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
})
export class InputFloatingLabelComponent implements OnInit, ControlValueAccessor {

  @Input() control: FormControl = new FormControl();;
  @Input() label: string;
  @Input() type: string;
  // @Input() maxlength: string = "";
  @Input() idd: string;
  @ViewChild('input') inputRef: ElementRef;
  private innerValue: any = '';
  @Input() isError: boolean;

  constructor() { }

  ngOnInit() { }

  ngAfterViewInit() {
    // RESET the custom input form control UI when the form control is RESET
    this.control.valueChanges.subscribe(
      () => {
        // check condition if the form control is RESET
        if (this.control.value == "" || this.control.value == null || this.control.value == undefined) {
          this.innerValue = "";
          this.inputRef.nativeElement.value = "";
        }
      }
    );
  }

  // event fired when input value is changed . later propagated up to the form control using the custom value accessor interface
  onChange(e: Event, value: any) {
    //set changed value
    this.innerValue = value;
    // propagate value into form control using control value accessor interface
    this.propagateChange(this.innerValue);

    //reset errors 
    // this.errors = [];
    //setting, resetting error messages into an array (to loop) and adding the validation messages to show below the field area
    // for (var key in this.control.errors) {
    //   if (this.control.errors.hasOwnProperty(key)) {
    //     if (key === "required") {
    //       this.errors.push("This field is required");
    //     } else {
    //       this.errors.push(this.c.errors[key]);
    //     }
    //   }
    // }
  }

  //get accessor
  get value(): any {
    return this.innerValue;
  };

  //set accessor including call the onchange callback
  set value(v: any) {
    if (v !== this.innerValue) {
      this.innerValue = v;
    }
  }

  //propagate changes into the custom form control
  propagateChange = (_: any) => { }

  //From ControlValueAccessor interface
  writeValue(value: any) {
    this.innerValue = value;
  }

  //From ControlValueAccessor interface
  registerOnChange(fn: any) {
    this.propagateChange = fn;
  }

  //From ControlValueAccessor interface
  registerOnTouched(fn: any) {

  }
}
