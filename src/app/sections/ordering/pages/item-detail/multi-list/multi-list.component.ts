import { Component, OnInit, Input, forwardRef, ChangeDetectionStrategy } from '@angular/core';
import { MenuGroupItemInfo } from '@sections/ordering/shared/models';
import { AbstractControl, FormControl, NG_VALUE_ACCESSOR, DefaultValueAccessor } from '@angular/forms';

export const CUSTOM_MULTILIST_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => MultiListComponent),
  multi: true,
};

@Component({
  selector: 'st-multi-list',
  templateUrl: './multi-list.component.html',
  styleUrls: ['./multi-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [CUSTOM_MULTILIST_CONTROL_VALUE_ACCESSOR],
})
export class MultiListComponent extends DefaultValueAccessor implements OnInit {

  @Input() name: string;
  @Input() options: MenuGroupItemInfo[];
  @Input() control: AbstractControl = new FormControl();
  onTouched: () => void;
  onChange: (_: any) => void;
  private innerValue: any = '';

  ngOnInit() { }

  onItemsChecked(event) {
    console.log(event);
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
