import { Component, OnInit, Output, EventEmitter, Input, ChangeDetectionStrategy } from '@angular/core';
import { Validators, FormGroup, FormBuilder, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import * as states from '../../../../../../assets/states.json';
import { Subscription } from 'rxjs';

@Component({
  selector: 'st-add-edit-addresses',
  templateUrl: './add-edit-addresses.component.html',
  styleUrls: ['./add-edit-addresses.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddEditAddressesComponent implements OnInit {
  addEditAddressesForm: FormGroup;
  arrOfStates = states;
  customActionSheetOptions: { [key: string]: string } = {
    cssClass: 'custom-deposit-actionSheet',
  };

  private readonly sourceSubscription: Subscription = new Subscription();

  @Input() buildingsOnCampus;
  @Output() onFormChanged: EventEmitter<any> = new EventEmitter<any>();
  constructor(private readonly fb: FormBuilder) {
  }


  get campus(): AbstractControl {
    return this.addEditAddressesForm.get(this.controlsNames.campus);
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

  get room(): AbstractControl {
    return this.addEditAddressesForm.get(this.controlsNames.room);
  }

  get buildings(): AbstractControl {
    return this.addEditAddressesForm.get(this.controlsNames.buildings);
  }

  get controlsNames() {
    return REQUEST_FUNDS_CONTROL_NAMES;
  }

  ngOnInit() {
    this.initForm();
  }

  ngOnDestroy() {
    this.sourceSubscription.unsubscribe();
  }

  onCampusChanged({ detail: { value } }: CustomEvent<any>) {
    if (value === 'oncampus') {
      this.cleanControls(Object.keys(this.offCampusFormBlock()));
      this.addControls(this.onCampusFormBlock())
    } else {
      this.cleanControls(Object.keys(this.onCampusFormBlock()));
      this.addControls(this.offCampusFormBlock())
    }
  }

  private initForm() {
    this.addEditAddressesForm = this.fb.group(this.offCampusFormBlock());

    this.onChanges();
  }

  private onChanges() {
    const subscription = this.addEditAddressesForm.valueChanges
      .pipe(debounceTime(500))
      .subscribe(value => {
        this.onFormChanged.emit({
          value: { ...value, campus: value.campus === 'oncampus' ? '1' : '0' },
          valid: this.addEditAddressesForm.valid
        })
      });

    this.sourceSubscription.add(subscription);
  }

  onFormSubmit() { }

  private offCampusFormBlock() {
    const address1Errors = [
      errorDecorator(Validators.required, CONTROL_ERROR[REQUEST_FUNDS_CONTROL_NAMES.address1].required),
    ];

    const cityErrors = [errorDecorator(Validators.required, CONTROL_ERROR[REQUEST_FUNDS_CONTROL_NAMES.city].required)];

    const stateErrors = [
      errorDecorator(Validators.required, CONTROL_ERROR[REQUEST_FUNDS_CONTROL_NAMES.state].required),
    ];

    return {
      [this.controlsNames.campus]: ['offcampus'],
      [this.controlsNames.address1]: ['', address1Errors],
      [this.controlsNames.address2]: [''],
      [this.controlsNames.city]: ['', cityErrors],
      [this.controlsNames.state]: ['', stateErrors],
      [this.controlsNames.nickname]: [''],
      [this.controlsNames.default]: [false],
    }
  }

  private onCampusFormBlock() {
    const buildingsErrors = [
      errorDecorator(Validators.required, CONTROL_ERROR[REQUEST_FUNDS_CONTROL_NAMES.buildings].required),
    ];

    const roomErrors = [
      errorDecorator(Validators.required, CONTROL_ERROR[REQUEST_FUNDS_CONTROL_NAMES.room].required),
    ];

    return {
      [this.controlsNames.campus]: ['oncampus'],
      [this.controlsNames.buildings]: ['', buildingsErrors],
      [this.controlsNames.room]: ['', roomErrors],
    }
  }

  private cleanControls(controlNames: string[]) {
    for (let i = 0; i < controlNames.length; i++) {
      this.addEditAddressesForm.contains(controlNames[i]) && this.addEditAddressesForm.removeControl(controlNames[i]);
    }
  }

  private addControls(controls: any) {
    const modifedControls = Object.entries(controls);
    for (let i = 0; i < modifedControls.length; i++) {
      this.addEditAddressesForm.addControl(
        modifedControls[i][0],
        this.fb.control(modifedControls[i][1][0], modifedControls[i][1][1])
      );
    }
  }
}

export enum REQUEST_FUNDS_CONTROL_NAMES {
  campus = 'campus',
  address1 = 'address1',
  address2 = 'address2',
  city = 'city',
  state = 'state',
  nickname = 'nickname',
  default = 'default',
  buildings = 'building',
  room = 'room'
}

export const CONTROL_ERROR = {
  [REQUEST_FUNDS_CONTROL_NAMES.address1]: {
    required: 'You must enter a address.',
  },
  [REQUEST_FUNDS_CONTROL_NAMES.city]: {
    required: 'You must enter a city.',
  },
  [REQUEST_FUNDS_CONTROL_NAMES.state]: {
    required: 'You must choose a state.',
  },
  [REQUEST_FUNDS_CONTROL_NAMES.buildings]: {
    required: 'You must choose buildings.',
  },
  [REQUEST_FUNDS_CONTROL_NAMES.room]: {
    required: 'You must choose a room.',
  },
};

const errorDecorator = (fn: ValidatorFn, errorMsg: string): ((control: AbstractControl) => ValidationErrors | null) => {
  return control => {
    return fn(control) === null ? null : { errorMsg };
  };
};
