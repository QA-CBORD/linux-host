import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Validators, FormGroup, FormBuilder, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import * as states from '../../../../../../assets/states.json';

@Component({
  selector: 'st-add-edit-addresses',
  templateUrl: './add-edit-addresses.component.html',
  styleUrls: ['./add-edit-addresses.component.scss'],
})
export class AddEditAddressesComponent implements OnInit {
  addEditAddressesForm: FormGroup;
  arrOfStates = states;
  customActionSheetOptions: { [key: string]: string } = {
    cssClass: 'custom-deposit-actionSheet',
  };

  @Output() onFormChanged: EventEmitter<any> = new EventEmitter<any>();
  constructor(private readonly fb: FormBuilder) {
    console.log(this.arrOfStates['default']);
  }

  get address1(): AbstractControl {
    return this.addEditAddressesForm.get(this.controlsNames.address1);
  }

  get address2(): AbstractControl {
    return this.addEditAddressesForm.get(this.controlsNames.address2);
  }

  get city(): AbstractControl {
    return this.addEditAddressesForm.get(this.controlsNames.city);
  }

  get state(): AbstractControl {
    return this.addEditAddressesForm.get(this.controlsNames.state);
  }

  get nickname(): AbstractControl {
    return this.addEditAddressesForm.get(this.controlsNames.nickname);
  }

  get default(): AbstractControl {
    return this.addEditAddressesForm.get(this.controlsNames.default);
  }

  get controlsNames() {
    return REQUEST_FUNDS_CONTROL_NAMES;
  }

  ngOnInit() {
    this.initForm();
  }

  private initForm() {
    const address1Errors = [
      errorDecorator(Validators.required, CONTROL_ERROR[REQUEST_FUNDS_CONTROL_NAMES.address1].required),
    ];

    const cityErrors = [errorDecorator(Validators.required, CONTROL_ERROR[REQUEST_FUNDS_CONTROL_NAMES.city].required)];

    const stateErrors = [
      errorDecorator(Validators.required, CONTROL_ERROR[REQUEST_FUNDS_CONTROL_NAMES.state].required),
    ];

    this.addEditAddressesForm = this.fb.group({
      [this.controlsNames.campus]: [''],
      [this.controlsNames.address1]: ['', address1Errors],
      [this.controlsNames.address2]: [''],
      [this.controlsNames.city]: ['', cityErrors],
      [this.controlsNames.state]: ['', stateErrors],
      [this.controlsNames.nickname]: [''],
      [this.controlsNames.default]: [false],
    });

    this.onChanges();
  }

  private onChanges() {
    this.addEditAddressesForm.valueChanges.pipe(debounceTime(500)).subscribe(value => {
      this.onFormChanged.emit({ value, valid: this.addEditAddressesForm.valid });
    });
  }

  onFormSubmit() {}
}

export enum REQUEST_FUNDS_CONTROL_NAMES {
  campus = 'campus',
  address1 = 'address1',
  address2 = 'address2',
  city = 'city',
  state = 'state',
  nickname = 'nickname',
  default = 'default',
}

export const CONTROL_ERROR = {
  [REQUEST_FUNDS_CONTROL_NAMES.address1]: {
    required: 'You must enter a address.',
  },
  [REQUEST_FUNDS_CONTROL_NAMES.city]: {
    required: 'You must enter an city.',
  },
  [REQUEST_FUNDS_CONTROL_NAMES.state]: {
    required: 'You must choose an state.',
  },
};

const errorDecorator = (fn: ValidatorFn, errorMsg: string): ((control: AbstractControl) => ValidationErrors | null) => {
  return control => {
    return fn(control) === null ? null : { errorMsg };
  };
};
