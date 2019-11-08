import { Component, OnInit, Input, forwardRef, ChangeDetectionStrategy } from '@angular/core';
import { MenuGroupItemInfo } from '@sections/ordering/shared/models';
import { AbstractControl, FormControl, NG_VALUE_ACCESSOR, DefaultValueAccessor } from '@angular/forms';

export const CUSTOM_SINGLELIST_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => SingleListComponent),
  multi: true,
};


@Component({
  selector: 'st-single-list',
  templateUrl: './single-list.component.html',
  styleUrls: ['./single-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [CUSTOM_SINGLELIST_CONTROL_VALUE_ACCESSOR],
})
export class SingleListComponent extends DefaultValueAccessor implements OnInit {

  @Input() name: string;
  @Input() options: MenuGroupItemInfo[];
  @Input() control: AbstractControl = new FormControl();
  @Input() isError: boolean;
  onTouched: () => void;
  onChange: (_: any) => void;
  private innerValue: any = '';

  ngOnInit() { }

  itemChosen({ target: { value } }) {
    this.writeValue(value);
    this.onChange(value);
  }

  //get accessor
  get value(): any {
    return this.innerValue;
  }

  //set accessor including call the onchange callback
  set value(v: any) {
    if (v !== this.innerValue) {
      this.writeValue(v);
    }
  }

  //From ControlValueAccessor interface
  writeValue(value: any) {
    // this.inputRef.nativeElement.value = value;
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
    this.onTouched()
  }
}
