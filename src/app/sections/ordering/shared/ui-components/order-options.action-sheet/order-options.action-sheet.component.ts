import { CartService, MerchantService } from '@sections/ordering/services';
import { BuildingInfo } from '@sections/ordering';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import {
  MenuInfo,
  MerchantAccountInfoList,
  MerchantInfo,
  MerchantOrderTypesInfo,
  MerchantSettingInfo,
} from '../../models';
import { DeliveryAddressesModalComponent } from '../delivery-addresses.modal/delivery-addresses.modal.component';
import { AddressInfo } from '@core/model/address/address-info';
import { Observable, lastValueFrom, of, throwError, zip } from 'rxjs';
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
import { UserInfo } from '@core/model/user/user-info.model';
import { UserFacadeService } from '@core/facades/user/user.facade.service';
import { DateTimeSelected, StDateTimePickerComponent } from '../st-date-time-picker/st-date-time-picker.component';
import { ToastService } from '@core/service/toast/toast.service';
import { AccessibilityService } from '@shared/accessibility/services/accessibility.service';
import { AddressHeaderFormatPipe } from '@shared/pipes/address-header-format-pipe';
import { ModalsService } from '@core/service/modals/modals.service';
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
  @Input() settings: MerchantSettingInfo[];
  @Input() activeDeliveryAddressId: string;
  @Input() activeOrderType: ORDER_TYPE = null;
  @Input() showNavBarOnDestroy = true;
  @Input() timeZone: string;
  @ViewChild(StDateTimePickerComponent, { static: true }) child: StDateTimePickerComponent;
  dateTimeWithTimeZone: string;
  activeMerchant$: Observable<MerchantInfo>;
  merchantInfo: MerchantInfo;
  orderOptionsData: OrderOptions;
  deliveryAddresses: AddressInfo[];
  defaultDeliveryAddress: string;
  schedulePickup: Schedule;
  scheduleDelivery: Schedule;
  defaultPickupAddress: AddressInfo;
  pickupLocations: AddressInfo[];
  buildingsForNewAddressForm: BuildingInfo[];
  isTimeDisable: number;
  dateTimePicker: Date | string;
  orderType: number;
  contentStrings: OrderingComponentContentStrings = <OrderingComponentContentStrings>{};
  selectedTimeStamp: string | Date;
  optionsModalAriaHidden = false;
  orderOptionsModal: HTMLIonModalElement;

  constructor(
    private readonly modalsService: ModalsService,
    private readonly merchantService: MerchantService,
    private readonly cdRef: ChangeDetectorRef,
    private readonly loadingService: LoadingService,
    private readonly toastService: ToastService,
    private readonly cartService: CartService,
    private readonly orderingService: OrderingService,
    private readonly userFacadeService: UserFacadeService,
    private readonly a11yService: AccessibilityService,
    private readonly addressHeaderFormatPipe: AddressHeaderFormatPipe
  ) {}

  ngOnInit() {
    this.orderType =
      this.activeOrderType !== null
        ? this.activeOrderType
        : this.orderTypes.pickup
        ? ORDER_TYPE.PICKUP
        : ORDER_TYPE.DELIVERY;
    this.dispatchingData();
    this.initContentStrings();
    this.cartService.resetClientOrderId();
  }

  get isOrderTypePickup(): boolean {
    return this.orderType === ORDER_TYPE.PICKUP;
  }

  get enumOrderTypes() {
    return ORDER_TYPE;
  }

  get userData$(): Observable<UserInfo> {
    return this.userFacadeService.getUserData$();
  }

  get prepTime() {
    const time =
      {
        [this.enumOrderTypes.PICKUP]: this.orderTypes.pickupPrepTime,
        [this.enumOrderTypes.DELIVERY]: this.orderTypes.deliveryPrepTime,
      }[this.orderType] || 0;
    return `(${time} min)`;
  }

  dispatchingData() {
    this.loadingService.showSpinner();
    zip(
      this.merchantService.getMerchantOrderSchedule(this.merchantId, ORDER_TYPE.PICKUP, this.timeZone),
      this.merchantService.getMerchantOrderSchedule(this.merchantId, ORDER_TYPE.DELIVERY, this.timeZone),
      this.retrieveDeliveryAddresses(this.merchantId),
      this.merchantService.retrievePickupLocations(
        this.storeAddress,
        this.settings.map[MerchantSettings.pickupLocationsEnabled]
      ),
      this.merchantService.retrieveBuildings(),
      this.cartService.orderDetailsOptions$
    )
      .pipe(take(1))
      .subscribe(
        ([
          schedulePickup,
          scheduleDelivery,
          [deliveryAddress, deliveryLocations],
          pickupLocations,
          buildingsForNewAddressForm,
          orderDetailsOptions,
        ]) => {
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
          this.schedulePickup = (<unknown>schedulePickup) as Schedule;
          this.scheduleDelivery = (<unknown>scheduleDelivery) as Schedule;
          this.setDefaultTimeSlot();
          this.defaultPickupAddress = defaultPickupAddress;
          this.pickupLocations = pickupLocations;
          this.buildingsForNewAddressForm = buildingsForNewAddressForm;
          this.isTimeDisable = isTimeDisable;
          this.defineOrderOptionsData(this.isOrderTypePickup);
        },
        null,
        () => !this.loadingService.notLoading() && this.loadingService.closeSpinner()
      );

    this.activeMerchant$ = this.merchantService.menuMerchants$.pipe(
      map(merchants => merchants.find(({ id }) => id === this.merchantId)),
      tap(merchant => (this.merchantInfo = merchant))
    );
  }

  onRadioGroupChanged({ target }) {
    this.orderType = +target.value;
    this.dispatchingData();
    this.defineOrderOptionsData(this.isOrderTypePickup);
  }

  openDeliveryAddressesModal() {
    this.modalWindow();
  }

  async defineOrderOptionsData(isOrderTypePickup: boolean) {
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

  async callChildPicker(): Promise<void> {
    if (this.child.isTimeDisable) {
      this.child.openPicker();
      const element = document.getElementById('time_element');
      this.optionsModalAriaHidden = true;
      if (element) element.focus();
    }
  }

  onDateTimeSelected({ dateTimePicker, timeStamp }: DateTimeSelected): void {
    this.optionsModalAriaHidden = false;

    this.dateTimePicker = dateTimePicker;
    this.selectedTimeStamp = timeStamp;

    const element = document.getElementById('time_element');
    if (element) element.focus();

    this.cdRef.detectChanges();
  }

  async onSubmit(): Promise<void> {
    let date = { dueTime: this.selectedTimeStamp || this.dateTimePicker, isASAP: this.dateTimePicker === 'ASAP' };
    const chooseAddressError = await this.contentStrings.formErrorChooseAddress.pipe(take(1)).toPromise();
    this.cartService.orderIsAsap = date.isASAP;
    let isOutsideMerchantDeliveryArea = of(false);
    if (!this.orderOptionsData.address) {
      return this.onToastDisplayed(chooseAddressError);
    }
    const labelDeliveryAddress = await this.contentStrings.labelDeliveryAddress.pipe(first()).toPromise();
    if (this.orderOptionsData.labelAddress === labelDeliveryAddress) {
      isOutsideMerchantDeliveryArea = this.isOutsideMerchantDeliveryArea();
    }

    await this.loadingService.showSpinner();
    const currentTimeOb$ = this.merchantService
      .getCurrentLocaleTime(this.timeZone)
      .pipe(map(() => this.selectedTimeStamp));

    zip(isOutsideMerchantDeliveryArea, currentTimeOb$)
      .pipe(
        tap(([, dueTime]) => (date = date.isASAP ? { ...date, dueTime } : { ...date })),
        switchMap(([isOutside]): Observable<MerchantAccountInfoList> => this.getMerchantPaymentAccounts(isOutside)),
        switchMap(
          (paymentAccounts): Promise<MenuInfo | never> =>
            this.getDisplayMenu(paymentAccounts, this.merchantId, date.dueTime, this.orderType)
        ),
        switchMap(({ mealBased }): Observable<boolean | never> => this.isAccountsMealBased(mealBased)),
        take(1),
        finalize(() => this.loadingService.closeSpinner())
      )
      .subscribe(
        () => {
          this.orderOptionsModal.isOpen &&
            this.modalsService.dismiss(
              {
                address: this.orderOptionsData.address,
                orderType: this.orderType,
                dueTime: date.dueTime,
                isASAP: date.isASAP,
              },
              BUTTON_TYPE.CONTINUE
            );
        },
        err => {
          if (typeof err === 'object' && err.message) {
            this.onToastDisplayed(err.message);
          } else if (typeof err === 'string' && err) {
            this.onToastDisplayed(err);
          }
        }
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
    type: number
  ): Promise<MenuInfo | never> {
    if (!accountInfoList.accounts.length && !accountInfoList.creditAccepted) {
      const errorMessage = await lastValueFrom(this.contentStrings.noAvailableTenders.pipe(take(1)));
      this.toastService.showError(errorMessage, 5000, 'bottom');
      return Promise.reject();
    }

    return this.cartService.getMerchantMenu(id, dueTime, type);
  }

  private isAccountsMealBased(mealBased: boolean): Observable<boolean> {
    if (!mealBased) {
      return of(true);
    }

    return this.merchantService.getUserAccounts().pipe(
      switchMap((accounts): Observable<boolean | never> => {
        const isSomeAccMealBased = accounts.some(({ accountType }) => accountType === ACCOUNT_TYPES.meals);
        return !isSomeAccMealBased ? throwError(new Error("You don't have meal based accounts")) : of(true);
      })
    );
  }

  private async setDefaultTimeSlot(): Promise<void> {
    const { openNow } = await this.activeMerchant$.pipe(take(1)).toPromise();
    if (openNow) {
      this.dateTimePicker = 'ASAP';
    } else {
      const schedule = this.activeOrderType === ORDER_TYPE.PICKUP ? this.schedulePickup : this.scheduleDelivery;
      if (this.isMerchantDateUnavailable(schedule)) {
        return this.onMerchantDateUnavailable();
      }
      this.selectedTimeStamp = schedule.days[0].hourBlocks[0].timestamps[0];
      this.dateTimeWithTimeZone = this.cartService.extractTimeZonedString(this.selectedTimeStamp, this.timeZone);
      this.dateTimePicker = new Date(this.selectedTimeStamp);
    }
  }

  private async onToastDisplayed(message: string): Promise<void> {
    const dismiss = await this.contentStrings.buttonDismiss.pipe(take(1)).toPromise();
    await this.toastService.showToast({ message, toastButtons: [{ text: dismiss.toUpperCase() }], position: 'bottom' });
  }

  private retrieveDeliveryAddresses(merchantId: string) {
    return this.merchantService.retrieveDeliveryAddresses(merchantId);
  }

  private async modalWindow() {
    const defaultAddress = this.orderOptionsData.address;

    const modal = await this.modalsService.create({
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
        this.a11yService.readAloud(this.addressHeaderFormatPipe.transform(this.orderOptionsData.address));
      }
    });
    this.orderOptionsModal = modal;
    await modal.present();
  }

  private initContentStrings() {
    this.contentStrings.buttonDismiss = this.orderingService.getContentStringByName(
      ORDERING_CONTENT_STRINGS.buttonDismiss
    );
    this.contentStrings.formErrorChooseAddress = this.orderingService.getContentStringByName(
      ORDERING_CONTENT_STRINGS.formErrorChooseAddress
    );
    this.contentStrings.labelPickupTime = this.orderingService.getContentStringByName(
      ORDERING_CONTENT_STRINGS.labelPickupTime
    );
    this.contentStrings.labelDeliveryTime = this.orderingService.getContentStringByName(
      ORDERING_CONTENT_STRINGS.labelDeliveryTime
    );
    this.contentStrings.labelDeliveryAddress = this.orderingService.getContentStringByName(
      ORDERING_CONTENT_STRINGS.labelDeliveryAddress
    );
    this.contentStrings.labelPickupAddress = this.orderingService.getContentStringByName(
      ORDERING_CONTENT_STRINGS.labelPickupAddress
    );
    this.contentStrings.labelPickup = this.orderingService.getContentStringByName(ORDERING_CONTENT_STRINGS.labelPickup);
    this.contentStrings.labelDelivery = this.orderingService.getContentStringByName(
      ORDERING_CONTENT_STRINGS.labelDelivery
    );
    this.contentStrings.labelOrderOptions = this.orderingService.getContentStringByName(
      ORDERING_CONTENT_STRINGS.labelOrderOptions
    );
    this.contentStrings.orderingDatesUnavailable = this.orderingService.getContentStringByName(
      ORDERING_CONTENT_STRINGS.orderingDatesUnavailable
    );
    this.contentStrings.noAvailableTenders = this.orderingService.getContentErrorStringByName(
      ORDERING_CONTENT_STRINGS.noAvailableTenders
    );
  }
  private isMerchantDateUnavailable(schedule: Schedule) {
    return schedule.days.length == 0;
  }

  private async onMerchantDateUnavailable() {
    const noDatesMessage = await this.contentStrings.orderingDatesUnavailable.pipe(take(1)).toPromise();
    this.toastService.showToast({ message: noDatesMessage });
    await this.loadingService.closeSpinner();
    this.orderOptionsModal.isOpen && (await this.modalsService.dismiss());
  }
}

interface OrderOptions {
  labelTime: string;
  labelAddress: string;
  address: AddressInfo;
  isClickble: number;
}

export interface HourBlock {
  hour: number;
  minuteBlocks: number[];
  timestamps: string[];
  periods?: string[];
  timeZonedDate?: string;
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
