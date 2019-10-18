import { MerchantService } from '@sections/ordering/services';
import { BuildingInfo } from './../../models/building-info.model';
import { Component, OnInit, Input, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { MerchantOrderTypesInfo } from '../../models';
import { ModalController, ToastController } from '@ionic/angular';
import { DeliveryAddressesModalComponent } from '../delivery-addresses.modal/delivery-addresses.modal.component';
import { AddressInfo } from '@core/model/address/address-info';
import { zip, of } from 'rxjs';
import { take } from 'rxjs/operators';
import { LoadingService } from '@core/service/loading/loading.service';
import { ORDER_TYPE, MerchantSettings } from '@sections/ordering/ordering.config';

@Component({
  selector: 'st-order-options.action-sheet',
  templateUrl: './order-options.action-sheet.component.html',
  styleUrls: ['./order-options.action-sheet.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderOptionsActionSheetComponent implements OnInit {
  @Input() orderTypes: MerchantOrderTypesInfo;
  @Input() footerButtonName: string;
  @Input() merchantId: string;
  @Input() storeAddress: AddressInfo;
  @Input() settings: any;

  isOrderTypePickup: boolean;
  orderOptionsData: OrderOptions;
  deliveryAddresses: AddressInfo[];
  defaultDeliveryAddress: string;
  schedule: any;
  defaultPickupAddress: AddressInfo | '';
  pickupLocations: any;
  buildingsForNewAddressForm: BuildingInfo[];
  isTimeDisable: number;
  state;

  constructor(
    private readonly modalController: ModalController,
    private readonly merchantService: MerchantService,
    private readonly cdRef: ChangeDetectorRef,
    private readonly loadingService: LoadingService,
    private readonly toastController: ToastController
  ) { }

  ngOnInit() {
    this.initData();
  }

  initData() {
    const orderType =
      (this.orderTypes.delivery && this.orderTypes.pickup) || this.orderTypes.pickup ? ORDER_TYPE.PICKUP : ORDER_TYPE.DELIVERY;

    this.loadingService.showSpinner();
    this.state = zip(
      this.merchantService.getMerchantOrderSchedule(this.merchantId, orderType),
      this.retrieveDeliveryAddresses(this.settings.map[MerchantSettings.deliveryAddressRestriction]),
      this.retrievePickupLocations(this.storeAddress, this.settings.map[MerchantSettings.pickupLocationsEnabled]),
      this.merchantService.retrieveBuildings()
    )
      .pipe(take(1))
      .subscribe(
        ([schedule, [deliveryAddress, deliveryLocations], pickupLocations, buildingsForNewAddressForm]) => {
          this.loadingService.closeSpinner();
          const isTimeDisable = parseInt(this.settings.map[MerchantSettings.orderAheadEnabled].value);
          const defaultPickupAddress = JSON.parse(this.settings.map[MerchantSettings.pickupLocationsEnabled].value) ? '' : this.storeAddress;

          this.deliveryAddresses = deliveryLocations;
          this.defaultDeliveryAddress = deliveryAddress.defaultAddress;
          this.schedule = schedule;
          this.defaultPickupAddress = defaultPickupAddress;
          this.pickupLocations = pickupLocations;
          this.buildingsForNewAddressForm = buildingsForNewAddressForm;
          this.isTimeDisable = isTimeDisable;

          this.isOrderTypePickup = this.orderTypes.pickup;
          this.defineOrderOptionsData(this.isOrderTypePickup);
        },
        () => this.loadingService.closeSpinner()
      );
  }

  onRadioGroupChanged({ target }) {
    this.isOrderTypePickup = target.value === 'pickup';
    this.defineOrderOptionsData(this.isOrderTypePickup);
  }

  openDeliveryAddressesModal() {
    this.modalWindow();
  }

  defineOrderOptionsData(isOrderTypePickup) {
    if (!this.deliveryAddresses || !this.pickupLocations) return;
    const defineDeliveryAddress = this.deliveryAddresses.find(item => item.id === this.defaultDeliveryAddress);

    if (isOrderTypePickup) {
      this.orderOptionsData = { label: 'PICKUP', address: this.defaultPickupAddress, isClickble: this.pickupLocations.length };
    } else {
      this.orderOptionsData = {
        label: 'DELIVERY',
        address: defineDeliveryAddress,
        isClickble: 1
      }
    }

    this.cdRef.detectChanges();
  }

  onSubmit() {
    if (this.orderOptionsData.label === 'DELIVERY') {
      const { latitude, longitude } = this.orderOptionsData.address;
      this.merchantService.isOutsideMerchantDeliveryArea(this.merchantId, latitude, longitude)
        .subscribe(res => {
          if (!res) {
            this.onToastDisplayed('Delivery address is too far away');
          }
        })

    }
    // this.merchantService.getMerchantPaymentAccounts(this.merchantId)
  }

  private retrievePickupLocations(storeAddress, { value }) {
    switch (value) {
      case null:
        return of([]);
      case 'true':
        return this.merchantService.retrievePickupLocations();
      case 'false':
        return of([storeAddress]);
    }
  }

  private async onToastDisplayed(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 3000,
      position: 'bottom',
      closeButtonText: 'DISMISS',
      showCloseButton: true,
    });
    toast.present();
  }

  private retrieveDeliveryAddresses(setting) {
    return this.merchantService.retrieveDeliveryAddresses(setting);
  }

  private async modalWindow() {
    const defaultAddress = this.orderOptionsData.address;

    const modal = await this.modalController.create({
      component: DeliveryAddressesModalComponent,
      componentProps: {
        defaultAddress,
        buildings: this.buildingsForNewAddressForm,
        isOrderTypePickup: this.isOrderTypePickup,
        pickupLocations: this.pickupLocations,
        deliveryAddresses: this.deliveryAddresses,
        deliveryAddressRestriction: this.settings.map[MerchantSettings.deliveryAddressRestriction]
      },

    });
    modal.onDidDismiss().then(({ data }) => {
      if (data) {
        this.orderOptionsData = { ...this.orderOptionsData, address: data };
        this.cdRef.detectChanges();
      }
    });
    await modal.present();
  }
}

interface OrderOptions {
  label: string,
  address: any,
  isClickble: number
}