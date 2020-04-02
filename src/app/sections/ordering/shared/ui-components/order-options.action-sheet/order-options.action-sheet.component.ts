import { CartService, MerchantService } from '@sections/ordering/services';
import { BuildingInfo } from '@sections/ordering';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { MenuInfo, MerchantAccountInfoList, MerchantInfo, MerchantOrderTypesInfo } from '../../models';
import { ModalController, ToastController } from '@ionic/angular';
import { DeliveryAddressesModalComponent } from '../delivery-addresses.modal/delivery-addresses.modal.component';
import { AddressInfo } from '@core/model/address/address-info';
import { Observable, of, throwError, zip } from 'rxjs';
import { finalize, first, map, switchMap, take, tap } from 'rxjs/operators';
import { LoadingService } from '@core/service/loading/loading.service';
import {
  ACCOUNT_TYPES,
  MerchantSettings,
  ORDER_TYPE,
  ORDERING_CONTENT_STRINGS,
} from '@sections/ordering/ordering.config';
import { BUTTON_TYPE } from '@core/utils/buttons.config';
import { OrderingComponentContentStrings, OrderingService } from '@sections/ordering/services/ordering.service';
import { UserService } from '@core/service/user-service/user.service';
import { UserInfo } from '@core/model/user/user-info.model';

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

  activeMerchant$: Observable<MerchantInfo>;
  isOrderTypePickup: boolean;
  orderOptionsData: OrderOptions;
  deliveryAddresses: AddressInfo[];
  defaultDeliveryAddress: string;
  schedule: Schedule;
  defaultPickupAddress: AddressInfo | '';
  pickupLocations: any;
  buildingsForNewAddressForm: BuildingInfo[];
  isTimeDisable: number;
  dateTimePicker: Date | string;
  orderType: number;
  contentStrings: OrderingComponentContentStrings = <OrderingComponentContentStrings>{};

  constructor(
    private readonly modalController: ModalController,
    private readonly merchantService: MerchantService,
    private readonly cdRef: ChangeDetectorRef,
    private readonly loadingService: LoadingService,
    private readonly toastController: ToastController,
    private readonly cartService: CartService,
    private readonly orderingService: OrderingService,
    private readonly userService: UserService,
  ) {
  }

  ngOnInit() {
    this.initData();
    this.initContentStrings();
    this.activeMerchant$ = this.merchantService.menuMerchants$
      .pipe(map((merchants) => merchants.find(({ id }) => id === this.merchantId)));
  }

  get enumOrderTypes() {
    return ORDER_TYPE;
  }

  get userData$() : Observable<UserInfo>{
    return this.userService.userData;
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
        this.settings.map[MerchantSettings.pickupLocationsEnabled],
      ),
      this.merchantService.retrieveBuildings(),
      this.cartService.orderDetailsOptions$,
    )
      .pipe(take(1))
      .subscribe(
        ([schedule, [deliveryAddress, deliveryLocations], pickupLocations, buildingsForNewAddressForm, orderDetailsOptions]) => {
          const isTimeDisable = parseInt(this.settings.map[MerchantSettings.orderAheadEnabled].value);
          let defaultPickupAddress;
          if (orderDetailsOptions === null) {
            defaultPickupAddress = JSON.parse(this.settings.map[MerchantSettings.pickupLocationsEnabled].value)
              ? ''
              : this.storeAddress;
          } else {
            defaultPickupAddress = orderDetailsOptions.address;
          }

          this.deliveryAddresses = deliveryLocations;
          this.defaultDeliveryAddress = this.activeDeliveryAddressId
            ? this.activeDeliveryAddressId
            : deliveryAddress.defaultAddress;
          this.schedule = <unknown>schedule as Schedule;
          this.setDefaultTimeSlot();
          this.defaultPickupAddress = defaultPickupAddress;
          this.pickupLocations = pickupLocations;
          this.buildingsForNewAddressForm = buildingsForNewAddressForm;
          this.isTimeDisable = isTimeDisable;

          this.isOrderTypePickup = this.orderType === ORDER_TYPE.PICKUP;
          this.defineOrderOptionsData(this.isOrderTypePickup);
        },
        null,
        () => this.loadingService.closeSpinner(),
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

  async defineOrderOptionsData(isOrderTypePickup) {
    if (!this.deliveryAddresses || !this.pickupLocations) return;
    const defineDeliveryAddress = this.deliveryAddresses.find(({ id }) => id === this.defaultDeliveryAddress);

    const labelPickupTime = await this.contentStrings.labelPickupTime.pipe(first()).toPromise();
    const labelDeliveryTime = await this.contentStrings.labelDeliveryTime.pipe(first()).toPromise();
    const labelPickupAddress = await this.contentStrings.labelPickupAddress.pipe(first()).toPromise();
    const labelDeliveryAddress = await this.contentStrings.labelDeliveryAddress.pipe(first()).toPromise();

    this.orderOptionsData = {
      labelTime: isOrderTypePickup ? labelPickupTime : labelDeliveryTime,
      labelAddress: isOrderTypePickup ? labelPickupAddress : labelDeliveryAddress,
      address: isOrderTypePickup ? this.defaultPickupAddress : defineDeliveryAddress,
      isClickble: isOrderTypePickup ? this.pickupLocations.length : 1,
    };

    this.cdRef.detectChanges();
  }

  onDateTimeSelected(event) {
    this.dateTimePicker = event;
    this.cdRef.detectChanges();
  }

  async onSubmit() {
    let date = { dueTime: this.dateTimePicker, isASAP: this.dateTimePicker === 'ASAP' };
    const chooseAddressError = await this.contentStrings.formErrorChooseAddress.pipe(take(1)).toPromise();

    let isOutsideMerchantDeliveryArea = of(false);
    if (!this.orderOptionsData.address) {
      return this.onToastDisplayed(chooseAddressError);
    }
    const labelDeliveryAddress = await this.contentStrings.labelDeliveryAddress.pipe(first()).toPromise();
    if (this.orderOptionsData.labelAddress === labelDeliveryAddress) {
      isOutsideMerchantDeliveryArea = this.isOutsideMerchantDeliveryArea();
    }

    await this.loadingService.showSpinner();
    zip(isOutsideMerchantDeliveryArea, this.merchantService.getCurrentLocaleTime())
      .pipe(
        tap(([, dueTime]) => (date = date.isASAP ? { ...date, dueTime } : { ...date })),
        switchMap(([isOutside]): Observable<MerchantAccountInfoList> => this.getMerchantPaymentAccounts(isOutside)),
        switchMap(
          (paymentAccounts): Promise<MenuInfo | never> =>
            this.getDisplayMenu(paymentAccounts, this.merchantId, date.dueTime, this.orderType),
        ),
        switchMap(({ mealBased }): Observable<boolean | never> => this.isAccountsMealBased(mealBased)),
        take(1),
        finalize(() => this.loadingService.closeSpinner()),
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
            BUTTON_TYPE.CONTINUE,
          ),
        err => this.onToastDisplayed(err),
      );
  }

  private isOutsideMerchantDeliveryArea(): Observable<boolean> {
    const { latitude, longitude } = this.orderOptionsData.address;
    return this.merchantService.isOutsideMerchantDeliveryArea(this.merchantId, latitude, longitude);
  }

  private getMerchantPaymentAccounts(isOutside: boolean): Observable<MerchantAccountInfoList> {
    if (isOutside) {
      return throwError(new Error('Delivery address is too far away'));
    }

    return this.merchantService.getMerchantPaymentAccounts(this.merchantId);
  }

  private async getDisplayMenu(
    accountInfoList: MerchantAccountInfoList,
    id: string,
    dueTime: string | Date,
    type: number,
  ): Promise<MenuInfo | never> {
    if (!accountInfoList.accounts.length && !accountInfoList.creditAccepted) {
      return Promise.reject(new Error('You don\'t have payment accounts'));
    }

    return this.cartService.getMerchantMenu(id, dueTime, type);
  }

  private isAccountsMealBased(mealBased: boolean): Observable<boolean> {
    if (!mealBased) {
      return of(true);
    }

    return this.merchantService.getUserAccounts().pipe(
      switchMap(
        (accounts): Observable<boolean | never> => {
          const isSomeAccMealBased = accounts.some(({ accountType }) => accountType === ACCOUNT_TYPES.meals);
          return (!isSomeAccMealBased) ? throwError(new Error('You don\'t have meal based accounts')) : of(true);
        },
      ),
    );
  }

  private async setDefaultTimeSlot(): Promise<void> {
    const { openNow } = await this.activeMerchant$.pipe(take(1)).toPromise();
    if (openNow) {
      this.dateTimePicker = 'ASAP';
    } else {
      const firstDay = this.schedule.days[0].date;
      const [year, month, day] = firstDay.split('-');
      const { hour } = this.schedule.days[0].hourBlocks[0];
      const minutes = this.schedule.days[0].hourBlocks[0].minuteBlocks[0];
      this.dateTimePicker = new Date(Number(year), Number(month) - 1, Number(day), hour, minutes);
    }
  }

  private async onToastDisplayed(message: string): Promise<void> {
    const dismiss = await this.contentStrings.buttonDismiss.pipe(take(1)).toPromise();

    const toast = await this.toastController.create({
      message,
      duration: 3000,
      position: 'bottom',
      closeButtonText: dismiss.toUpperCase(),
      showCloseButton: true,
    });
    await toast.present();
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

  private initContentStrings() {
    this.contentStrings.buttonDismiss = this.orderingService.getContentStringByName(
      ORDERING_CONTENT_STRINGS.buttonDismiss,
    );
    this.contentStrings.formErrorChooseAddress = this.orderingService.getContentStringByName(
      ORDERING_CONTENT_STRINGS.formErrorChooseAddress,
    );
    this.contentStrings.labelPickupTime = this.orderingService.getContentStringByName(
      ORDERING_CONTENT_STRINGS.labelPickupTime,
    );
    this.contentStrings.labelDeliveryTime = this.orderingService.getContentStringByName(
      ORDERING_CONTENT_STRINGS.labelDeliveryTime,
    );
    this.contentStrings.labelDeliveryAddress = this.orderingService.getContentStringByName(
      ORDERING_CONTENT_STRINGS.labelDeliveryAddress,
    );
    this.contentStrings.labelPickupAddress = this.orderingService.getContentStringByName(
      ORDERING_CONTENT_STRINGS.labelPickupAddress,
    );
    this.contentStrings.labelPickup = this.orderingService.getContentStringByName(
      ORDERING_CONTENT_STRINGS.labelPickup,
    );
    this.contentStrings.labelDelivery = this.orderingService.getContentStringByName(
      ORDERING_CONTENT_STRINGS.labelDelivery,
    );
    this.contentStrings.labelOrderOptions = this.orderingService.getContentStringByName(
      ORDERING_CONTENT_STRINGS.labelOrderOptions,
    );
  }
}

interface OrderOptions {
  labelTime: string;
  labelAddress: string;
  address: any;
  isClickble: number;
}

export interface HourBlock {
  hour: number;
  minuteBlocks: number[];
}

export interface Day {
  date: string;
  dayOfWeek: number;
  hourBlocks: HourBlock[];
}

export interface MenuScheduleEntity {
  day: number;
  time: string;
  menuId: string;
}

export interface Schedule {
  days: Day[];
  menuSchedule: MenuScheduleEntity[];
}
