import { Component, OnInit, Input, forwardRef, Output, EventEmitter } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormControl, AbstractControl } from '@angular/forms';

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
  @Input() control: AbstractControl = new FormControl();
  @Input() interface: string;
  @Input() interfaceOptions;
  @Input() label: string;
  @Input() isError: boolean;
  @Input() idd: string;
  @Output() focus: EventEmitter<any> = new EventEmitter<any>();
  private innerValue: any = '';
  private onChange :(v: any) => void;
  private onTouched: () => void;

  constructor() {}

  ngOnInit() {
    this.value = this.control.value;
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

  //From ControlValueAccessor interface
  writeValue(value: any) {
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

  onBlur() {
    this.onTouched();
  }

  onChangeHandler({detail: {value}}: CustomEvent<any>) {
    this.writeValue(value);
    this.onChange(value);
  }

  onFocus() {
    this.focus.emit();
  }
}
