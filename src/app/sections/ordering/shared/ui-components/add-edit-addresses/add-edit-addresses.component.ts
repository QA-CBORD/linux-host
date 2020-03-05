import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  Input,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  SimpleChanges,
  OnChanges,
  OnDestroy,
} from '@angular/core';
import { Validators, FormGroup, FormBuilder, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { debounceTime, take } from 'rxjs/operators';
import * as states from '../../../../../../assets/states.json';
import { Subscription } from 'rxjs';
import { MerchantService } from '@sections/ordering/services';
import { SYSTEM_SETTINGS_CONFIG } from '@sections/ordering/ordering.config';
import { LoadingService } from '@core/service/loading/loading.service';

@Component({
  selector: 'st-add-edit-addresses',
  templateUrl: './add-edit-addresses.component.html',
  styleUrls: ['./add-edit-addresses.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddEditAddressesComponent implements OnInit, OnChanges, OnDestroy {
  addEditAddressesForm: FormGroup;
  arrOfStates = states;
  addressRestriction = { onCampus: false, offCampus: false };
  customActionSheetOptions: { [key: string]: string } = {
    cssClass: 'custom-deposit-actionSheet',
  };

  private readonly sourceSubscription: Subscription = new Subscription();

  @Input() buildingsOnCampus;
  @Input() editAddress: any;
  @Input() isError: boolean;
  @Input() defaultAddress: string;
  @Output() onFormChanged: EventEmitter<any> = new EventEmitter<any>();
  constructor(
    private readonly fb: FormBuilder,
    private readonly merchantService: MerchantService,
    private readonly cdRef: ChangeDetectorRef,
    private readonly loader: LoadingService
  ) { }

  get controlsNames() {
    return ADD_EDIT_ADDRESS_CONTROL_NAMES;
  }

  get campus(): AbstractControl {
    if (this.addEditAddressesForm) {
      return this.addEditAddressesForm.get(this.controlsNames.campus);
    }
  }

  get address1(): AbstractControl {
    if (this.addEditAddressesForm) {
      return this.addEditAddressesForm.get(this.controlsNames.address1);
    }
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

  ngOnChanges(changes: SimpleChanges): void {
    if (this.addEditAddressesForm) {
      const { controls } = this.addEditAddressesForm;
      if (changes.isError && changes.isError.currentValue) {
        Object.keys(controls).forEach(controlName => controls[controlName].markAsTouched());
      } else {
        Object.keys(controls).forEach(controlName => controls[controlName].markAsUntouched());
      }
    }
  }

  ngOnInit() {
    this.getSettingByConfig(SYSTEM_SETTINGS_CONFIG.addressRestrictionToOnCampus);
  }

  ngOnDestroy() {
    this.sourceSubscription.unsubscribe();
  }

  onCampusChanged({ detail: { value } }: CustomEvent<any>) {
    if (value === 'oncampus') {
      this.cleanControls(Object.keys(this.offCampusFormBlock(this.editAddress && this.editAddress.address)));
      this.addControls(this.onCampusFormBlock(this.editAddress && this.editAddress.address));
    } else {
      this.cleanControls(Object.keys(this.onCampusFormBlock(this.editAddress && this.editAddress.address)));
      this.addControls(this.offCampusFormBlock(this.editAddress && this.editAddress.address));
    }
  }

  private getSettingByConfig(config) {
    this.loader.showSpinner();
    this.merchantService
      .getSettingByConfig(config)
      .pipe(take(1))
      .subscribe(
        ({ value }) => {
          this.initForm(parseInt(value), this.editAddress && this.editAddress.address);
        },
        null,
        () => this.loader.closeSpinner()
      );
  }

  private initForm(addressRestriction, selectedAddress) {
    let campusBlock;

    if (selectedAddress && Object.keys(selectedAddress).length) {
      if (selectedAddress.onCampus) {
        campusBlock = this.onCampusFormBlock(selectedAddress);
        this.addressRestriction = { ...this.addressRestriction, offCampus: true };
      } else {
        campusBlock = this.offCampusFormBlock(selectedAddress);
        this.addressRestriction = { ...this.addressRestriction, onCampus: true };
      }
    } else {
      if (addressRestriction === 2 || addressRestriction === 0) {
        campusBlock = this.offCampusFormBlock(selectedAddress);
        if (addressRestriction === 2) this.addressRestriction = { ...this.addressRestriction, onCampus: true };
      } else {
        campusBlock = this.onCampusFormBlock(selectedAddress);
        this.addressRestriction = { ...this.addressRestriction, offCampus: true };
      }
    }
    this.addEditAddressesForm = this.fb.group(campusBlock);
    this.cdRef.detectChanges();

    this.onChanges();
  }

  private onChanges() {
    const subscription = this.addEditAddressesForm.valueChanges.pipe(debounceTime(500)).subscribe(value => {
      const id = this.editAddress && this.editAddress.address ? this.editAddress.address.id : null;
      this.onFormChanged.emit({
        value: { ...value, campus: value.campus === 'oncampus' ? '1' : '0', id },
        valid: this.addEditAddressesForm.valid,
      });
    });

    this.sourceSubscription.add(subscription);
  }

  private offCampusFormBlock(selectedAddress) {
    const { address1, city, state } = ADD_EDIT_ADDRESS_CONTROL_NAMES;
    const address1Errors = [errorDecorator(Validators.required, CONTROL_ERROR[address1].required)];
    const cityErrors = [errorDecorator(Validators.required, CONTROL_ERROR[city].required)];
    const stateErrors = [errorDecorator(Validators.required, CONTROL_ERROR[state].required)];

    let campus;
    if (selectedAddress && selectedAddress.onCampus !== null) {
      campus = selectedAddress.onCampus ? 'oncampus' : 'offcampus';
    }
    return {
      [this.controlsNames.campus]: [campus || 'offcampus'],
      [this.controlsNames.address1]: [
        selectedAddress && selectedAddress.address1 !== null ? selectedAddress.address1 : '',
        address1Errors,
      ],
      [this.controlsNames.address2]: [
        selectedAddress && selectedAddress.address2 !== null ? selectedAddress.address2 : '',
      ],
      [this.controlsNames.city]: [
        selectedAddress && selectedAddress.city !== null ? selectedAddress.city : '',
        cityErrors,
      ],
      [this.controlsNames.state]: [
        selectedAddress && selectedAddress.state !== null ? selectedAddress.state : '',
        stateErrors,
      ],
      [this.controlsNames.nickname]: [
        selectedAddress && selectedAddress.nickname !== null ? selectedAddress.nickname : '',
      ],
      [this.controlsNames.default]: [this.defaultAddress && selectedAddress.id === this.defaultAddress],
    };
  }

  private onCampusFormBlock(selectedAddress) {
    const { buildings, room } = ADD_EDIT_ADDRESS_CONTROL_NAMES;
    const buildingsErrors = [
      errorDecorator(Validators.required, CONTROL_ERROR[buildings].required),
    ];

    const roomErrors = [errorDecorator(Validators.required, CONTROL_ERROR[room].required)];
    let campus;
    if (selectedAddress && selectedAddress.onCampus !== null) {
      campus = selectedAddress.onCampus ? 'oncampus' : 'offcampus';
    }

    return {
      [this.controlsNames.campus]: [campus || 'oncampus'],
      [this.controlsNames.buildings]: [
        selectedAddress && selectedAddress.building !== null
          ? this.editAddress.activeBuilding.addressInfo.building
          : '',
        buildingsErrors,
      ],
      [this.controlsNames.room]: [
        selectedAddress && selectedAddress.room !== null ? selectedAddress.room : '',
        roomErrors,
      ],
      [this.controlsNames.default]: [this.defaultAddress && selectedAddress.id === this.defaultAddress],
    };
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

export enum ADD_EDIT_ADDRESS_CONTROL_NAMES {
  campus = 'campus',
  address1 = 'address1',
  address2 = 'address2',
  city = 'city',
  state = 'state',
  nickname = 'nickname',
  default = 'default',
  buildings = 'building',
  room = 'room',
}

export const CONTROL_ERROR = {
  [ADD_EDIT_ADDRESS_CONTROL_NAMES.address1]: {
    required: 'You must enter a address.',
  },
  [ADD_EDIT_ADDRESS_CONTROL_NAMES.city]: {
    required: 'You must enter a city.',
  },
  [ADD_EDIT_ADDRESS_CONTROL_NAMES.state]: {
    required: 'You must choose a state.',
  },
  [ADD_EDIT_ADDRESS_CONTROL_NAMES.buildings]: {
    required: 'You must choose buildings.',
  },
  [ADD_EDIT_ADDRESS_CONTROL_NAMES.room]: {
    required: 'You must choose a room.',
  },
};

const errorDecorator = (fn: ValidatorFn, errorMsg: string): ((control: AbstractControl) => ValidationErrors | null) => {
  return control => {
    return fn(control) === null ? null : { errorMsg };
  };
};
