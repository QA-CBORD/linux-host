import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input, OnChanges,
  OnInit,
  Output, SimpleChanges,
} from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { BuildingInfo, OrderItem } from '@sections/ordering';
import { ORDER_TYPE } from "@sections/ordering/ordering.config";
import { AddressInfo } from "@core/model/address/address-info";
import { ModalController } from '@ionic/angular';
import { DeliveryAddressesModalComponent } from '@sections/ordering/shared/ui-components/delivery-addresses.modal/delivery-addresses.modal.component';

@Component({
  selector: 'st-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderDetailsComponent implements OnInit {
  @Input() address: string;
  @Input() readonly: boolean = true;
  @Input() time: any = [];
  @Input() type: ORDER_TYPE;
  @Input() ingredients: OrderItem[] = [];
  @Input() paymentMethod: any = [];
  @Input() tax: number;
  @Input() total: number;
  @Input() deliveryFee: number;
  @Input() pickupFee: number;
  @Input() subTotal: number;
  @Input() tip: number;
  @Input() accountName: string;
  @Input() addressModalConfig: AddressModalSettings;
  @Output() onFormChange: EventEmitter<any> = new EventEmitter<any>();
  detailsForm: FormGroup;

  constructor(private readonly fb: FormBuilder,
              private readonly modalController: ModalController) { }

  ngOnInit() {
    this.initForm();
  }

  get controlsNames() {
    return DETAILS_FORM_CONTROL_NAMES;
  }

  get isAddressClickable(): boolean {
    if(this.addressModalConfig && this.addressModalConfig.isOrderTypePickup) {
      return !!this.addressModalConfig.pickupLocations.length;
    } else {
      return !!this.addressModalConfig
    }
  }

  private get addressInfo(): AbstractControl {
    return this.detailsForm.get(DETAILS_FORM_CONTROL_NAMES.address);
  }

  onRemove($event: MouseEvent) {
    console.log($event)
  }

  initForm() {
    this.detailsForm = this.fb.group(
      {
        [DETAILS_FORM_CONTROL_NAMES.time]: [''],
        [DETAILS_FORM_CONTROL_NAMES.address]: [''],
        [DETAILS_FORM_CONTROL_NAMES.ingredients]: this.getIngredients(),
        [DETAILS_FORM_CONTROL_NAMES.paymentMethod]: [''],
      }
    );
    this.subscribe()
  }

  private subscribe () {
    this.detailsForm.valueChanges
      .subscribe(data => {
        this.onFormChange.emit({ data, valid: this.detailsForm.valid })
      })
  }

  private getIngredients() {
    return this.fb.array([
      ...this.ingredients.map((v) => this.fb.control(v))
    ])
  }

  test() {
    console.log(this.detailsForm)
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
  time = 'time',
  address = 'address',
  ingredients = 'ingredients',
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
