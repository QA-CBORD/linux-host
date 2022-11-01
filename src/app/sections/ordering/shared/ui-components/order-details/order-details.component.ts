import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  BuildingInfo,
  MerchantAccountInfoList,
  MerchantOrderTypesInfo,
  MerchantSettingInfo,
  OrderDetailOptions,
  OrderItem,
  OrderPayment,
} from '@sections/ordering';
import { MerchantSettings, ORDERING_CONTENT_STRINGS, PAYMENT_SYSTEM_TYPE } from '@sections/ordering/ordering.config';
import { AddressInfo } from '@core/model/address/address-info';
import { DeliveryAddressesModalComponent } from '@sections/ordering/shared/ui-components/delivery-addresses.modal/delivery-addresses.modal.component';
import { UserAccount } from '@core/model/account/account.model';
import { Subscription } from 'rxjs';
import {
  cvvValidationFn,
  formControlErrorDecorator,
  validateCurrency,
  validateGreaterOrEqualToZero,
  validateLessThanOther,
} from '@core/utils/general-helpers';
import { AccountType, DisplayName } from 'src/app/app.global';
import { OrderingComponentContentStrings, OrderingService } from '@sections/ordering/services/ordering.service';
import { take } from 'rxjs/operators';
import { UserFacadeService } from '@core/facades/user/user.facade.service';
import { UserInfoSet } from '@sections/settings/models/setting-items-config.model';
import { ModalsService } from '@core/service/modals/modals.service';
import { AccessibilityService } from '@shared/accessibility/services/accessibility.service';
import { IonSelect } from '@ionic/angular';
import { Keyboard } from '@capacitor/keyboard';

