import { MerchantService } from '@sections/ordering/services';
import { BuildingInfo } from './../../models/building-info.model';
import { Component, OnInit, Input, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { MerchantOrderTypesInfo, MenuInfo, MerchantAccountInfoList } from '../../models';
import { ModalController, ToastController } from '@ionic/angular';
import { DeliveryAddressesModalComponent } from '../delivery-addresses.modal/delivery-addresses.modal.component';
import { AddressInfo } from '@core/model/address/address-info';
import { zip, of, throwError, Observable } from 'rxjs';
import { take, switchMap } from 'rxjs/operators';
import { LoadingService } from '@core/service/loading/loading.service';
import { ORDER_TYPE, MerchantSettings, ACCOUNT_TYPES } from '@sections/ordering/ordering.config';

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
  dateTimePicker: Date | string = 'ASAP';
  state;
  orderType: number;

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
    this.orderType =
      (this.orderTypes.delivery && this.orderTypes.pickup) || this.orderTypes.pickup
        ? ORDER_TYPE.PICKUP
        : ORDER_TYPE.DELIVERY;

    this.loadingService.showSpinner();
    this.state = zip(
      this.merchantService.getMerchantOrderSchedule(this.merchantId, this.orderType),
      this.retrieveDeliveryAddresses(this.merchantId),
      this.retrievePickupLocations(this.storeAddress, this.settings.map[MerchantSettings.pickupLocationsEnabled]),
      this.merchantService.retrieveBuildings()
    )
      .pipe(take(1))
      .subscribe(
        ([schedule, [deliveryAddress, deliveryLocations], pickupLocations, buildingsForNewAddressForm]) => {
          this.loadingService.closeSpinner();
          const isTimeDisable = parseInt(this.settings.map[MerchantSettings.orderAheadEnabled].value);
          const defaultPickupAddress = JSON.parse(this.settings.map[MerchantSettings.pickupLocationsEnabled].value)
            ? ''
            : this.storeAddress;

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
      this.orderOptionsData = {
        label: 'PICKUP',
        address: this.defaultPickupAddress,
        isClickble: this.pickupLocations.length,
      };
    } else {
      this.orderOptionsData = {
        label: 'DELIVERY',
        address: defineDeliveryAddress,
        isClickble: 1,
      };
    }

    this.cdRef.detectChanges();
  }

  onDateTimeSelected(event) {
    this.dateTimePicker = event;
    this.merchantService.pickerDateTime = event;
    this.cdRef.detectChanges();
  }

  onSubmit() {
    if (!this.merchantService.pickerDateTime) {
      let dateTime = new Date();
      this.merchantService.pickerDateTime = dateTime;
    }

    let isOutsideMerchantDeliveryArea = of(false);
    if (this.orderOptionsData.label === 'DELIVERY') {
      const { latitude, longitude } = this.orderOptionsData.address;
      isOutsideMerchantDeliveryArea = this.merchantService.isOutsideMerchantDeliveryArea(
        this.merchantId,
        latitude,
        longitude
      );
    }
    isOutsideMerchantDeliveryArea
      .pipe(
        switchMap(
          (isOutside): Observable<MerchantAccountInfoList> => {
            if (isOutside) {
              return throwError(new Error('Delivery address is too far away'));
            }

            return this.merchantService.getMerchantPaymentAccounts(this.merchantId);
          }
        ),
        switchMap(
          (paymentAccounts): Observable<MenuInfo> => {
            if (!paymentAccounts.accounts.length) {
              return throwError(new Error("You don't have payment accounts"));
            }
            const pickerTime = this.merchantService.pickerTime;
            return this.merchantService.getDisplayMenu(this.merchantId, pickerTime, this.orderType);
          }
        ),
        switchMap(
          ({ mealBased }): Observable<boolean> => {
            if (!mealBased) {
              return of(true);
            }

            return this.merchantService.getUserAccounts().pipe(
              switchMap(
                (accounts): any => {
                  const isSomeAccMealBased = accounts.some(({ accountType }) => accountType === ACCOUNT_TYPES.meals);
                  if (!isSomeAccMealBased) {
                    return throwError(new Error("You don't have meal based accounts"));
                  }

                  return of(isSomeAccMealBased);
                }
              )
            );
          }
        ),
        take(1)
      )
      .subscribe(
        paymentAccounts => {
          console.log(paymentAccounts);
        },
        err => this.onToastDisplayed(err)
      );
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

  private retrieveDeliveryAddresses(merchantId) {
    return this.merchantService.retrieveDeliveryAddresses(merchantId);
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
        merchantId: this.merchantId
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
  label: string;
  address: any;
  isClickble: number;
}
