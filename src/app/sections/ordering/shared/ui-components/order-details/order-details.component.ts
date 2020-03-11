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
} from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators, ValidatorFn } from '@angular/forms';
import {
  BuildingInfo,
  MerchantAccountInfoList,
  MerchantOrderTypesInfo,
  OrderDetailOptions,
  OrderItem,
  OrderPayment,
  MerchantSettingInfo,
} from '@sections/ordering';
import { PAYMENT_SYSTEM_TYPE, MerchantSettings } from '@sections/ordering/ordering.config';
import { AddressInfo } from '@core/model/address/address-info';
import { ModalController } from '@ionic/angular';
import { DeliveryAddressesModalComponent } from '@sections/ordering/shared/ui-components/delivery-addresses.modal/delivery-addresses.modal.component';
import { UserAccount } from '@core/model/account/account.model';
import { Subscription } from 'rxjs';
import { cvvValidationFn, formControlErrorDecorator, validateLessThanOther, validateGreaterOrEqualToZero, validateCurrency } from '@core/utils/general-helpers';
import { AccountType } from 'src/app/app.global';

@Component({
  selector: 'st-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderDetailsComponent implements OnInit, OnDestroy, OnChanges {
  @Input() orderDetailOptions: OrderDetailOptions;
  @Input() readonly: boolean = true;
  @Input() accInfoList: MerchantAccountInfoList = {} as MerchantAccountInfoList;
  @Input() orderTypes: MerchantOrderTypesInfo;
  @Input() orderItems: OrderItem[] = [];
  @Input() paymentMethod: any = [];
  @Input() tax: number;
  @Input() discount: number;
  @Input() total: number;
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

  detailsForm: FormGroup;
  private readonly sourceSub = new Subscription();
  showCVVControl = false;
  applePayAccountType: Partial<UserAccount> = {
    accountType: AccountType.APPLEPAY,
    accountDisplayName: 'Apple Pay',
    isActive: true,
  };

  constructor(private readonly fb: FormBuilder, private readonly modalController: ModalController) {}

  ngOnInit() {
    this.initForm();
  }

  ngOnDestroy() {
    this.sourceSub.unsubscribe();
  }

  ngOnChanges({ orderDetailOptions }: SimpleChanges): void {
    if (orderDetailOptions && orderDetailOptions.currentValue === null) {
      this.orderDetailOptions = {} as OrderDetailOptions;
    }
  }

  get controlsNames() {
    return DETAILS_FORM_CONTROL_NAMES;
  }

  get isAddressClickable(): boolean {
    if (!this.readonly && this.addressModalConfig && this.addressModalConfig.isOrderTypePickup) {
      return !!this.addressModalConfig.pickupLocations.length;
    } else {
      return !!this.addressModalConfig;
    }
  }

  get timeWithoutTimezone() {
    if (this.orderDetailOptions.dueTime instanceof Date) {
      return this.orderDetailOptions;
    }
    return { ...this.orderDetailOptions, dueTime: new Date((<string>this.orderDetailOptions.dueTime).slice(0, 19)) };
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

  initForm() {
    this.detailsForm = this.fb.group({
      [DETAILS_FORM_CONTROL_NAMES.address]: [this.orderDetailOptions.address],
      [DETAILS_FORM_CONTROL_NAMES.paymentMethod]: ['', Validators.required],
      [DETAILS_FORM_CONTROL_NAMES.note]: [''],
    });


    if (this.isTipEnabled) {
      const tipErrors = [
        formControlErrorDecorator(validateLessThanOther(this.subTotal), CONTROL_ERROR[DETAILS_FORM_CONTROL_NAMES.tip].subtotal),
        formControlErrorDecorator(validateCurrency, CONTROL_ERROR[DETAILS_FORM_CONTROL_NAMES.tip].currency),
        formControlErrorDecorator(validateGreaterOrEqualToZero, CONTROL_ERROR[DETAILS_FORM_CONTROL_NAMES.tip].min),
      ];

      this.detailsForm.addControl(DETAILS_FORM_CONTROL_NAMES.tip, this.fb.control(this.tip ? this.tip : ''));
      this.detailsForm.controls[DETAILS_FORM_CONTROL_NAMES.tip].setValidators(tipErrors);
    }
    this.subscribeOnFormChanges();
  }

  onTipChanged({ detail: { value } }) {
    if(!this.tipFormControl.valid) return;
    this.onOrderTipChanged.emit(value ? Number(value) : 0);
  }

  onPaymentChanged({ detail: { value } }) {
    const { id, paymentSystemType } = value;

    if (value instanceof Object) {
      this.onOrderPaymentInfoChanged.emit({ accountId: id, paymentSystemType });
    } else {
      this.onOrderPaymentInfoChanged.emit(value);
      this.detailsForm.get(this.controlsNames.paymentMethod).reset();
    }

    if (paymentSystemType === PAYMENT_SYSTEM_TYPE.MONETRA) {
      this.addCvvControl();
    } else {
      this.removeCvvControl();
    }
  }

  get paymentFormControl(): AbstractControl {
    return this.detailsForm.get(DETAILS_FORM_CONTROL_NAMES.paymentMethod);
  }

  get tipFormControl(): AbstractControl {
    return this.detailsForm.get(DETAILS_FORM_CONTROL_NAMES.tip);
  }

  get cvvFormControl(): AbstractControl {
    return this.detailsForm.get(DETAILS_FORM_CONTROL_NAMES.cvv);
  }

  private get addressInfoFormControl(): AbstractControl {
    return this.detailsForm.get(DETAILS_FORM_CONTROL_NAMES.address);
  }

  private subscribeOnFormChanges() {
    const sub = this.detailsForm.valueChanges.subscribe(data => {
      this.onFormChange.emit({ data, valid: this.detailsForm.valid });
    });
    this.sourceSub.add(sub);
  }

  private addCvvControl() {
    this.showCVVControl = true;
    this.detailsForm.addControl(
      DETAILS_FORM_CONTROL_NAMES.cvv,
      this.fb.control('', [Validators.required, cvvValidationFn])
    );
  }

  private removeCvvControl() {
    this.showCVVControl = false;
    this.detailsForm.removeControl(DETAILS_FORM_CONTROL_NAMES.cvv);
  }

  private async showAddressListModal(): Promise<void> {
    const modal = await this.modalController.create({
      component: DeliveryAddressesModalComponent,
      componentProps: this.addressModalConfig,
    });
    modal.onDidDismiss().then(({ data }) => {
      data && this.addressInfoFormControl.setValue(data);
    });
    await modal.present();
  }

}

export enum DETAILS_FORM_CONTROL_NAMES {
  address = 'address',
  paymentMethod = 'paymentMethod',
  cvv = 'cvv',
  tip = 'tip',
  note = 'note'
}

export const CONTROL_ERROR = {
  [DETAILS_FORM_CONTROL_NAMES.tip]: {
    min: 'Tip must be greater than zero',
    currency: 'Invalid format',
    subtotal: 'Tip must be less than the Subtotal amount',
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
    [DETAILS_FORM_CONTROL_NAMES.address]: BuildingInfo;
    [DETAILS_FORM_CONTROL_NAMES.paymentMethod]: UserAccount;
    [DETAILS_FORM_CONTROL_NAMES.note]: string;
  };
  valid: boolean;
}

