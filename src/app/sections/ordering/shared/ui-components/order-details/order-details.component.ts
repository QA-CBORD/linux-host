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
  ViewChild,
} from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  BuildingInfo,
  CartService,
  MerchantAccountInfoList,
  MerchantInfo,
  MerchantOrderTypesInfo,
  MerchantSettingInfo,
  OrderDetailOptions,
  OrderInfo,
  OrderItem,
  OrderPayment,
} from '@sections/ordering';
import {
  MerchantSettings,
  ORDERING_CONTENT_STRINGS,
  ORDER_TYPE,
  ORDER_VALIDATION_ERRORS,
  PAYMENT_SYSTEM_TYPE,
} from '@sections/ordering/ordering.config';
import { AddressInfo } from '@core/model/address/address-info';
import { DeliveryAddressesModalComponent } from '@sections/ordering/shared/ui-components/delivery-addresses.modal/delivery-addresses.modal.component';
import { UserAccount } from '@core/model/account/account.model';
import { Subscription } from 'rxjs';
import {
  cvvValidationFn,
  formControlErrorDecorator,
  handleServerError,
  validateCurrency,
  validateGreaterOrEqualToZero,
  validateLessThanOther,
} from '@core/utils/general-helpers';
import { AccountType, DisplayName } from 'src/app/app.global';
import { OrderingComponentContentStrings, OrderingService } from '@sections/ordering/services/ordering.service';
import { first, take } from 'rxjs/operators';
import { UserFacadeService } from '@core/facades/user/user.facade.service';
import { UserInfo } from '@core/model/user';
import { ModalsService } from '@core/service/modals/modals.service';
import { AccessibilityService } from '@shared/accessibility/services/accessibility.service';
import { IonSelect } from '@ionic/angular';
import { Keyboard } from '@capacitor/keyboard';
import { checkPaymentFailed } from '@sections/ordering/utils/transaction-check';
import { OrderOptionsActionSheetComponent } from '../order-options.action-sheet/order-options.action-sheet.component';
import { LoadingService } from '@core/service/loading/loading.service';
import { IGNORE_ERRORS } from '@sections/ordering/pages/full-menu/full-menu.component';
import { ToastService } from '@core/service/toast/toast.service';

