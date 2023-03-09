import {
  Component,
  Input,
  forwardRef,
  ViewChild,
  ElementRef,
  HostBinding,
  AfterViewInit,
  OnChanges,
} from '@angular/core';
import { FormControl, NG_VALUE_ACCESSOR, ControlValueAccessor, AbstractControl } from '@angular/forms';
import { FocusableElement } from '@core/interfaces/focusable-element.interface';
import { hasRequiredField } from '@core/utils/general-helpers';

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR = {
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
export class StInputFloatingLabelComponent implements AfterViewInit, ControlValueAccessor, FocusableElement, OnChanges {
  @Input() control: AbstractControl = new FormControl();
  @Input() label: string;
  @Input() type: string;
  @Input() maxlength = '';
  @Input() idd: string;
  @Input() isError: boolean;
  @Input() inputmode: string;
  @Input() enterkeyhint: string;
  @Input() tabindex: string;
  showOrHide = 'Show';
  @Input('stFocusNext')
  set focusNextDr(value: FocusableElement) {
    if (!this.enterkeyhint) this.enterkeyhint = 'next';
  }

  @Input() icon: string;
  private errorIcon = '/assets/icon/input-error.svg';
  imageSrc: string = this.errorIcon;
  passwordFieldDirty: boolean;
  @HostBinding('class.disabled')
  @Input()
  isDisabled = false;

  @ViewChild('input', { static: true }) inputRef: ElementRef<HTMLInputElement>;
  innerValue: string | number = '';
  private onChange: (v) => void;
  private onTouched: () => void;

  ngAfterViewInit(): void {
    if (this.type == 'password') {
      this.control.valueChanges.subscribe(value => {
        this.passwordFieldDirty = value && (value as string).length > 0;
      });
    }
  }

  ngOnChanges() {
    if (this.control.value !== '') {
      this.control.markAsDirty();
      this.value = this.control.value;
    }
  }

  toggleText(): void {
    if (this.showOrHide == 'Show') {
      this.inputRef.nativeElement.type = 'text';
      this.showOrHide = 'Hide';
    } else {
      this.inputRef.nativeElement.type = 'password';
      this.showOrHide = 'Show';
    }
  }

  //get accessor
  get value() {
    return this.innerValue;
  }

  //set accessor including call the onchange callback
  set value(v) {
    if (v !== this.innerValue) {
      this.innerValue = v;
      this.writeValue(this.innerValue);
    }
  }

  //From ControlValueAccessor interface
  writeValue(value) {
    if (this.inputRef.nativeElement.value !== value) {
      this.inputRef.nativeElement.value = value;
    }
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

  get isRequired(): boolean {
    return hasRequiredField(this.control);
  }
}
