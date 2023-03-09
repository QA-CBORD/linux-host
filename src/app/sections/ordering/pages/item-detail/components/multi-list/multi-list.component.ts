import { Component, OnInit, Input, forwardRef, ChangeDetectionStrategy } from '@angular/core';
import { MenuGroupItemInfo } from '@sections/ordering/shared/models';
import { AbstractControl, FormControl, NG_VALUE_ACCESSOR, DefaultValueAccessor } from '@angular/forms';

export const CUSTOM_MULTILIST_CONTROL_VALUE_ACCESSOR = {
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
  @Input() mealBased: boolean;
  @Input() minimum: number;
  @Input() maximum: number;
  @Input() options: MenuGroupItemInfo[];
  @Input() control: AbstractControl = new FormControl();
  @Input() isError: boolean;
  @Input() isExistingItemInCart: boolean;
  onTouched: () => void;
  onChange: (_) => void;
  innerValue = [];
  modifiedOptions: MenuGroupItemInfoChecked[];


  ngOnInit() {
    this.writeValue(this.control.value);
    this.onChange(this.control.value);
    if (this.control.value.length && this.isExistingItemInCart) {
      this.modifiedOptions = <MenuGroupItemInfoChecked[]> this.options.map(elem => {
        const isMenuItemInclude = this.innerValue.includes(elem.menuItem);

        return { ...elem, checked: isMenuItemInclude };
      });
    } else {
      this.modifiedOptions = <MenuGroupItemInfoChecked[]> this.options.map(elem => ({ ...elem, checked: false }));
    }
  }

  onItemsChecked({ detail: { value } }) {
    const innerArray = this.innerValue;
    const formValue = innerArray.find(({ id }) => id === value.id);
    if (!formValue) {
      innerArray.push(value);
    } else {
      for (let i = 0; i < innerArray.length; i++) {
        if (this.innerValue[i].id === value.id) {
          innerArray.splice(i, 1);
        }
      }
    }

    this.writeValue(innerArray);
    this.onChange(innerArray);
  }

  //get accessor
  get value() {
    return this.innerValue;
  }

  //set accessor including call the onchange callback
  set value(v) {
    if (v !== this.innerValue) {
      this.writeValue(v);
    }
  }

  //From ControlValueAccessor interface
  writeValue(value) {
    if (value) {
      this.innerValue = value;
    }
  }

  //From ControlValueAccessor interface
  registerOnChange(fn) {
    this.onChange = fn;
  }

  //From ControlValueAccessor interface
  registerOnTouched(fn) {
    this.onTouched = fn;
  }

  onBlur() {
    this.onTouched();
  }
}

interface MenuGroupItemInfoChecked extends MenuGroupItemInfo {
  checked: boolean;
}
