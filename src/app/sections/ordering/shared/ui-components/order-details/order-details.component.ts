import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input, OnChanges, OnDestroy,
  OnInit,
  Output, SimpleChanges,
} from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { BuildingInfo, OrderItem } from '@sections/ordering';
import { ORDER_TYPE, PAYMENT_SYSTEM_TYPE } from '@sections/ordering/ordering.config';
import { AddressInfo } from '@core/model/address/address-info';
import { ModalController } from '@ionic/angular';
import { DeliveryAddressesModalComponent } from '@sections/ordering/shared/ui-components/delivery-addresses.modal/delivery-addresses.modal.component';
import { UserAccount } from '@core/model/account/account.model';
import { Subscription } from 'rxjs';
import { Variable } from '@angular/compiler/src/render3/r3_ast';
import { PAYMENT_TYPE } from '@sections/accounts/accounts.config';
import { cvvValidationFn } from '@core/utils/general-helpers';

@Component({
  selector: 'st-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderDetailsComponent implements OnInit, OnDestroy {
  @Input() address: any;
  @Input() readonly: boolean = true;
  @Input() time: any = [];
  @Input() type: ORDER_TYPE;
  @Input() orderItems: OrderItem[] = [];
  @Input() paymentMethod: any = [];
  @Input() tax: number;
  @Input() total: number;
  @Input() orderPaymentName: string;
  @Input() deliveryFee: number;
  @Input() pickupFee: number;
  @Input() subTotal: number;
  @Input() tip: number;
  @Input() accountName: string;
  @Input() mealBased: boolean;
  @Input() accounts: UserAccount[] = [];
  @Input() addressModalConfig: AddressModalSettings;
  @Output() onFormChange: EventEmitter<OrderDetailsFormData> = new EventEmitter<OrderDetailsFormData>();
  @Output() onOrderItemRemovedId: EventEmitter<string> = new EventEmitter<string>();
  @Output() onOrderItemClicked: EventEmitter<OrderItem> = new EventEmitter<OrderItem>();
  detailsForm: FormGroup;
  private readonly sourceSub = new Subscription();
  showCVVControl = false;

  constructor(private readonly fb: FormBuilder,
              private readonly modalController: ModalController) {
  }

  ngOnInit() {
    this.initForm();
  }

  ngOnDestroy() {
    this.sourceSub.unsubscribe();
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

  goToItemDetails(orderItem) {
    this.onOrderItemClicked.emit(orderItem);
  }
  
  onRemoveOrderItem(id: string) {
    this.onOrderItemRemovedId.emit(id);
  }

  initForm() {
    this.detailsForm = this.fb.group(
      {
        [DETAILS_FORM_CONTROL_NAMES.address]: [this.address],
        [DETAILS_FORM_CONTROL_NAMES.paymentMethod]: ['', Validators.required],
      },
    );
    this.subscribeOnFormChanges();
  }

  toggleCvvControl({ detail: { value } }) {
    if (value.paymentSystemType === PAYMENT_SYSTEM_TYPE.MONETRA) {
      this.addCvvControl();
    } else {
      this.removeCvvControl();
    }
  }

  get cvvFormControl(): AbstractControl {
    return this.detailsForm.get(DETAILS_FORM_CONTROL_NAMES.cvv);
  }

  private get addressInfoFormControl(): AbstractControl {
    return this.detailsForm.get(DETAILS_FORM_CONTROL_NAMES.address);
  }

  private subscribeOnFormChanges() {
    const sub = this.detailsForm.valueChanges
      .subscribe(data => {
        this.onFormChange.emit({ data, valid: this.detailsForm.valid });
      });
    this.sourceSub.add(sub);
  }

  private addCvvControl() {
    this.showCVVControl = true;
    this.detailsForm.addControl(
      DETAILS_FORM_CONTROL_NAMES.cvv,
      this.fb.control('', [
        Validators.required,
        cvvValidationFn,
      ]),
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
      data && (this.addressInfoFormControl.setValue(data));
    });
    await modal.present();
  }
}

export enum DETAILS_FORM_CONTROL_NAMES {
  address = 'address',
  paymentMethod = 'paymentMethod',
  cvv = 'cvv',
}

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
  };
  valid: boolean;
}