@Component({
  selector: 'st-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderDetailsComponent implements OnInit, OnDestroy, OnChanges {
  @Input() set orderInfo({
    amountDue,
    tax,
    deliveryFee,
    discount,
    mealBased,
    notes,
    orderItems,
    orderPayment,
    pickupFee,
    subTotal,
    tip,
    total,
    transactionId,
  }: OrderInfo) {
    this.amountDue = amountDue;
    this.tax = tax;
    this.transactionId = transactionId;
    this.deliveryFee = deliveryFee;
    this.discount = discount;
    this.mealBased = mealBased;
    this.pickupFee = pickupFee;
    this.orderItems = orderItems;
    this.subTotal = subTotal;
    this.tip = tip;
    this.total = total;
    this.orderPayment = orderPayment;
    this.orderPaymentName = this.orderPayment?.[0]?.accountName || '';
    if (!this.readonly) {
      this.notes = notes;
    }
  }

  @Input() set merchant(merchant: MerchantInfo) {
    this.merchantSettingsList = merchant.settings.list;
    this.orderTypes = merchant.orderTypes;
    this.isWalkoutOrder = !!merchant.walkout;
    this._merchat = merchant;
    this.isMerchantOrderAhead = parseInt(merchant.settings.map[MerchantSettings.orderAheadEnabled].value) === 1;
  }

  @Input() orderDetailOptions: OrderDetailOptions;
  @Input() readonly = true;
  @Input() accInfoList: MerchantAccountInfoList = {} as MerchantAccountInfoList;
  @Input() orderTypes: MerchantOrderTypesInfo;
  @Input() accounts: UserAccount[] = [];
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
  @Input() dueTimeHasErrors: boolean;

  _merchat: MerchantInfo;
  accountName: string;
  orderItems: OrderItem[] = [];
  tax: number;
  amountDue: number;
  discount: number;
  total: number;
  orderPaymentName: string;
  deliveryFee: number;
  pickupFee: number;
  subTotal: number;
  tip: number;
  merchantSettingsList: MerchantSettingInfo[] = [];
  mealBased: boolean;
  notes: string;
  orderPayment: OrderPayment[];
  transactionId: string;
  hasReadonlyPaymentMethodError = false;
  isApplePayment = false;
  isWalkoutOrder = false;
  isMerchantOrderAhead = false;
  dueTimeTypeError: 'pickUpTimeNotAvailable' | 'deliveryTimeNotAvailable';

  private readonly sourceSub = new Subscription();
  contentStrings: OrderingComponentContentStrings = <OrderingComponentContentStrings>{};
  detailsForm: FormGroup;
  showCVVControl = false;
  applePayAccountType: Partial<UserAccount> = {
    accountType: AccountType.APPLEPAY,
    accountDisplayName: DisplayName.APPLEPAY,
    isActive: true,
  };
  user: UserInfo;

  readonly paymentMethodErrorMessages: PaymentMethodErrorMessages = {
    required: 'A payment method must be selected',
    paymentMethodFailed:
      'There was an issue processing the payment for this order. \nContact the merchant to resolve this issue.',
  };

  readonly dueTimeErrorMessages: DueTimeErrorMessages = {
    pickUpTimeNotAvailable: 'This pickup time is not available',
    deliveryTimeNotAvailable: 'This delivery time is not available',
  };

  constructor(
    private readonly fb: FormBuilder,
    private readonly modalController: ModalsService,
    private readonly orderingService: OrderingService,
    private readonly userFacadeService: UserFacadeService,
    private readonly cdRef: ChangeDetectorRef,
    private readonly a11yService: AccessibilityService,
    private readonly cartService: CartService,
    private readonly loadingService: LoadingService,
    private readonly toastService: ToastService
  ) {}

  ngOnInit() {
    this.initForm();
    this.initContentStrings();
    this.updateFormErrorsByContentStrings();
    this.setAccessoryBarVisible(true);
    this.setPhoneField();
    this.initAccountSelected();
  }

  private initAccountSelected() {
    const payment = this.orderPayment[0] || { accountId: '', accountName: '' };
    let accountId = payment.accountId || '';
    this.isApplePayment = accountId.startsWith('E');
    if (!this.isApplePayment) {
      let account = null;
      if (payment.accountName == 'Rollover Account' && !accountId) {
        accountId = 'rollup';
      }

      account = this.accounts.find(({ id }) => accountId == id);
      this.detailsForm.patchValue({
        [FORM_CONTROL_NAMES.paymentMethod]: account || '',
      });
    }
  }

  ngOnDestroy() {
    this.sourceSub.unsubscribe();
    this.setAccessoryBarVisible(false);
  }

  ngOnChanges({ orderDetailOptions, dueTimeHasErrors }: SimpleChanges): void {
    if (orderDetailOptions && orderDetailOptions.currentValue === null) {
      this.orderDetailOptions = {} as OrderDetailOptions;
    }

    if (dueTimeHasErrors && dueTimeHasErrors.currentValue !== null) {
      this.markDueTieWithErrors();
    }
  }

  markDueTieWithErrors(): void {
    if (this.dueTimeHasErrors) {
      this.dueTimeTypeError =
        this.orderDetailOptions.orderType === ORDER_TYPE.PICKUP ? 'pickUpTimeNotAvailable' : 'deliveryTimeNotAvailable';
      const dueTimeErrorKey: keyof DueTimeErrorMessages = this.dueTimeTypeError;

      this.dueTimeFormControl.disable();
      this.dueTimeFormControl.setErrors({ [dueTimeErrorKey]: true });
      this.dueTimeFormControl.markAsTouched();
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
      [FORM_CONTROL_NAMES.address]: [''],
      [FORM_CONTROL_NAMES.address]: [this.orderDetailOptions.address],
      [FORM_CONTROL_NAMES.paymentMethod]: [{ value: '', disabled: this.isPaymentMethodDisabled }, Validators.required],
      [FORM_CONTROL_NAMES.note]: [this.notes],
      [FORM_CONTROL_NAMES.phone]: [''],
      [FORM_CONTROL_NAMES.dueTime]: [''],
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

    if (!this.isExistingOrder) {
      this.detailsForm.get(FORM_CONTROL_NAMES.paymentMethod).markAsTouched();
    }
    if (this.readonly) {
      this.checkForOrderIssuesOnReadOnly();
    }
    this.subscribeOnFormChanges();
  }

  get isPaymentMethodDisabled() {
    return this.isExistingOrder && !this.isApplePayment;
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
      this.detailsForm.patchValue({ [this.controlsNames.paymentMethod]: '' });
    }

    if (paymentSystemType === PAYMENT_SYSTEM_TYPE.MONETRA) {
      this.addCvvControl();
      if (this.cvvFormControl.value) this.cvvFormControl.reset();
    } else {
      this.removeCvvControl();
    }
    this.cdRef.detectChanges();
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

  get dueTimeFormControl(): AbstractControl {
    return this.detailsForm.get(FORM_CONTROL_NAMES.dueTime);
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
    const sub = this.detailsForm.valueChanges.subscribe(() => {
      this.onFormChange.emit({ data: this.detailsForm.getRawValue(), valid: this.detailsForm.valid });
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

  private checkForOrderIssuesOnReadOnly() {
    if (this.isWalkoutOrder) {
      if (checkPaymentFailed({ amountDue: this.amountDue, transactionId: this.transactionId })) {
        const paymentMethodFailedKey: keyof PaymentMethodErrorMessages = 'paymentMethodFailed';

        this.paymentFormControl.disable();
        this.paymentFormControl.setValue(this.orderPaymentName);
        this.paymentFormControl.setErrors({ [paymentMethodFailedKey]: true });
        this.paymentFormControl.markAsTouched();
        this.hasReadonlyPaymentMethodError = true;
      }
    }
  }

  changeOrderTime() {
    this.cartService.setActiveMerchant(this._merchat);
    this.actionSheet(
      this._merchat.orderTypes,
      this._merchat.id,
      this._merchat.storeAddress,
      this._merchat.settings,
      this._merchat.timeZone
    );
  }

  async actionSheet(orderTypes: MerchantOrderTypesInfo, merchantId, storeAddress, settings, timeZone): Promise<void> {
    const footerButtonName = 'continue';
    let cssClass = 'order-options-action-sheet';
    cssClass += orderTypes.delivery && orderTypes.pickup ? ' order-options-action-sheet-p-d' : '';

    const modal = await this.modalController.createActionSheet({
      component: OrderOptionsActionSheetComponent,
      cssClass,
      componentProps: {
        orderTypes,
        footerButtonName,
        merchantId,
        storeAddress,
        settings,
        timeZone,
      },
    });
    modal.onDidDismiss().then(({ data }) => {
      if (data) {
        this.cartService.setActiveMerchantsMenuByOrderOptions(data.dueTime, data.orderType, data.address, data.isASAP);
        this.validateOrder(() => {
          const dueTimeErrorKey: keyof DueTimeErrorMessages = this.dueTimeTypeError;
          this.dueTimeFormControl.setErrors({ [dueTimeErrorKey]: false });
          this.dueTimeHasErrors = false;
          this.cdRef.detectChanges();
          this.loadingService.closeSpinner();
        }, (error) => this.toastService.showError(error));
      }
    });
    await modal.present();
  }

  private async validateOrder(
    successCb: FunctionStringCallback,
    errorCB?: FunctionStringCallback,
    ignoreCodes?: string[]
  ): Promise<void> {
    await this.loadingService.showSpinner();
    await this.cartService
      .validateOrder()
      .pipe(first(), handleServerError(ORDER_VALIDATION_ERRORS, ignoreCodes))
      .toPromise()
      .then(() => {
        this.cartService.cartsErrorMessage = null;
        return successCb && successCb(null);
      })
      .catch((error: Array<string> | string) => {
        if (Array.isArray(error) && IGNORE_ERRORS.includes(error[0])) {
          this.cartService.cartsErrorMessage = error[1];
        }
        return errorCB(error[1]);
      });
  }
}

export enum FORM_CONTROL_NAMES {
  dueTime = 'dueTime',
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

export interface PaymentMethodErrorMessages {
  required: string;
  paymentMethodFailed: string;
}

export interface DueTimeErrorMessages {
  pickUpTimeNotAvailable: string;
  deliveryTimeNotAvailable: string;
}
