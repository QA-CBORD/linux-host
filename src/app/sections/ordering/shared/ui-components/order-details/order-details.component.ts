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
import { Keyboard } from '@capacitor/keyboard';
import { UserFacadeService } from '@core/facades/user/user.facade.service';
import { UserAccount } from '@core/model/account/account.model';
import { AddressInfo } from '@core/model/address/address-info';
import { UserInfo } from '@core/model/user';
import { LoadingService } from '@core/service/loading/loading.service';
import { ModalsService } from '@core/service/modals/modals.service';
import {
  cvvValidationFn,
  formControlErrorDecorator,
  validateCurrency,
  validateGreaterOrEqualToZero,
  validateLessThanOther,
} from '@core/utils/general-helpers';
import { AlertController, IonSelect } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
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
  LOCAL_ROUTING,
  MerchantSettings,
  ORDERING_CONTENT_STRINGS,
  ORDER_ERROR_CODES,
  ORDER_TYPE,
  PAYMENT_SYSTEM_TYPE,
} from '@sections/ordering/ordering.config';
import { MerchantService } from '@sections/ordering/services';
import { OrderingComponentContentStrings, OrderingService } from '@sections/ordering/services/ordering.service';
import { DeliveryAddressesModalComponent } from '@sections/ordering/shared/ui-components/delivery-addresses.modal/delivery-addresses.modal.component';
import { checkPaymentFailed } from '@sections/ordering/utils/transaction-check';
import { APP_ROUTES } from '@sections/section.config';
import { AccessibilityService } from '@shared/accessibility/services/accessibility.service';
import { A11_TIMEOUTS } from '@shared/model/generic-constants';
import { NavigationService } from '@shared/services';
import { Observable, Subscription, firstValueFrom } from 'rxjs';
import { take } from 'rxjs/operators';
import { AccountType, DisplayName } from 'src/app/app.global';
import { Schedule } from '../order-options.action-sheet/order-options.action-sheet.component';
import {
  DateTimeSelected,
  StDateTimePickerComponent,
  TimePickerData,
} from '../st-date-time-picker/st-date-time-picker.component';
import { GlobalNavService } from '@shared/ui-components/st-global-navigation/services/global-nav.service';
import { parseBitBasedMerchantSetting } from '@core/utils/ordering-helpers';

export interface DueTimeFeedback {
  message: string;
  code: string;
  isFetching: boolean;
  type: 'info' | 'error';
}

