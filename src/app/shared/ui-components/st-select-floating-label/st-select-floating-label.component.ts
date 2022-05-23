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
import { IonSelect } from '@ionic/angular';
import { AccessibilityService } from '@shared/accessibility/services/accessibility.service';

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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StSelectFloatingLabelComponent implements OnInit, ControlValueAccessor {
  @Input() control: AbstractControl = new FormControl();
  @Input() interface: string;
  @Input() interfaceOptions;
  @Input() label: string;
  @Input() isError: boolean;
  @Input() isDisabled = false;
  @Input() idd: string;
  @Input() selectedText: string;
  @Output() focus: EventEmitter<any> = new EventEmitter<any>();
  @Output() change: EventEmitter<any> = new EventEmitter<any>();
  innerValue: any = '';

  @ViewChild('selector', { static: true }) selectRef: IonSelect;
  private onChange: (v: any) => void;
  private onTouched: () => void;

  constructor(private readonly cdRef: ChangeDetectorRef, private readonly a11yService: AccessibilityService) {}

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
    this.cdRef.detectChanges();
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
    this.cdRef.detectChanges();
  }

  onBlur() {
    this.onTouched();
  }

  onChangeHandler({ detail: { value } }: CustomEvent<any>) {
    this.writeValue(value);
    this.onChange(value);
    this.change.emit(value);
  }

  onFocus() {
    this.focus.emit();
  }

  onDoubleTap() {
    this.a11yService.isVoiceOverClick$.then(value => {
      if (value) {
        this.selectRef.open();
      }
    });
  }
}
