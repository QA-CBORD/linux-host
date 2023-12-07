import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Browser } from '@capacitor/browser';
import { SettingsFacadeService } from '@core/facades/settings/settings-facade.service';
import { UserFacadeService } from '@core/facades/user/user.facade.service';
import { UserAccount } from '@core/model/account/account.model';
import { ApplePay } from '@core/model/add-funds/applepay-response.model';
import { ExternalPaymentService } from '@core/service/external-payment/external-payment.service';
import { LoadingService } from '@core/service/loading/loading.service';
import { ToastService } from '@core/service/toast/toast.service';
import { buttons as Buttons } from '@core/utils/buttons.config';
import { handleServerError, isCashlessAccount, isCreditCardAccount, isMealsAccount } from '@core/utils/general-helpers';
import { IonContent, Platform, PopoverController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { LOCAL_ROUTING as ACCOUNT_LOCAL_ROUTING } from '@sections/accounts/accounts.config';
import { browserState } from '@sections/accounts/pages/deposit-page/deposit-page.component';
import { OrderCheckinStatus } from '@sections/check-in/OrderCheckinStatus';
import { CheckingProcess } from '@sections/check-in/services/check-in-process-builder';
import {
  AddressModalSettings,
  DueTimeErrorMessages,
  FORM_CONTROL_NAMES,
  MerchantAccountInfoList,
  MerchantService,
  OrderDetailsFormData,
  OrderInfo,
  OrderPayment,
} from '@sections/ordering';
import {
  LOCAL_ROUTING,
  MerchantSettings,
  ORDERING_CONTENT_STRINGS,
  ORDER_ERROR_CODES,
  ORDER_TYPE,
  ORDER_VALIDATION_ERRORS,
  PAYMENT_SYSTEM_TYPE,
} from '@sections/ordering/ordering.config';
import { CartService, OrderDetailOptions } from '@sections/ordering/services/cart.service';
import { OrderingComponentContentStrings, OrderingService } from '@sections/ordering/services/ordering.service';
import { MerchantInfo, MerchantOrderTypesInfo } from '@sections/ordering/shared/models';
import { PriceUnitsResolverPipe } from '@sections/ordering/shared/pipes/price-units-resolver/price-units-resolver.pipe';
import { APP_ROUTES } from '@sections/section.config';
import { LockDownService } from '@shared/index';
import { ConnectionService } from '@shared/services/connection-service';
import { NavigationService } from '@shared/services/navigation.service';
import { StGlobalPopoverComponent } from '@shared/ui-components';
import {
  BehaviorSubject,
  Observable,
  Subscription,
  combineLatest,
  firstValueFrom,
  from,
  lastValueFrom,
  zip,
} from 'rxjs';
import { filter, finalize, first, map, switchMap, take, tap } from 'rxjs/operators';
import { AccountType, Settings } from '../../../../app.global';
import { CART_ROUTES } from './cart-config';
import { NonCheckingService } from './services/non-checking.service';
import { ASAP_LABEL, EXECUTION_PRIORITY, TOAST_DURATION } from '@shared/model/generic-constants';
import { Location } from '@angular/common';
import { DateTimeSelected } from '@sections/ordering/shared/ui-components/st-date-time-picker/st-date-time-picker.component';

interface OrderingErrorContentStringModel {
  timeout: string;
  connectionLost: string;
  duplicateOrdering: string;
  noConnection: string;
  pickUpOrderTimeNotAvailable: string;
  deliveryOrderTimeNotAvailable: string;
}

@Component({
  selector: 'st-cart',
  templateUrl: './cart.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartComponent implements OnInit, OnDestroy {
  order$: Observable<Partial<OrderInfo>>;
  merchant$: Observable<MerchantInfo>;
  addressModalSettings$: Observable<AddressModalSettings>;
  orderDetailOptions$: Observable<OrderDetailOptions>;
  applePayEnabled$: Observable<boolean>;
  orderTypes$: Observable<MerchantOrderTypesInfo>;
  public showButton = true;
  public lastCartFormValid = false;
  public voiceOverErrorMessage = '';
  private readonly _accountInfoList$: BehaviorSubject<MerchantAccountInfoList>;
  public readonly accounts$: Observable<UserAccount[]>;
  accountInfoList$: Observable<MerchantAccountInfoList>;
  cartFormState: OrderDetailsFormData = {} as OrderDetailsFormData;
  contentStrings: OrderingComponentContentStrings = <OrderingComponentContentStrings>{};
  isProcessingOrder = false;
  merchantTimeZoneDisplayingMessage: string;
  isOnline = true;
  networkSubcription: Subscription;
  orderSubmitErrorMessage: OrderingErrorContentStringModel;
  dueTimeHasErrors = false;
  errorCode = null;
  @ViewChild('content') private page: IonContent;
  platformBackButtonClickSubscription: Subscription;
  isValidatingDueTime = false;

  constructor(
    private readonly cartService: CartService,
    private readonly merchantService: MerchantService,
    private readonly loadingService: LoadingService,
    private readonly settingsFacadeService: SettingsFacadeService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly toastService: ToastService,
    private readonly popoverController: PopoverController,
    private readonly cdRef: ChangeDetectorRef,
    private readonly orderingService: OrderingService,
    private readonly userFacadeService: UserFacadeService,
    private externalPaymentService: ExternalPaymentService,
    private readonly routingService: NavigationService,
    private readonly connectionService: ConnectionService,
    private readonly checkinProcess: CheckingProcess,
    private readonly nonCheckingService: NonCheckingService,
    private readonly lockDownService: LockDownService,
    private readonly translateService: TranslateService,
    private readonly priceUnitsResolverPipe: PriceUnitsResolverPipe,
    private platform: Platform,
    private location: Location
  ) {
    // Resolved data type: CartResolvedData
    this._accountInfoList$ = new BehaviorSubject<MerchantAccountInfoList>(
      this.activatedRoute.snapshot.data.data.accounts
    );
    this.accountInfoList$ = this._accountInfoList$.asObservable();
    this.accounts$ = this.getAvailableAccounts$();
  }

  ionViewDidEnter() {
    this.platformBackButtonClickSubscription = this.platform.backButton.subscribeWithPriority(
      EXECUTION_PRIORITY,
      async () => {
        this.onCloseButton();
      }
    );
  }

  ionViewWillLeave() {
    this.platformBackButtonClickSubscription.unsubscribe();
  }

  ngOnDestroy(): void {
    this.networkSubcription.unsubscribe();
  }

  ionViewWillEnter() {
    this.cdRef.detectChanges();
  }

  onErrorsDetected(val: boolean) {
    this.dueTimeHasErrors = val;
  }

  onCloseButton() {
    if (this.canShowRemoveItemsAlert()) {
      this.cartService.closeButtonClicked();
    } else {
      this.location.back();
    }
  }

  ngOnInit(): void {
    this.order$ = this.cartService.orderInfo$;
    this.merchant$ = this.cartService.merchant$.pipe(
      tap(
        merchant =>
          (this.merchantTimeZoneDisplayingMessage =
            merchant?.timeZone && "The time zone reflects the merchant's location")
      )
    );
    this.orderTypes$ = this.merchantService.orderTypes$.pipe(
      map(orderType => {
        orderType.merchantTimeZone = this.cartService.merchantTimeZone;
        return orderType;
      })
    );
    this.orderDetailOptions$ = this.cartService.orderDetailsOptions$;
    this.addressModalSettings$ = this.initAddressModalConfig();
    this.applePayEnabled$ = this.userFacadeService.isApplePayEnabled$();
    this.initContentStrings();
    this.subscribe2NetworkChanges();
  }

  subscribe2NetworkChanges() {
    this.networkSubcription = this.connectionService.networkStatus().subscribe(isOnline => (this.isOnline = isOnline));
  }

  getButtonText(): Observable<string> {
    return combineLatest([
      this.isOrderASAP,
      this.contentStrings.buttonPlaceOrder,
      this.contentStrings.buttonScheduleOrder,
      this.order$,
    ]).pipe(
      map(([isOrderAsap, buttonPlaceOrder, buttonScheduleOrder, order]) => {
        const orderTotal = this.priceUnitsResolverPipe.transform(order.total, order.mealBased);
        return `${isOrderAsap ? buttonPlaceOrder : buttonScheduleOrder} ${orderTotal}`;
      })
    );
  }

  get buttonAriaLabel(): Observable<string> {
    return combineLatest([this.getButtonText()]).pipe(
      map(([buttonText]) => {
        if (this.cartFormState.valid || this.isExistingOrder) {
          return buttonText;
        }
        return this.voiceOverErrorMessage;
      })
    );
  }
  get isOrderASAP(): Observable<boolean> {
    return this.cartService.orderDetailsOptions$.pipe(
      filter(orderDetailOptions => orderDetailOptions !== null),
      map(({ isASAP }) => isASAP)
    );
  }

  get isExistingOrder(): boolean {
    return this.cartService.isExistingOrder;
  }

  initAddressModalConfig(): Observable<AddressModalSettings> {
    this.loadingService.showSpinner();
    return combineLatest([
      this.cartService.orderDetailsOptions$,
      this.merchantService.retrieveBuildings(),
      this.cartService.merchant$,
      this.getDeliveryLocations(),
      this.getPickupLocations(),
    ]).pipe(
      map(([orderDetailOptions, buildings, merchant, deliveryAddresses, pickupLocations]) => {
        return {
          defaultAddress: orderDetailOptions?.address,
          buildings,
          isOrderTypePickup: orderDetailOptions?.orderType === ORDER_TYPE.PICKUP,
          pickupLocations,
          deliveryAddresses,
          merchantId: merchant?.id,
        } as AddressModalSettings;
      }),
      tap(() => {
        this.loadingService.closeSpinner();
      })
    );
  }

  onOrderItemClicked({ menuItemId, id }) {
    this.routingService.navigate([APP_ROUTES.ordering, LOCAL_ROUTING.itemDetail], {
      queryParams: {
        menuItemId: menuItemId,
        orderItemId: id,
        isItemExistsInCart: true,
        isExistingOrder: this.isExistingOrder,
      },
    });
  }

  async onOrderTimeChange({ dateTimePicker, timeStamp }: DateTimeSelected) {
    let date = { dueTime: timeStamp || dateTimePicker, isASAP: dateTimePicker === ASAP_LABEL };
    date = date.isASAP ? { ...date, dueTime: undefined } : { ...date };

    this.isValidatingDueTime = true;
    this.cartService.orderIsAsap = date.isASAP;
    this.cartService.cartsErrorMessage = null;
    this.cartService.orderOption = {
      dueTime: date.dueTime,
      orderType: this.cartService._orderOption.orderType,
      address: this.cartService._orderOption.address,
      isASAP: date.isASAP,
    } as OrderDetailOptions;
    await this.loadingService.showSpinner();

    /*
      TODO: We have different implementation of the same validate order method in this class,
      we need to move try to reuse the same validateOrder always, make sure that toast message should
      only appear when dueTime has error not when validating something else,
      for example paymentMethods validations should not fire dueTImeError toast messages.
     */
    await this.cartService
      .validateOrder(this.cartService.orderOption)
      .pipe(first(), handleServerError(ORDER_VALIDATION_ERRORS))
      .toPromise()
      .then(validatedOrder => {
        this.cartService.cartsErrorMessage = null;
        this.isValidatingDueTime = false;

        if (this.cartService._orderOption.isASAP) {
          this.cartService.orderOption = {
            ...this.cartService._orderOption,
            dueTime: new Date(validatedOrder.dueTime),
          };
        }

        if (this.dueTimeHasErrors) {
          this.cleanDueTimeErrors();
        }

        this.cdRef.detectChanges();
      })
      .catch(error => {
        if (Array.isArray(error)) {
          this.errorCode = error[0];
          const errorKey =
            this.cartService._orderOption.orderType === ORDER_TYPE.PICKUP
              ? 'PickUpOrderTimeNotAvailable'
              : 'DeliveryOrderTimeNotAvailable';
          this.cartService.cartsErrorMessage = error[1];
          this.dueTimeHasErrors = true;
          const message = this.translateService.instant(`get_common.error.${errorKey}`);
          this.toastService.showError(message, TOAST_DURATION, 'bottom');
          this.isValidatingDueTime = false;
          this.cdRef.detectChanges();
        }
      })
      .finally(() => {
        this.loadingService.closeSpinner();
      });
  }

  onCartStateFormChanged(state) {
    if (this.lastCartFormValid !== this.cartFormState.valid) {
      this.voiceOverErrorMessage = state.voiceOverError;
      this.showButton = false;
      setTimeout(() => {
        this.showButton = true;
        this.cdRef.detectChanges();
      }, 100);
    }
    this.lastCartFormValid = this.cartFormState.valid;
    this.cartService.updateOrderAddress(state.data[FORM_CONTROL_NAMES.address]);
    this.cartFormState = state;
  }

  onOrderTipChanged(amount: number) {
    this.cartService.setOrderTip(amount);
  }

  async onOrderPaymentInfoChanged(selectedValue: Partial<OrderPayment> | string) {
    if (selectedValue instanceof Object) {
      const errMessage = 'something went wrong';
      this.cartService.addPaymentInfoToOrder(selectedValue as Partial<OrderPayment>);
      this.validateOrder(errMessage);
      this.cdRef.detectChanges();
    }
    if (typeof selectedValue === 'string' && selectedValue === 'addCC') {
      const paymentSystem = await this.definePaymentSystemType();

      if (paymentSystem === PAYMENT_SYSTEM_TYPE.MONETRA) {
        this.routingService.navigate([APP_ROUTES.accounts, ACCOUNT_LOCAL_ROUTING.addCreditCard]);

        return;
      }

      this.addUSAePayCreditCard();
    }
  }

  async onSubmit() {
    if (this.lockDownService.isLockDownOn()) {
      return;
    }

    if (!this.cartFormState.valid || this.isProcessingOrder) return;

    this.isProcessingOrder = true;
    const { type } = await this.cartService.orderInfo$.pipe(first()).toPromise();
    if (type === ORDER_TYPE.DELIVERY && (await this.isDeliveryAddressOutOfRange())) {
      await this.onValidateErrorToast('Delivery location is out of delivery range, please choose another location');
      this.isProcessingOrder = false;
      return;
    }

    await this.submitOrder();
  }

  async showModal({
    tax,
    discount,
    total,
    subTotal,
    orderPayment,
    deliveryFee,
    pickupFee,
    pickupAddressId,
    tip,
    checkNumber,
    mealBased,
    merchantId,
    dueTime,
    id,
    checkinStatus,
    type,
    status,
  }: OrderInfo) {
    if (OrderCheckinStatus.isNotCheckedIn(checkinStatus, status)) {
      this.checkinProcess.start(
        {
          id,
          pickupAddressId,
          orderPayment,
          dueTime,
          checkNumber,
          total,
          merchantId,
          type,
        },
        this.isExistingOrder
      );
      return;
    }

    const orderDetailOptions = await firstValueFrom(await this.orderDetailOptions$);
    const orderTypes = await firstValueFrom(this.orderTypes$);

    this.nonCheckingService.setSummary({
      tax,
      discount,
      total,
      subTotal,
      deliveryFee,
      pickupFee,
      tip,
      checkNumber,
      accountName: orderPayment[0].accountName,
      mealBased,
      dueTime,
      type,
      orderType: orderTypes,
      orderDetailOptions,
    });
    this.routingService.navigate([APP_ROUTES.ordering, LOCAL_ROUTING.cart, CART_ROUTES.success]);
  }

  private async onErrorModal(message: string, cb?: () => void, buttonLable?: string) {
    const data = {
      title: 'Oooops',
      message,
      showClose: !buttonLable,
      buttons: buttonLable && [{ ...Buttons.OKAY, label: buttonLable }],
    };

    const modal = await this.popoverController.create({
      cssClass: 'sc-popover',
      component: StGlobalPopoverComponent,
      componentProps: {
        data,
      },
      animated: false,
      backdropDismiss: false,
    });
    cb && modal.onDidDismiss().then(cb);

    await modal.present();
  }

  async removeOrderItem(id: string) {
    this.cdRef.detach();
    const removedItem = this.cartService.removeOrderItemFromOrderById(id);

    if (!removedItem) {
      this.cdRef.reattach();
      return;
    }

    this.cdRef.detectChanges();
    const { orderItems } = await this.cartService.orderInfo$.pipe(first()).toPromise();
    if (!orderItems.length) {
      this.cartService.clearActiveOrder();
      this.cartService.setActiveMerchantsMenuByOrderOptions(
        this.cartService._orderOption.dueTime,
        this.cartService._orderOption.orderType,
        this.cartService._orderOption.address,
        this.cartService._orderOption.isASAP
      );
      this.routingService.navigate([APP_ROUTES.ordering, LOCAL_ROUTING.fullMenu]);
      return;
    }

    const onError = async message => {
      await this.onValidateErrorToast(typeof message === 'object' ? message[1] : message);
      this.cartService.addOrderItems(removedItem);
    };
    await this.validateOrder(onError);
    this.cdRef.reattach();
  }

  private async navigateToFullMenu(): Promise<void> {
    await this.routingService.navigate([APP_ROUTES.ordering, LOCAL_ROUTING.fullMenu], {
      queryParams: { openTimeSlot: true },
    });
  }

  private async isDeliveryAddressOutOfRange(): Promise<boolean> {
    const { latitude, longitude } = await this.orderDetailOptions$
      .pipe(
        first(),
        map(({ address }) => address)
      )
      .toPromise();
    const { id } = await this.cartService.merchant$.pipe(first()).toPromise();
    return this.merchantService.isOutsideMerchantDeliveryArea(id, latitude, longitude).toPromise();
  }

  private isApplePay(): boolean {
    return this.cartFormState.data?.paymentMethod?.accountType === AccountType.APPLEPAY;
  }

  private async getAccountIdFromApplePay(): Promise<string> {
    let accountId: string;
    const orderData = await lastValueFrom(this.cartService.orderInfo$.pipe(first()));

    Browser.addListener(browserState.FINISHED, async () => {
      await this.loadingService.closeSpinner();
      this.cdRef.detectChanges();
      Browser.removeAllListeners();
    });

    await this.externalPaymentService
      .payWithApplePay(ApplePay.ORDERS_WITH_APPLE_PAY, orderData)
      .then(result => {
        if (result.success) {
          accountId = result.accountId;
        } else {
          this.onErrorModal(result.errorMessage);
        }
      })
      .catch(async () => {
        this.isProcessingOrder = false;
        return await this.onErrorModal('Something went wrong, please try again...');
      })
      .finally(() => {
        this.isProcessingOrder = false;
      });

    return accountId;
  }

  private async submitOrder(): Promise<void> {
    await this.loadingService.showSpinner();
    let accountId = this.cartFormState.data[FORM_CONTROL_NAMES.paymentMethod]?.id;
    this.cartService.updateOrderNote(this.cartFormState.data[FORM_CONTROL_NAMES.note]);
    this.cartService.updateOrderPhone(this.cartFormState.data[FORM_CONTROL_NAMES.phone]);
    /// if Apple Pay Order

    if (this.isApplePay()) {
      this.isProcessingOrder = false;
      accountId = await this.getAccountIdFromApplePay();
    }

    if (!this.isOnline) {
      this.onErrorModal(this.orderSubmitErrorMessage.noConnection);
      this.loadingService.closeSpinner();
      return;
    }

    this.cartService
      .submitOrder(accountId, this.cartFormState.data[FORM_CONTROL_NAMES.cvv] || null, this.cartService.clientOrderId)
      .pipe(handleServerError(ORDER_VALIDATION_ERRORS))
      .toPromise()
      .then(async order => {
        this.setupCartInfo(order);
        await this.showModal(order);
      })
      .catch(async (error: string | [string, string]) => this.handlerCartErrors(error))
      .finally(() => {
        this.isProcessingOrder = false;
        this.loadingService.closeSpinner();
      });
  }

  private async handlerCartErrors(error: string | [string, string]): Promise<void> {
    if (Array.isArray(error)) {
      this.cartService.changeClientOrderId;

      this.dueTimeHasErrors = false;
      const isMerchantOrderAhead = await firstValueFrom(
        this.merchant$.pipe(
          map(merchant => parseInt(merchant.settings.map[MerchantSettings.orderAheadEnabled].value) === 1)
        )
      );

      if (isMerchantOrderAhead && error) {
        const key = error && error[0];
        const options = await firstValueFrom(this.orderDetailOptions$);
        const errorKey = {
          [ORDER_ERROR_CODES.INVALID_ORDER]: 'ItemsNotAvailable',
          [ORDER_ERROR_CODES.ORDER_CAPACITY]:
            options.orderType === ORDER_TYPE.PICKUP ? 'PickUpOrderTimeNotAvailable' : 'DeliveryOrderTimeNotAvailable',
        }[key] as keyof DueTimeErrorMessages;
        const errorMessage = this.translateService.instant(`get_common.error.${errorKey}`);
        this.toastService.showError(errorMessage, TOAST_DURATION, 'bottom');
        this.dueTimeHasErrors = true;
        this.errorCode = key;
        this.page.scrollToTop();
        this.cdRef.detectChanges();
        return;
      }

      const errorCode = +error[0];
      if (errorCode === +ORDER_ERROR_CODES.INVALID_CARD) {
        await this.onValidateErrorToast(error[1]);
        return;
      }
    }

    if (error.includes(ORDER_ERROR_CODES.CONNECTION_TIMEOUT)) {
      // the request timed out...
      await this.onErrorModal(this.orderSubmitErrorMessage.timeout, () => this.onPosibleDuplicateOrder(), 'OK');
      return;
    }

    if (error.includes(ORDER_ERROR_CODES.CONNECTION_LOST)) {
      // the internet connection was interrupted
      await this.onErrorModal(this.orderSubmitErrorMessage.connectionLost, () => this.onPosibleDuplicateOrder(), 'OK');
      return;
    }

    if (error.includes(ORDER_ERROR_CODES.DUPLICATE_ORDER)) {
      await this.onErrorModal(
        this.orderSubmitErrorMessage.duplicateOrdering,
        () => this.onPosibleDuplicateOrder(),
        'OK'
      );
      return;
    }

    if (error.includes(ORDER_ERROR_CODES.INSUFFICIENT_BALANCE)) {
      const message = await firstValueFrom(this.contentStrings.insufficientBalanceMealsPayment);
      await this.toastService.showToast({
        message,
        icon: 'warning',
        cssClass: 'toast-message-warning',
      });
      return;
    }

    if (error && error.includes('CONTENT_STRING')) {
      this.onValidateErrorToast(await this.orderingService.getContentErrorStringByException(error, ''));
      return;
    }

    if (error) {
      this.onValidateErrorToast(String(error));
      return;
    }

    this.cartService.changeClientOrderId;
    //something went wrong in the backend, order did not succeed for sure,
    await this.onErrorModal('There was an issue with the transaction, please try again.');
  }

  private async onPosibleDuplicateOrder() {
    if (this.isOnline) {
      this.routingService.navigate([APP_ROUTES.ordering, LOCAL_ROUTING.recentOrders]);
    } else {
      await this.onErrorModal(this.orderSubmitErrorMessage.noConnection, () => {
        if (this.isOnline) {
          this.routingService.navigate([APP_ROUTES.ordering, LOCAL_ROUTING.recentOrders]);
        } else {
          // take client back to dashboard...2 prevent duplicate order
          this.routingService.navigate([APP_ROUTES.dashboard]);
        }
      });
    }
  }

  private getDeliveryLocations() {
    return this.cartService.merchant$.pipe(
      filter(merchant => merchant !== null),
      switchMap(({ id }) => this.merchantService.retrieveDeliveryAddresses(id)),
      map(([, deliveryLocations]) => deliveryLocations)
    );
  }

  private getPickupLocations() {
    return this.cartService.merchant$.pipe(
      filter(pickupsLocations => pickupsLocations !== null),
      switchMap(({ storeAddress, settings }) =>
        this.merchantService.retrievePickupLocations(
          storeAddress,
          settings.map[MerchantSettings.pickupLocationsEnabled]
        )
      )
    );
  }

  private filterCashlessAccounts(sourceAccounts: UserAccount[]): UserAccount[] {
    return sourceAccounts.filter((account: UserAccount) => account.id === 'rollup' || isCashlessAccount(account));
  }

  private filterCreditAccounts(sourceAccounts: UserAccount[]): UserAccount[] {
    return sourceAccounts.filter((account: UserAccount) => isCreditCardAccount(account));
  }

  private filterMealBasedAccounts(sourceAccounts: UserAccount[]): UserAccount[] {
    return sourceAccounts.filter((account: UserAccount) => isMealsAccount(account));
  }
  private getAvailableAccounts$(): Observable<UserAccount[]> {
    return combineLatest([this.accountInfoList$, this.cartService.menuInfo$]).pipe(
      map(([accInfo, { mealBased }]) => {
        if (!accInfo) return [];
        return mealBased ? this.filterMealBasedAccounts(accInfo.accounts) : this.extractNoneMealsAccounts(accInfo);
      })
    );
  }

  private extractNoneMealsAccounts({
    cashlessAccepted,
    accounts,
    creditAccepted,
  }: MerchantAccountInfoList): UserAccount[] {
    let res = [];
    accounts = this.filterNoneMealsAccounts(accounts);

    if (cashlessAccepted) {
      res = res.concat(this.filterCashlessAccounts(accounts));
    }
    if (creditAccepted) {
      res = res.concat(this.filterCreditAccounts(accounts));
    }

    return res;
  }

  private filterNoneMealsAccounts(sourceAccounts): UserAccount[] {
    return sourceAccounts.filter((sourceAccount: UserAccount) => !isMealsAccount(sourceAccount));
  }

  private addUSAePayCreditCard() {
    from(this.externalPaymentService.addUSAePayCreditCard())
      .pipe(first())
      .subscribe(({ success, errorMessage }) => {
        if (!success) {
          return this.onValidateErrorToast(errorMessage);
        }

        this.loadingService.showSpinner();
        // Update user accounts for refreshing Credit Card dropdown list
        this.cartService.merchant$
          .pipe(
            switchMap(({ id }) => this.merchantService.getMerchantPaymentAccounts(id)),
            tap(accounts => {
              this._accountInfoList$.next(accounts);
              this.cdRef.detectChanges();
            }),
            finalize(() => this.loadingService.closeSpinner())
          )
          .subscribe();
      });
  }

  private definePaymentSystemType(): Promise<number> {
    return this.settingsFacadeService
      .getSetting(Settings.Setting.CREDIT_PAYMENT_SYSTEM_TYPE)
      .pipe(
        map(({ value }) => parseInt(value)),
        first()
      )
      .toPromise();
  }

  private async validateOrder(onError): Promise<void> {
    await this.loadingService.showSpinner();
    await this.cartService
      .validateOrder()
      .pipe(first(), handleServerError<OrderInfo>(ORDER_VALIDATION_ERRORS))
      .toPromise()
      .catch(onError)
      .finally(this.loadingService.closeSpinner.bind(this.loadingService));
  }

  private async onValidateErrorToast(message: string) {
    await this.toastService.showError(message);
  }

  private async initContentStrings() {
    this.contentStrings.buttonPlaceOrder = this.orderingService.getContentStringByName(
      ORDERING_CONTENT_STRINGS.buttonPlaceOrder
    );
    this.contentStrings.labelCart = this.orderingService.getContentStringByName(ORDERING_CONTENT_STRINGS.labelCart);
    this.contentStrings.buttonScheduleOrder = this.orderingService.getContentStringByName(
      ORDERING_CONTENT_STRINGS.buttonScheduleOrder
    );
    this.contentStrings.insufficientBalanceMealsPayment = this.orderingService.getContentErrorStringByName(
      ORDERING_CONTENT_STRINGS.insufficientBalanceMealsPayment
    );
    this.loadOrderingErrorStrings();
    this.lockDownService.loadStringsAndSettings();
  }

  private async loadOrderingErrorStrings(): Promise<void> {
    const timeOutError = this.orderingService.getContentStringByName(ORDERING_CONTENT_STRINGS.orderSubmitTimeout);
    const connectionLostError = this.orderingService.getContentStringByName(ORDERING_CONTENT_STRINGS.connectionLost);
    const duplicateOrderSubmissionError = this.orderingService.getContentStringByName(
      ORDERING_CONTENT_STRINGS.duplicateOrdering
    );
    const noConnectionError = this.orderingService.getContentStringByName(ORDERING_CONTENT_STRINGS.noConnection);
    const pickUpOrderTimeNotAvailable = this.orderingService.getContentErrorStringByName(
      ORDERING_CONTENT_STRINGS.pickUpOrderTimeNotAvailable
    );
    const deliveryOrderTimeNotAvailable = this.orderingService.getContentErrorStringByName(
      ORDERING_CONTENT_STRINGS.deliveryOrderTimeNotAvailable
    );

    this.orderSubmitErrorMessage = await zip(
      timeOutError,
      connectionLostError,
      duplicateOrderSubmissionError,
      noConnectionError,
      pickUpOrderTimeNotAvailable,
      deliveryOrderTimeNotAvailable
    )
      .pipe(
        take(1),
        map(
          ([
            timeout,
            connectionLost,
            duplicateOrdering,
            noConnection,
            pickUpOrderTimeNotAvailable,
            deliveryOrderTimeNotAvailable,
          ]) => {
            return {
              timeout,
              connectionLost,
              duplicateOrdering,
              noConnection,
              pickUpOrderTimeNotAvailable,
              deliveryOrderTimeNotAvailable,
            };
          }
        )
      )
      .toPromise();
  }

  private setupCartInfo(order: OrderInfo) {
    this.cartService.changeClientOrderId;
    this.cartService.orderIsAsap = false;
    this.cartService.checkNumber = order.checkNumber;
    this.cartService.currentOrderId = order.id;
  }

  private canShowRemoveItemsAlert() {
    return this.dueTimeHasErrors && this.errorCode !== ORDER_ERROR_CODES.ORDER_CAPACITY;
  }

  cleanDueTimeErrors() {
    this.errorCode = null;
    this.dueTimeHasErrors = false;
  }
}