@Component({
  selector: 'st-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderDetailsComponent implements OnInit, OnDestroy, OnChanges {
  @Input() set orderInfo(order: OrderInfo) {
    this.amountDue = order?.amountDue;
    this.tax = order?.tax;
    this.transactionId = order?.transactionId;
    this.deliveryFee = order?.deliveryFee;
    this.discount = order?.discount;
    this.mealBased = order?.mealBased;
    this.pickupFee = order?.pickupFee;
    this.orderItems = order?.orderItems;
    this.subTotal = order?.subTotal;
    this.tip = order?.tip;
    this.total = order?.total;
    this.orderPayment = order?.orderPayment;
    this.orderPaymentName = this.orderPayment?.[0]?.accountName || '';
    if (!this.readonly) {
      this.notes = order?.notes;
    }
  }

  @Input() set merchant(merchant: MerchantInfo) {
    this.merchantSettingsList = merchant?.settings?.list ?? [];
    this.orderTypes = merchant?.orderTypes;
    this.isWalkoutOrder = !!merchant?.walkout;
    this._merchant = merchant;
    this.isMerchantOrderAhead = parseInt(merchant?.settings?.map[MerchantSettings.orderAheadEnabled]?.value) === 1;
    this.isTipEnabled = parseInt(merchant?.settings?.map[MerchantSettings.tipEnabled]?.value) === 1;
    this.isMerchantAutoASAP = merchant?.settings?.map[MerchantSettings.enableAutoASAPSelection]?.value ? Boolean(JSON.parse(merchant?.settings?.map[MerchantSettings.enableAutoASAPSelection]?.value)) : false;
  }

  @Input() orderDetailOptions: OrderDetailOptions = {} as OrderDetailOptions;
  @Input() readonly = true;
  @Input() itemReadOnly = false;
  @Input() accInfoList: MerchantAccountInfoList = {} as MerchantAccountInfoList;
  @Input() orderTypes: MerchantOrderTypesInfo;
  @Input() accounts: UserAccount[] = [];
  @Input() addressModalConfig: AddressModalSettings;
  @Input() applePayEnabled: boolean;
  @Output() onFormChange: EventEmitter<OrderDetailsFormData> = new EventEmitter<OrderDetailsFormData>();
  @Output() onOrderItemRemovedId: EventEmitter<string> = new EventEmitter<string>();
  @Output() onErrorsDetected: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() onOrderItemClicked: EventEmitter<OrderItem> = new EventEmitter<OrderItem>();
  @Output() onOrderPaymentInfoChanged: EventEmitter<Partial<OrderPayment> | string> = new EventEmitter<
    Partial<OrderPayment> | string
  >();
  @Output() onOrderTipChanged: EventEmitter<number> = new EventEmitter<number>();
  @ViewChild('paymentMethod') selectRef: IonSelect;
  @Input() merchantTimeZoneDisplayingMessage: string;
  @Input() checkinInstructionMessage: string;
  @Input() isExistingOrder: boolean;
  @Input() enableTimeSelection: boolean;
  @Input() duetimeFeedback: DueTimeFeedback = {} as DueTimeFeedback;
  @Output() onDueTimeErrorClean: EventEmitter<void> = new EventEmitter<void>();
  @Output() onOrderTimeChange: EventEmitter<DateTimeSelected> = new EventEmitter<DateTimeSelected>();

  _merchant: MerchantInfo;
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
  isMerchantAutoASAP = false;
  isTipEnabled = false;
  showOrderNotesField = false;

  private readonly sourceSub = new Subscription();
  contentStrings: OrderingComponentContentStrings = <OrderingComponentContentStrings>{};
  detailsForm: FormGroup;
  showCVVControl = false;
  applePayAccountType: Partial<UserAccount> = {
    accountType: AccountType.APPLEPAY,
    accountDisplayName: DisplayName.APPLEPAY,
    isActive: true,
  };

  @ViewChild(StDateTimePickerComponent, { static: true }) child: StDateTimePickerComponent;
  orderSchedule$: Observable<Schedule>;
  orderOptionsData = {} as TimePickerData;

  readonly paymentMethodErrorMessages: PaymentMethodErrorMessages = {
    required: 'A payment method must be selected',
    paymentMethodFailed:
      'There was an issue processing the payment for this order. \nContact the merchant to resolve this issue.',
  };

  readonly dueTimeErrorMessages: DueTimeErrorMessages = {
    PickUpOrderTimeNotAvailable: this.translateService.instant('get_common.error.PickUpOrderTimeNotAvailable'),
    DeliveryOrderTimeNotAvailable: this.translateService.instant('get_common.error.DeliveryOrderTimeNotAvailable'),
    ItemsNotAvailable: this.translateService.instant('get_common.error.ItemsNotAvailable'),
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
    private readonly translateService: TranslateService,
    private readonly merchantService: MerchantService,
    private readonly alertController: AlertController,
    private readonly routingService: NavigationService,
    private readonly globalNavService: GlobalNavService
  ) {}

  ngOnInit() {
    this.initForm();
    this.initContentStrings();
    this.updateFormErrorsByContentStrings();
    this.setAccessoryBarVisible(true);
    this.setPhoneField();
    this.initAccountSelected();
    this.initTimePickerData();
    this.showEmptyCartAlertOnce();
  }

  async initTimePickerData() {
    this.loadingService.showSpinner();
    const isPickUp = this.orderDetailOptions.orderType == ORDER_TYPE.PICKUP;
    this.orderSchedule$ = this.merchantService.getMerchantOrderSchedule(
      this._merchant.id,
      isPickUp ? ORDER_TYPE.PICKUP : ORDER_TYPE.DELIVERY,
      this._merchant.timeZone
    );
    this.orderOptionsData.labelTime = isPickUp
      ? this.translateService.instant('label_pickup-time')
      : this.translateService.instant('label_delivery-time');
    this.loadingService.closeSpinner();
  }

  private initAccountSelected() {
    const payment = this.orderPayment?.length ? this.orderPayment[0] : { accountId: '', accountName: '' };
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

  ngOnChanges({ orderDetailOptions, duetimeFeedback }: SimpleChanges): void {
    if (orderDetailOptions && orderDetailOptions.currentValue === null) {
      this.orderDetailOptions = {} as OrderDetailOptions;
    }

    if (duetimeFeedback && duetimeFeedback.currentValue !== null) {
      this.markDueTieWithErrors();
    }
  }

  getDueTimeErrorKey() {
    const error = {
      [ORDER_ERROR_CODES.INVALID_ORDER]: ORDERING_CONTENT_STRINGS.menuItemsNotAvailable,
      [ORDER_ERROR_CODES.ORDER_CAPACITY]:
        this.orderDetailOptions.orderType === ORDER_TYPE.PICKUP
          ? ORDERING_CONTENT_STRINGS.pickUpOrderTimeNotAvailable
          : ORDERING_CONTENT_STRINGS.deliveryOrderTimeNotAvailable,
    }[this.duetimeFeedback.code] as keyof DueTimeErrorMessages;
    return error;
  }

  get hasInvalidItems() {
    return this.duetimeFeedback.type == 'error' && this.duetimeFeedback.code === ORDER_ERROR_CODES.INVALID_ORDER;
  }

  markDueTieWithErrors(): void {
    if (this.duetimeFeedback.type === 'error') {
      const dueTimeErrorKey = this.getDueTimeErrorKey();
      this.dueTimeFormControl.setValue('');
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
      return { ...this.orderDetailOptions, dueTime: new Date(String(this.orderDetailOptions.dueTime).slice(0, 19)) };
    }
  }

  trackByAccountId(i: number): string {
    return `${i}-${Math.random()}`;
  }

  goToItemDetails(orderItem: OrderItem, index: number) {
    if (this.duetimeFeedback.type === 'error') {
      return;
    }

    orderItem.selectedIndex = index;
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
      [FORM_CONTROL_NAMES.paymentMethod]: [{ value: '', disabled: this.isPaymentMethodDisabled }, Validators.required],
      [FORM_CONTROL_NAMES.note]: [this.notes],
      [FORM_CONTROL_NAMES.phone]: [''],
      [FORM_CONTROL_NAMES.dueTime]: [this.orderDetailOptions.dueTime, Validators.required],
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
    this.showOrderNotesField =
      !this.readonly &&
      !parseBitBasedMerchantSetting(this._merchant?.settings?.map[MerchantSettings.orderNotesDisabled]);
  }

  get isPaymentMethodDisabled() {
    return this.isExistingOrder && !this.isApplePayment;
  }

  get showASAP(): boolean {
    return this.duetimeFeedback.type === 'error' && this.orderDetailOptions.isASAP ? false : true;
  }

  get prepTime() {
    const time =
      {
        [ORDER_TYPE.PICKUP]: this.orderTypes.pickupPrepTime,
        [ORDER_TYPE.DELIVERY]: this.orderTypes.deliveryPrepTime,
      }[this.orderDetailOptions.orderType] || 0;
    return `(${time} min)`;
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
    this.markDueTieWithErrors();
    this.emitForm();
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
    if (this.paymentFormControl.value) {
      this.a11yService.isVoiceOverEnabled$.then(val => {
        if (val) {
          this.onModalDismiss();
        }
      });
    }
  }

  private get addressInfoFormControl(): AbstractControl {
    return this.detailsForm.get(FORM_CONTROL_NAMES.address);
  }

  private getVoiceOverInvalidText(detailsForm) {
    const errorMessages = {
      [FORM_CONTROL_NAMES.paymentMethod]: 'Button is disabled, please select a payment method.',
      [FORM_CONTROL_NAMES.phone]: 'Button is disabled, phone number is invalid.',
    };
    for (const controlName of Object.keys(errorMessages)) {
      if (!detailsForm.controls[controlName].valid) {
        return errorMessages[controlName];
      }
    }
    return '';
  }

  private subscribeOnFormChanges() {
    const sub = this.detailsForm.valueChanges.subscribe(() => this.emitForm());
    this.sourceSub.add(sub);
  }

  private emitForm() {
    this.onFormChange.emit({
      data: this.detailsForm.getRawValue(),
      valid: this.detailsForm.valid,
      voiceOverError: this.getVoiceOverInvalidText(this.detailsForm),
    });
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
    if (!this.isAddressClickable) return;
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
    this.contentStrings.selectAccount = this.orderingService.getContentStringByName(
      ORDERING_CONTENT_STRINGS.selectAccount
    );
    this.contentStrings.pickUpOrderTimeNotAvailable = this.orderingService.getContentErrorStringByName(
      ORDERING_CONTENT_STRINGS.pickUpOrderTimeNotAvailable
    );
    this.contentStrings.deliveryOrderTimeNotAvailable = this.orderingService.getContentErrorStringByName(
      ORDERING_CONTENT_STRINGS.deliveryOrderTimeNotAvailable
    );
    this.contentStrings.itemsNotAvailable = this.orderingService.getContentErrorStringByName(
      ORDERING_CONTENT_STRINGS.itemsNotAvailable
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

    this.dueTimeErrorMessages.PickUpOrderTimeNotAvailable = await firstValueFrom(
      this.contentStrings.pickUpOrderTimeNotAvailable.pipe(take(1))
    );
    this.dueTimeErrorMessages.DeliveryOrderTimeNotAvailable = await firstValueFrom(
      this.contentStrings.deliveryOrderTimeNotAvailable.pipe(take(1))
    );
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

  private showEmptyCartAlertOnce() {
    let dismissed = false;
    this.sourceSub.add(
      this.cartService.emptyOnClose$.subscribe(async () => {
        if (!dismissed) {
          dismissed = true;
          await this.emptyCart(this.translateService.instant('get_web_gui.shopping_cart.exit_confirmation'));
          dismissed = false;
        }
      })
    );
  }

  async changeOrderTime() {
    if (!this.enableTimeSelection) return;
    await this.initTimePickerData();
    setTimeout(async () => {
      await this.cartService.setActiveMerchant(this._merchant);
      await this.child.openPicker();
    }, A11_TIMEOUTS);
  }

  onEmptyCart() {
    this.emptyCart(this.translateService.instant('get_web_gui.shopping_cart.remove_message'));
  }

  async emptyCart(message: string) {
    const alert = await this.alertController.create({
      cssClass: 'alert_cart',
      message,
      buttons: [
        {
          text: this.translateService.instant('get_web_gui.shopping_cart.cancel'),
          role: 'cancel',
          cssClass: 'button__option_cancel',
          handler: () => {
            alert.dismiss();
          },
        },
        {
          text: this.translateService.instant('get_web_gui.shopping_cart.remove_items'),
          role: 'confirm',
          cssClass: 'button__option_confirm',
          handler: () => {
            this.cartService.clearActiveOrder();
            this.cartService.setActiveMerchantsMenuByOrderOptions(
              this.orderDetailOptions.dueTime,
              this.orderDetailOptions.orderType,
              this.orderDetailOptions.address,
              this.orderDetailOptions.isASAP
            );
            this.cleanDueTimeErrors();
            this.routingService.navigate([APP_ROUTES.ordering, LOCAL_ROUTING.fullMenu]);
          },
        },
      ],
    });

    await alert.present();
    return alert.onDidDismiss();
  }

  get userData$(): Observable<UserInfo> {
    return this.userFacadeService.getUserData$();
  }

  async onDateTimeSelected(dateTime: DateTimeSelected): Promise<void> {
    this.onOrderTimeChange.emit(dateTime);
    this.detailsForm.controls[FORM_CONTROL_NAMES.dueTime].setValue(dateTime);
    this.emitForm();
  }

  cleanDueTimeErrors() {
    const dueTimeErrorKey = this.getDueTimeErrorKey();
    this.dueTimeFormControl.setErrors({ [dueTimeErrorKey]: false });
    this.onDueTimeErrorClean.emit();
    this.duetimeFeedback = {} as DueTimeFeedback;
  }

  onSelectClick() {
    this.globalNavService.notifyBackdropShown();
  }

  onModalDismiss() {
    this.globalNavService.notifyBackdropHidden();
  }

  get timeNotEditable() {
    return !(this.isMerchantOrderAhead && this.enableTimeSelection) || this.isExistingOrder;
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
  voiceOverError: string;
}

export interface PaymentMethodErrorMessages {
  required: string;
  paymentMethodFailed: string;
}

export interface DueTimeErrorMessages {
  PickUpOrderTimeNotAvailable: string;
  DeliveryOrderTimeNotAvailable: string;
  ItemsNotAvailable: string;
}
