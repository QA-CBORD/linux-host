import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input, OnDestroy,
  OnInit,
  Output, SimpleChanges,
} from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BuildingInfo, OrderItem } from '@sections/ordering';
import { ORDER_TYPE } from "@sections/ordering/ordering.config";
import { AddressInfo } from "@core/model/address/address-info";
import { ModalController } from '@ionic/angular';
import { DeliveryAddressesModalComponent } from '@sections/ordering/shared/ui-components/delivery-addresses.modal/delivery-addresses.modal.component';
import { UserAccount } from '@core/model/account/account.model';
import { Subscription } from "rxjs";

@Component({
  selector: 'st-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
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
  @Input() accounts: UserAccount[] = [];
  @Input() addressModalConfig: AddressModalSettings;
  @Output() onFormChange: EventEmitter<OrderDetailsFormData> = new EventEmitter<OrderDetailsFormData>();
  @Output() onOrderItemRemovedId: EventEmitter<string> = new EventEmitter<string>();
  detailsForm: FormGroup;
  private readonly sourceSub = new Subscription();

  constructor(private readonly fb: FormBuilder,
              private readonly modalController: ModalController) { }

  ngOnInit() {
    this.initForm();
    console.log(this.address);
  }

  ngOnDestroy() {
    this.sourceSub.unsubscribe();
  }

  get controlsNames() {
    return DETAILS_FORM_CONTROL_NAMES;
  }

  get isAddressClickable(): boolean {
    if(!this.readonly && this.addressModalConfig && this.addressModalConfig.isOrderTypePickup) {
      return !!this.addressModalConfig.pickupLocations.length;
    } else {
      return !!this.addressModalConfig
    }
  }

  private get addressInfo(): AbstractControl {
    return this.detailsForm.get(DETAILS_FORM_CONTROL_NAMES.address);
  }

  private get orderItemsFormArray(): AbstractControl {
    return this.detailsForm.get(DETAILS_FORM_CONTROL_NAMES.orderItems);
  }

  onRemove(id: string) {
    this.onOrderItemRemovedId.emit(id);
    const index = (this.orderItemsFormArray as FormArray).controls.findIndex(({value}) => value === id);
    (this.orderItemsFormArray as FormArray).removeAt(index);
  }

  initForm() {
    this.detailsForm = this.fb.group(
      {
        [DETAILS_FORM_CONTROL_NAMES.address]: [this.address],
        [DETAILS_FORM_CONTROL_NAMES.orderItems]: this.getIngredients(),
        [DETAILS_FORM_CONTROL_NAMES.paymentMethod]: ['', Validators.required],
      }
    );
    this.subscribe()
  }

  private subscribe () {
    const sub = this.detailsForm.valueChanges
      .subscribe(data => {
        this.onFormChange.emit({ data, valid: this.detailsForm.valid })
      });
    this.sourceSub.add(sub);
  }

  private getIngredients() {
    return this.fb.array([
      ...this.orderItems.map(({menuItemId}) => this.fb.control(menuItemId))
    ], Validators.required)
  }

  test() {
    console.log(this.address);
  }

  private async showAddressListModal(): Promise<void> {

    const modal = await this.modalController.create({
      component: DeliveryAddressesModalComponent,
      componentProps: this.addressModalConfig,
    });
    modal.onDidDismiss().then(({ data }) => {
      this.addressInfo.setValue(data);
    });
    await modal.present();
  }

}

export enum DETAILS_FORM_CONTROL_NAMES {
  address = 'address',
  orderItems = 'orderItems',
  paymentMethod = 'paymentMethod',
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
    [DETAILS_FORM_CONTROL_NAMES.orderItems]: string[];
    [DETAILS_FORM_CONTROL_NAMES.paymentMethod]: UserAccount;
  };
  valid: boolean;
}
