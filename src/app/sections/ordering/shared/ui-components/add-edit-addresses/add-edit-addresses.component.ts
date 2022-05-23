import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { debounceTime, map, take } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';
import { MerchantService } from '@sections/ordering/services';
import { ORDERING_CONTENT_STRINGS } from '@sections/ordering/ordering.config';
import { LoadingService } from '@core/service/loading/loading.service';
import { OrderingComponentContentStrings, OrderingService } from '@sections/ordering/services/ordering.service';
import { formControlErrorDecorator, sortAlphabetically } from '@core/utils/general-helpers';
import { ContentStringsFacadeService } from '@core/facades/content-strings/content-strings.facade.service';
import { CONTENT_STRINGS_CATEGORIES, CONTENT_STRINGS_DOMAINS } from '../../../../../content-strings';
import { SettingsFacadeService } from '@core/facades/settings/settings-facade.service';
import { Settings } from '../../../../../app.global';

@Component({
  selector: 'st-add-edit-addresses',
  templateUrl: './add-edit-addresses.component.html',
  styleUrls: ['./add-edit-addresses.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddEditAddressesComponent implements OnInit, OnChanges, OnDestroy {
  @Input() buildingsOnCampus;
  @Input() editAddress: any;
  @Input() isError: boolean;
  @Input() defaultAddress: string;
  @Output() onFormChanged: EventEmitter<any> = new EventEmitter<any>();

  contentStrings: OrderingComponentContentStrings = <OrderingComponentContentStrings>{};
  addEditAddressesForm: FormGroup;
  arrOfStates$: Observable<string[]>;
  addressRestriction = { onCampus: false, offCampus: false };
  customActionSheetOptions: { [key: string]: string } = {
    cssClass: 'custom-deposit-actionSheet',
  };

  private readonly sourceSubscription: Subscription = new Subscription();

  constructor(
    private readonly fb: FormBuilder,
    private readonly merchantService: MerchantService,
    private readonly cdRef: ChangeDetectorRef,
    private readonly loader: LoadingService,
    private readonly orderingService: OrderingService,
    private readonly contentStringsFacadeService: ContentStringsFacadeService,
    private readonly settingsFacadeService: SettingsFacadeService
  ) {}

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
    this.getSetting(Settings.Setting.ADDRESS_RESTRICTION);
    this.initContentStrings();
    this.updateFormErrorsByContentStrings();
  }

  ngOnDestroy() {
    this.sourceSubscription.unsubscribe();
  }

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

  onCampusChanged({ detail: { value } }: CustomEvent<any>) {
    if (value === 'oncampus') {
      this.cleanControls(Object.keys(this.offCampusFormBlock(this.editAddress && this.editAddress.address)));
      this.addControls(this.onCampusFormBlock(this.editAddress && this.editAddress.address));
    } else {
      this.cleanControls(Object.keys(this.onCampusFormBlock(this.editAddress && this.editAddress.address)));
      this.addControls(this.offCampusFormBlock(this.editAddress && this.editAddress.address));
    }
  }

  private getSetting(setting: Settings.Setting) {
    this.settingsFacadeService
      .getSetting(setting)
      .pipe(take(1))
      .subscribe(
        ({ value }) => {
          this.initForm(parseInt(value), this.editAddress && this.editAddress.address);
        },
        () => {
          this.loader.closeSpinner();
        },

        () => {
          this.loader.closeSpinner();
        }
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
    const address1Errors = [formControlErrorDecorator(Validators.required, CONTROL_ERROR[address1].required)];
    const cityErrors = [formControlErrorDecorator(Validators.required, CONTROL_ERROR[city].required)];
    const stateErrors = [formControlErrorDecorator(Validators.required, CONTROL_ERROR[state].required)];

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
    const buildingsErrors = [formControlErrorDecorator(Validators.required, CONTROL_ERROR[buildings].required)];

    const roomErrors = [formControlErrorDecorator(Validators.required, CONTROL_ERROR[room].required)];
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

  private initContentStrings() {
    this.contentStrings.formErrorAddress = this.orderingService.getContentStringByName(
      ORDERING_CONTENT_STRINGS.formErrorAddress
    );
    this.contentStrings.formErrorBuilding = this.orderingService.getContentStringByName(
      ORDERING_CONTENT_STRINGS.formErrorBuilding
    );
    this.contentStrings.formErrorCity = this.orderingService.getContentStringByName(
      ORDERING_CONTENT_STRINGS.formErrorCity
    );
    this.contentStrings.formErrorRoom = this.orderingService.getContentStringByName(
      ORDERING_CONTENT_STRINGS.formErrorRoom
    );
    this.contentStrings.formErrorState = this.orderingService.getContentStringByName(
      ORDERING_CONTENT_STRINGS.formErrorState
    );
    this.contentStrings.labelState = this.orderingService.getContentStringByName(ORDERING_CONTENT_STRINGS.labelState);
    this.contentStrings.labelSetAsDefault = this.orderingService.getContentStringByName(
      ORDERING_CONTENT_STRINGS.labelSetAsDefault
    );
    this.contentStrings.labelOffCampus = this.orderingService.getContentStringByName(
      ORDERING_CONTENT_STRINGS.labelOffCampus
    );
    this.contentStrings.labelOnCampus = this.orderingService.getContentStringByName(
      ORDERING_CONTENT_STRINGS.labelOnCampus
    );
    this.contentStrings.labelRoom = this.orderingService.getContentStringByName(ORDERING_CONTENT_STRINGS.labelRoom);
    this.contentStrings.labelAddressLine1 = this.orderingService.getContentStringByName(
      ORDERING_CONTENT_STRINGS.labelAddressLine1
    );
    this.contentStrings.labelAddressLine2 = this.orderingService.getContentStringByName(
      ORDERING_CONTENT_STRINGS.labelAddressLine2
    );
    this.contentStrings.labelBuildings = this.orderingService.getContentStringByName(
      ORDERING_CONTENT_STRINGS.labelBuildings
    );
    this.contentStrings.labelCity = this.orderingService.getContentStringByName(ORDERING_CONTENT_STRINGS.labelCity);
    this.contentStrings.labelNickname = this.orderingService.getContentStringByName(
      ORDERING_CONTENT_STRINGS.labelNickname
    );
    this.contentStrings.labelOptional = this.orderingService.getContentStringByName(
      ORDERING_CONTENT_STRINGS.labelOptional
    );
    this.contentStrings.selectAccount = this.orderingService.getContentStringByName(
      ORDERING_CONTENT_STRINGS.selectAccount
    );
    this.arrOfStates$ = this.contentStringsFacadeService
      .getContentStrings$(CONTENT_STRINGS_DOMAINS.patronUi, CONTENT_STRINGS_CATEGORIES.usStates)
      .pipe(
        map(stateStrings => {
          const statesArray = stateStrings.map(({ value }) => value);
          return statesArray.sort(sortAlphabetically);
        })
      );
  }

  private async updateFormErrorsByContentStrings(): Promise<void> {
    CONTROL_ERROR[ADD_EDIT_ADDRESS_CONTROL_NAMES.address1].required = await this.contentStrings.formErrorAddress
      .pipe(take(1))
      .toPromise();
    CONTROL_ERROR[ADD_EDIT_ADDRESS_CONTROL_NAMES.buildings].required = await this.contentStrings.formErrorBuilding
      .pipe(take(1))
      .toPromise();
    CONTROL_ERROR[ADD_EDIT_ADDRESS_CONTROL_NAMES.room].required = await this.contentStrings.formErrorRoom
      .pipe(take(1))
      .toPromise();
    CONTROL_ERROR[ADD_EDIT_ADDRESS_CONTROL_NAMES.city].required = await this.contentStrings.formErrorCity
      .pipe(take(1))
      .toPromise();
    CONTROL_ERROR[ADD_EDIT_ADDRESS_CONTROL_NAMES.state].required = await this.contentStrings.formErrorState
      .pipe(take(1))
      .toPromise();
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
    required: 'You must enter an address.',
  },
  [ADD_EDIT_ADDRESS_CONTROL_NAMES.city]: {
    required: 'You must enter a city.',
  },
  [ADD_EDIT_ADDRESS_CONTROL_NAMES.state]: {
    required: 'You must choose a state.',
  },

  [ADD_EDIT_ADDRESS_CONTROL_NAMES.buildings]: {
    required: 'You must select a building.',
  },
  [ADD_EDIT_ADDRESS_CONTROL_NAMES.room]: {
    required: 'You must choose a room.',
  },
};