@Component({
  selector: 'st-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderDetailsComponent implements OnInit, OnDestroy, OnChanges {
  @Input() orderDetailOptions: OrderDetailOptions;
  @Input() readonly = true;
  @Input() accInfoList: MerchantAccountInfoList = {} as MerchantAccountInfoList;
  @Input() orderTypes: MerchantOrderTypesInfo;
  @Input() orderItems: OrderItem[] = [];
  @Input() paymentMethod: any = [];
  @Input() tax: number;
  @Input() discount: number;
  @Input() total: number;
  @Input() notes: string;
  @Input() orderPaymentName: string;
  @Input() deliveryFee: number;
  @Input() pickupFee: number;
  @Input() subTotal: number;
  @Input() tip: number;
  @Input() accountName: string;
  @Input() mealBased: boolean;
  @Input() accounts: UserAccount[] = [];
  @Input() merchantSettingsList: MerchantSettingInfo[] = [];
  @Input() addressModalConfig: AddressModalSettings;
  @Input() applePayEnabled: boolean;
  @Output() onFormChange: EventEmitter<OrderDetailsFormData> = new EventEmitter<OrderDetailsFormData>();
  @Output() onOrderItemRemovedId: EventEmitter<string> = new EventEmitter<string>();
  @Output() onOrderItemClicked: EventEmitter<OrderItem> = new EventEmitter<OrderItem>();
  @Output() onOrderPaymentInfoChanged: EventEmitter<Partial<OrderPayment> | string> = new EventEmitter<
    Partial<OrderPayment> | string
  >();
  @Output() onOrderTipChanged: EventEmitter<number> = new EventEmitter<number>();
  @ViewChild('paymentMethod') selectRef: IonSelect;
  @Input() merchantTimeZoneDisplayingMessage: string;
  @Input() checkinInstructionMessage: string;
  @Input() isExistingOrder: boolean;
  @Input() orderPayment: OrderPayment[];
  isApplePayment = false;

  private readonly sourceSub = new Subscription();
  contentStrings: OrderingComponentContentStrings = <OrderingComponentContentStrings>{};
  detailsForm: FormGroup;
  showCVVControl = false;
  applePayAccountType: Partial<UserAccount> = {
    accountType: AccountType.APPLEPAY,
    accountDisplayName: DisplayName.APPLEPAY,
    isActive: true,
  };
  user: UserInfoSet;

  constructor(
    private readonly fb: FormBuilder,
    private readonly modalController: ModalsService,
    private readonly orderingService: OrderingService,
    private readonly userFacadeService: UserFacadeService,
    private readonly a11yService: AccessibilityService
  ) {}

  ngOnInit() {
    this.initForm();
    this.initContentStrings();
    this.updateFormErrorsByContentStrings();
    this.setAccessoryBarVisible(true);
    this.setPhoneField();
  }

  async initAccountSelected(accounts: UserAccount[]) {
    const payment = this.orderPayment[0] || ({} as any);
    let accountId = payment.accountId || '';
    this.isApplePayment = accountId.startsWith('E');
    if (!this.isApplePayment) {
      let account = null;
      if (payment.accountName == 'Rollover Account' && !accountId) {
        accountId = 'rollup';
      }

      account = accounts.find(({ id }) => accountId == id);
      this.detailsForm.patchValue({
        [FORM_CONTROL_NAMES.paymentMethod]: account || '',
      });
    }
  }

  ngOnDestroy() {
    this.sourceSub.unsubscribe();
    this.setAccessoryBarVisible(false);
  }

  ngOnChanges({ orderDetailOptions }: SimpleChanges): void {
    if (orderDetailOptions && orderDetailOptions.currentValue === null) {
      this.orderDetailOptions = {} as OrderDetailOptions;
    }
  }

  get controlsNames() {
    return FORM_CONTROL_NAMES;
  }

  get isAddressClickable(): boolean {
    if (!this.readonly && this.addressModalConfig && this.addressModalConfig.isOrderTypePickup) {
      return !!this.addressModalConfig.pickupLocations.length;
    } else {
      return !!this.addressModalConfig;
    }
  }

  get timeWithoutTimezone() {
    if (Object.keys(this.orderDetailOptions).length) {
      if (this.orderDetailOptions.dueTime instanceof Date) {
        return this.orderDetailOptions;
      }
      return { ...this.orderDetailOptions, dueTime: new Date((<string>this.orderDetailOptions.dueTime).slice(0, 19)) };
    }
  }

  get isTipEnabled() {
    return !!this.merchantSettingsList.filter(
      ({ domain, category, name, value }) =>
        `${domain}.${category}.${name}` === MerchantSettings.tipEnabled && !!Number(value)
    ).length;
  }

  trackByAccountId(i: number): string {
    return `${i}-${Math.random()}`;
  }

  goToItemDetails(orderItem) {
    this.onOrderItemClicked.emit(orderItem);
  }

  onRemoveOrderItem(id: string) {
    this.onOrderItemRemovedId.emit(id);
  }

  setAccessoryBarVisible(isVisible: boolean) {
    Keyboard.setAccessoryBarVisible({ isVisible: isVisible }).catch(() => {
      // TODO: Properly handle exception
    });
  }

  initForm() {
    this.detailsForm = this.fb.group({
      [FORM_CONTROL_NAMES.address]: [this.orderDetailOptions.address],
      [FORM_CONTROL_NAMES.paymentMethod]: ['', Validators.required],
      [FORM_CONTROL_NAMES.note]: [this.notes],
      [FORM_CONTROL_NAMES.phone]: [''],
    });

    if (!this.mealBased && this.isTipEnabled) {
      const tipErrors = [
        formControlErrorDecorator(validateCurrency, CONTROL_ERROR[FORM_CONTROL_NAMES.tip].currency),
        formControlErrorDecorator(validateGreaterOrEqualToZero, CONTROL_ERROR[FORM_CONTROL_NAMES.tip].min),
      ];

      if (!this.isExistingOrder) {
        tipErrors.push(
          formControlErrorDecorator(
            validateLessThanOther(this.subTotal),
            CONTROL_ERROR[FORM_CONTROL_NAMES.tip].subtotal
          )
        );
      }

      this.detailsForm.addControl(FORM_CONTROL_NAMES.tip, this.fb.control(this.tip ? this.tip : ''));
      this.detailsForm.controls[FORM_CONTROL_NAMES.tip].setValidators(tipErrors);
    }
    const phoneErrors = [
      formControlErrorDecorator(Validators.required, CONTROL_ERROR[FORM_CONTROL_NAMES.phone].required),
      formControlErrorDecorator(Validators.minLength(3), CONTROL_ERROR[FORM_CONTROL_NAMES.phone].min),
      formControlErrorDecorator(Validators.maxLength(22), CONTROL_ERROR[FORM_CONTROL_NAMES.phone].max),
    ];
    this.detailsForm.controls[FORM_CONTROL_NAMES.phone].setValidators(phoneErrors);
    this.subscribeOnFormChanges();
  }

  onTipChanged({ detail: { value } }) {
    if (!this.tipFormControl.valid) return;
    this.onOrderTipChanged.emit(value ? Number(value) : 0);
  }

  onPaymentChanged(data) {
    const {
      detail: { value },
    } = data;
    const { id, paymentSystemType } = value;

    if (value instanceof Object) {
      this.onOrderPaymentInfoChanged.emit({ accountId: id, paymentSystemType });
    } else {
      this.onOrderPaymentInfoChanged.emit(value);
      this.detailsForm.get(this.controlsNames.paymentMethod).reset();
      this.detailsForm.setValue({ [this.controlsNames.paymentMethod]: '' });
    }

    if (paymentSystemType === PAYMENT_SYSTEM_TYPE.MONETRA) {
      this.addCvvControl();
      if (this.cvvFormControl.value) this.cvvFormControl.reset();
    } else {
      this.removeCvvControl();
    }
  }

  get paymentFormControl(): AbstractControl {
    return this.detailsForm.get(FORM_CONTROL_NAMES.paymentMethod);
  }

  get tipFormControl(): AbstractControl {
    return this.detailsForm.get(FORM_CONTROL_NAMES.tip);
  }

  get cvvFormControl(): AbstractControl {
    return this.detailsForm.get(FORM_CONTROL_NAMES.cvv);
  }

  get phone(): AbstractControl {
    return this.detailsForm.get(FORM_CONTROL_NAMES.phone);
  }

  openActionSheet() {
    this.a11yService.isVoiceOverClick$.then(value => {
      if (value) {
        this.selectRef.open();
      }
    });
  }

  private get addressInfoFormControl(): AbstractControl {
    return this.detailsForm.get(FORM_CONTROL_NAMES.address);
  }

  private subscribeOnFormChanges() {
    const sub = this.detailsForm.valueChanges.subscribe(data => {
      this.onFormChange.emit({ data, valid: this.detailsForm.valid });
    });
    this.sourceSub.add(sub);
  }

  private addCvvControl() {
    this.showCVVControl = true;
    this.detailsForm.addControl(FORM_CONTROL_NAMES.cvv, this.fb.control('', [Validators.required, cvvValidationFn]));
  }

  private removeCvvControl() {
    this.showCVVControl = false;
    this.detailsForm.removeControl(FORM_CONTROL_NAMES.cvv);
  }

  async showAddressListModal(): Promise<void> {
    const modal = await this.modalController.create({
      component: DeliveryAddressesModalComponent,
      componentProps: this.addressModalConfig,
    });
    modal.onDidDismiss().then(({ data }) => {
      data && this.addressInfoFormControl.setValue(data);
    });
    await modal.present();
  }

  private initContentStrings() {
    this.contentStrings.buttonCancel = this.orderingService.getContentStringByName(
      ORDERING_CONTENT_STRINGS.buttonCancel
    );
    this.contentStrings.formErrorTipInvalidFormat = this.orderingService.getContentStringByName(
      ORDERING_CONTENT_STRINGS.formErrorTipInvalidFormat
    );
    this.contentStrings.formErrorTipMinimum = this.orderingService.getContentStringByName(
      ORDERING_CONTENT_STRINGS.formErrorTipMinimum
    );
    this.contentStrings.formErrorTipSubtotal = this.orderingService.getContentStringByName(
      ORDERING_CONTENT_STRINGS.formErrorTipSubtotal
    );
    this.contentStrings.labelTotal = this.orderingService.getContentStringByName(ORDERING_CONTENT_STRINGS.labelTotal);
    this.contentStrings.labelTip = this.orderingService.getContentStringByName(ORDERING_CONTENT_STRINGS.labelTip);
    this.contentStrings.labelTipAmount = this.orderingService.getContentStringByName(
      ORDERING_CONTENT_STRINGS.labelTipAmount
    );
    this.contentStrings.labelTax = this.orderingService.getContentStringByName(ORDERING_CONTENT_STRINGS.labelTax);
    this.contentStrings.labelSubtotal = this.orderingService.getContentStringByName(
      ORDERING_CONTENT_STRINGS.labelSubtotal
    );
    this.contentStrings.labelRemoveItem = this.orderingService.getContentStringByName(
      ORDERING_CONTENT_STRINGS.labelRemoveItem
    );
    this.contentStrings.labelPickupFee = this.orderingService.getContentStringByName(
      ORDERING_CONTENT_STRINGS.labelPickupFee
    );
    this.contentStrings.labelPaymentMethod = this.orderingService.getContentStringByName(
      ORDERING_CONTENT_STRINGS.labelPaymentMethod
    );
    this.contentStrings.labelDeliveryFee = this.orderingService.getContentStringByName(
      ORDERING_CONTENT_STRINGS.labelDeliveryFee
    );
    this.contentStrings.labelDiscount = this.orderingService.getContentStringByName(
      ORDERING_CONTENT_STRINGS.labelDiscount
    );
    this.contentStrings.labelOrderNotes = this.orderingService.getContentStringByName(
      ORDERING_CONTENT_STRINGS.labelOrderNotes
    );
    this.contentStrings.selectAccount = this.orderingService.getContentStringByName(
      ORDERING_CONTENT_STRINGS.selectAccount
    );
  }

  private async updateFormErrorsByContentStrings(): Promise<void> {
    CONTROL_ERROR[FORM_CONTROL_NAMES.tip].currency = await this.contentStrings.formErrorTipInvalidFormat
      .pipe(take(1))
      .toPromise();
    CONTROL_ERROR[FORM_CONTROL_NAMES.tip].min = await this.contentStrings.formErrorTipMinimum.pipe(take(1)).toPromise();
    CONTROL_ERROR[FORM_CONTROL_NAMES.tip].subtotal = await this.contentStrings.formErrorTipSubtotal
      .pipe(take(1))
      .toPromise();
  }

  private checkFieldValue(field: AbstractControl, value: string) {
    if (value) {
      field.setValue(value);
      field.markAsDirty();
    }
  }

  private setPhoneField() {
    this.userFacadeService
      .getUser$()
      .pipe(take(1))
      .toPromise()
      .then(user => {
        this.checkFieldValue(this.phone, user.phone);
      });
  }
}

export enum FORM_CONTROL_NAMES {
  address = 'address',
  paymentMethod = 'paymentMethod',
  cvv = 'cvv',
  tip = 'tip',
  note = 'note',
  phone = 'phone',
  email = 'email',
  name = 'name',
}

export const CONTROL_ERROR = {
  [FORM_CONTROL_NAMES.tip]: {
    min: 'Tip must be greater than zero',
    currency: 'Invalid format',
    subtotal: 'Tip must be less than the Subtotal amount',
  },
  [FORM_CONTROL_NAMES.phone]: {
    required: 'Phone number is required',
    min: 'Phone number must have at least three characters',
    max: 'Phone number is too long',
  },
};

export interface AddressModalSettings {
  defaultAddress: AddressInfo;
  buildings: BuildingInfo[];
  isOrderTypePickup: boolean;
  pickupLocations: BuildingInfo[];
  deliveryAddresses: AddressInfo[];
  merchantId: string;
}

export interface OrderDetailsFormData {
  data: {
    [FORM_CONTROL_NAMES.address]: BuildingInfo;
    [FORM_CONTROL_NAMES.paymentMethod]: UserAccount;
    [FORM_CONTROL_NAMES.note]: string;
    [FORM_CONTROL_NAMES.phone]: string;
  };
  valid: boolean;
}
