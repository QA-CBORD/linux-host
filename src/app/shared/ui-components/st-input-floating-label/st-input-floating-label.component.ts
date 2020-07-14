import { Component, OnInit, Input, forwardRef, ViewChild, ElementRef, HostBinding } from '@angular/core';
import { FormControl, NG_VALUE_ACCESSOR, ControlValueAccessor, AbstractControl } from '@angular/forms';

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
  @Input() control: AbstractControl = new FormControl();
  @Input() label: string;
  @Input() type: string;
  @Input() maxlength: string = '';
  @Input() idd: string;
  @Input() isError: boolean;
  @Input() inputmode: string;
  @Input() enterkeyhint: string;

  @HostBinding('class.disabled')
  @Input()
  isDisabled: boolean = false;

  @ViewChild('input') inputRef: ElementRef;
  innerValue: string | number = '';
  private onChange: (v: any) => void;
  private onTouched: () => void;

  constructor() {}

  ngOnChanges() {
    if (this.control.value !== '') {
      this.control.markAsDirty();
      this.value = this.control.value;
    }
  }

  ngOnInit() {}

  //get accessor
  get value(): any {
    return this.innerValue;
  }

  //set accessor including call the onchange callback
  set value(v: any) {
    if (v !== this.innerValue) {
      this.innerValue = v;
      this.writeValue(this.innerValue);
    }
  }

  //From ControlValueAccessor interface
  writeValue(value: any) {
    if (this.inputRef.nativeElement.value !== value) {
      this.inputRef.nativeElement.value = value;
    }
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

  //From ControlValueAccessor interface
  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  onBlur() {
    this.onTouched();
  }

  onChangeHandler(value: string | number) {
    this.value = value;
    this.onChange(value);
  }

  public focus() {
    this.inputRef.nativeElement.focus();
  }
}
