import { MerchantService, CartService } from '@sections/ordering/services';
import { BuildingInfo } from './../../models/building-info.model';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { MenuInfo, MerchantAccountInfoList, MerchantOrderTypesInfo } from '../../models';
import { ModalController, ToastController } from '@ionic/angular';
import { DeliveryAddressesModalComponent } from '../delivery-addresses.modal/delivery-addresses.modal.component';
import { AddressInfo } from '@core/model/address/address-info';
import { Observable, of, throwError, zip } from 'rxjs';
import { switchMap, take, tap } from 'rxjs/operators';
import { LoadingService } from '@core/service/loading/loading.service';
import { ACCOUNT_TYPES, MerchantSettings, ORDER_TYPE } from '@sections/ordering/ordering.config';
import { BUTTON_TYPE } from '@core/utils/buttons.config';
import { UserService } from '@core/service/user-service/user.service';
import { getDateTimeInGMT } from '@core/utils/date-helper';

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
  @Input() activeDeliveryAddressId: string;
  @Input() activeOrderType: ORDER_TYPE = null;

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
  orderType: number;

  constructor(
    private readonly modalController: ModalController,
    private readonly merchantService: MerchantService,
    private readonly cdRef: ChangeDetectorRef,
    private readonly loadingService: LoadingService,
    private readonly toastController: ToastController,
    private readonly cartService: CartService
  ) {}

  get enumOrderTypes() {
    return ORDER_TYPE;
  }

  ngOnInit() {
    this.initData();
  }

  initData() {
    this.orderType =
      this.activeOrderType !== null
        ? this.activeOrderType
        : this.orderTypes.pickup
        ? ORDER_TYPE.PICKUP
        : ORDER_TYPE.DELIVERY;

    this.loadingService.showSpinner();
    zip(
      this.merchantService.getMerchantOrderSchedule(this.merchantId, this.orderType),
      this.retrieveDeliveryAddresses(this.merchantId),
      this.merchantService.retrievePickupLocations(
        this.storeAddress,
        this.settings.map[MerchantSettings.pickupLocationsEnabled]
      ),
      this.merchantService.retrieveBuildings()
    )
      .pipe(take(1))
      .subscribe(
        ([schedule, [deliveryAddress, deliveryLocations], pickupLocations, buildingsForNewAddressForm]) => {
          const isTimeDisable = parseInt(this.settings.map[MerchantSettings.orderAheadEnabled].value);
          const defaultPickupAddress = JSON.parse(this.settings.map[MerchantSettings.pickupLocationsEnabled].value)
            ? ''
            : this.storeAddress;

          this.deliveryAddresses = deliveryLocations;
          this.defaultDeliveryAddress = this.activeDeliveryAddressId
            ? this.activeDeliveryAddressId
            : deliveryAddress.defaultAddress;
          this.schedule = schedule;
          this.defaultPickupAddress = defaultPickupAddress;
          this.pickupLocations = pickupLocations;
          this.buildingsForNewAddressForm = buildingsForNewAddressForm;
          this.isTimeDisable = isTimeDisable;

          this.isOrderTypePickup = this.orderType === ORDER_TYPE.PICKUP;
          this.defineOrderOptionsData(this.isOrderTypePickup);
        },
        null,
        () => this.loadingService.closeSpinner()
      );
  }

  onRadioGroupChanged({ target }) {
    this.isOrderTypePickup = target.value === 'pickup';
    this.orderType = this.isOrderTypePickup ? ORDER_TYPE.PICKUP : ORDER_TYPE.DELIVERY;
    this.defineOrderOptionsData(this.isOrderTypePickup);
  }

  openDeliveryAddressesModal() {
    this.modalWindow();
  }

  defineOrderOptionsData(isOrderTypePickup) {
    if (!this.deliveryAddresses || !this.pickupLocations) return;
    const defineDeliveryAddress = this.deliveryAddresses.find(({ id }) => id === this.defaultDeliveryAddress);

    this.orderOptionsData = {
        label: isOrderTypePickup ? 'PICKUP' : 'DELIVERY',
        address: isOrderTypePickup ? this.defaultPickupAddress : defineDeliveryAddress,
        isClickble: isOrderTypePickup ? this.pickupLocations.length : 1,
      }

    this.cdRef.detectChanges();
  }

  onDateTimeSelected(event) {
    this.dateTimePicker = event;
    this.cdRef.detectChanges();
  }

  onSubmit() {
    let date = { dueTime: this.dateTimePicker, isASAP: this.dateTimePicker === 'ASAP' };

    let isOutsideMerchantDeliveryArea = of(false);
    if (this.orderOptionsData.label === 'DELIVERY') {
      if (this.orderOptionsData.address) {
        isOutsideMerchantDeliveryArea = this.isOutsideMerchantDeliveryArea();
      } else {
        this.onToastDisplayed('Choose address please');
        return;
      }
    }
    this.loadingService.showSpinner();
    zip(isOutsideMerchantDeliveryArea, this.merchantService.getCurrentLocaleTime())
      .pipe(
        tap(([isOtside, dueTime]) => (date = date.isASAP ? { ...date, dueTime } : { ...date })),
        switchMap(([isOutside]): Observable<MerchantAccountInfoList> => this.getMerchantPaymentAccounts(isOutside)),
        switchMap(
          (paymentAccounts): Promise<MenuInfo | never> =>
            this.getDisplayMenu(paymentAccounts, this.merchantId, date.dueTime, this.orderType)
        ),
        switchMap(({ mealBased }): Observable<boolean> => this.isAccountsMealBased(mealBased)),
        take(1)
      )
      .subscribe(
        () =>
          this.modalController.dismiss(
            {
              address: this.orderOptionsData.address,
              orderType: this.orderType,
              dueTime: date.dueTime,
              isASAP: date.isASAP,
            },
            BUTTON_TYPE.CONTINUE
          ),
        err => this.onToastDisplayed(err),
        () => this.loadingService.closeSpinner()
      );
  }

  private isOutsideMerchantDeliveryArea(): Observable<boolean> {
    const { latitude, longitude } = this.orderOptionsData.address;
    return this.merchantService.isOutsideMerchantDeliveryArea(this.merchantId, latitude, longitude);
  }

  private getMerchantPaymentAccounts(isOutside): Observable<MerchantAccountInfoList> {
    if (isOutside) {
      return throwError(new Error('Delivery address is too far away'));
    }

    return this.merchantService.getMerchantPaymentAccounts(this.merchantId);
  }

  private async getDisplayMenu(
    paymentAccounts: MerchantAccountInfoList,
    id: string,
    dueTime: string | Date,
    type: number
  ): Promise<MenuInfo | never> {
    if (!paymentAccounts.accounts.length) {
      return Promise.reject(new Error("You don't have payment accounts"));
    }

    return this.cartService.getMerchantMenu(id, dueTime, type);
  }

  private isAccountsMealBased(mealBased: boolean): Observable<boolean> {
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

  private async onToastDisplayed(message: string): Promise<void> {
    const toast = await this.toastController.create({
      message,
      duration: 3000,
      position: 'bottom',
      closeButtonText: 'DISMISS',
      showCloseButton: true,
    });
    toast.present();
  }

  private retrieveDeliveryAddresses(merchantId: string) {
    return this.merchantService.retrieveDeliveryAddresses(merchantId);
  }

  private async modalWindow() {
    const defaultAddress = this.orderOptionsData.address;

    const modal = await this.modalController.create({
      component: DeliveryAddressesModalComponent,
      componentProps: {
        defaultAddress,
        isOrderTypePickup: this.isOrderTypePickup,
        buildings: this.buildingsForNewAddressForm,
        pickupLocations: this.pickupLocations,
        deliveryAddresses: this.deliveryAddresses,
        merchantId: this.merchantId,
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
