import {
  Component,
  OnInit,
  Input,
  forwardRef,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  ViewChild,
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormControl, AbstractControl } from '@angular/forms';
import { hasRequiredField } from '@core/utils/general-helpers';
import { IonSelect, SelectChangeEventDetail } from '@ionic/angular';
import { AccessibilityService } from '@shared/accessibility/services/accessibility.service';

export const CUSTOM_SELECT_CONTROL_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => StSelectFloatingLabelComponent),
  multi: true,
};

@Component({
  selector: 'st-select-floating-label',
  templateUrl: './st-select-floating-label.component.html',
  styleUrls: ['./st-select-floating-label.component.scss'],
  providers: [CUSTOM_SELECT_CONTROL_VALUE_ACCESSOR],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StSelectFloatingLabelComponent implements OnInit, ControlValueAccessor {
  @Input() control: AbstractControl = new FormControl();
  @Input() interface: string;
  @Input() interfaceOptions;
  @Input() label: string;
  @Input() placeholder: string;
  @Input() isError: boolean;
  @Input() isDisabled = false;
  @Input() idd: string;
  @Input() selectedText: string;
  @Input() fill = 'outline';
  @Input() fontWeight?: 'bold' | '';
  @Output() focus: EventEmitter<void> = new EventEmitter<void>();
  @Output() change: EventEmitter<void> = new EventEmitter<void>();
  innerValue = '';
  @Input() labelPlacement: 'end' | 'fixed' | 'floating' | 'stacked' | 'start' | undefined = 'floating';
  @ViewChild('selector', { static: true }) selectRef: IonSelect;
  private onChange: (v) => void;
  private onTouched: () => void;

  constructor(private readonly cdRef: ChangeDetectorRef, private readonly a11yService: AccessibilityService) {}

  ngOnInit() {
    this.value = this.control.value;
    if (this.placeholder) {
      this.labelPlacement = 'stacked';
    }
  }

  //get accessor
  get value() {
    return this.innerValue;
  }

  //set accessor including call the onchange callback
  @Input()
  set value(v) {
    if (v !== this.innerValue) {
      this.writeValue(v);
    }
  }

  //From ControlValueAccessor interface
  writeValue(value) {
    this.innerValue = value;
    this.cdRef.detectChanges();
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
    this.cdRef.detectChanges();
  }

  onBlur() {
    this.onTouched();
  }

  onChangeHandler({ detail: { value } }: CustomEvent<SelectChangeEventDetail>) {
    this.writeValue(value);
    this.onChange(value);
    this.change.emit(value);
  }

  onFocus() {
    this.focus.emit();
  }

  async onDoubleTap() {
    const value = await this.a11yService.isVoiceOverClick$;
    if (value) {
      this.selectRef.open();
    }
  }

  get isRequired(): boolean {
    return hasRequiredField(this.control);
  }
}
