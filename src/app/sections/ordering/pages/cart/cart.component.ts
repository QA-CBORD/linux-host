import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CartService, OrderDetailOptions } from '@sections/ordering/services/cart.service';
import { combineLatest, Observable, from, Subscription, zip, of } from 'rxjs';
import {
  AddressModalSettings,
  FORM_CONTROL_NAMES,
  MerchantAccountInfoList,
  MerchantService,
  OrderDetailsComponent,
  OrderDetailsFormData,
  OrderInfo,
  OrderPayment,
} from '@sections/ordering';
import { LOCAL_ROUTING as ACCOUNT_LOCAL_ROUTING } from '@sections/accounts/accounts.config';
import { catchError, filter, finalize, first, map, switchMap, take, tap } from 'rxjs/operators';
import {
  LOCAL_ROUTING,
  MerchantSettings,
  ORDER_ERROR_CODES,
  ORDER_TYPE,
  ORDER_VALIDATION_ERRORS,
  ORDERING_CONTENT_STRINGS,
  PAYMENT_SYSTEM_TYPE,
} from '@sections/ordering/ordering.config';
import { LoadingService } from '@core/service/loading/loading.service';
import { ActivatedRoute } from '@angular/router';
import { handleServerError, isCashlessAccount, isCreditCardAccount, isMealsAccount } from '@core/utils/general-helpers';
import { UserAccount } from '@core/model/account/account.model';
import { PopoverController } from '@ionic/angular';
import { AccountType, Settings } from '../../../../app.global';
import { StGlobalPopoverComponent } from '@shared/ui-components';
import { MerchantInfo, MerchantOrderTypesInfo } from '@sections/ordering/shared/models';
import { OrderingComponentContentStrings, OrderingService } from '@sections/ordering/services/ordering.service';
import { UserFacadeService } from '@core/facades/user/user.facade.service';
import { SettingsFacadeService } from '@core/facades/settings/settings-facade.service';
import { ExternalPaymentService } from '@core/service/external-payment/external-payment.service';
import { ApplePay } from '@core/model/add-funds/applepay-response.model';
import { ToastService } from '@core/service/toast/toast.service';
import { NavigationService } from '@shared/services/navigation.service';
import { APP_ROUTES } from '@sections/section.config';
import { browserState } from '@sections/accounts/pages/deposit-page/deposit-page.component';
import { ConnectionService } from '@shared/services/connection-service';
import { buttons as Buttons } from '@core/utils/buttons.config';
import { defaultOrderSubmitErrorMessages } from '@shared/model/content-strings/default-strings';
import { OrderCheckinStatus } from '@sections/check-in/OrderCheckinStatus';
import { CheckingProcess } from '@sections/check-in/services/check-in-process-builder';
import { Browser } from '@capacitor/browser';
import { firstValueFrom } from '@shared/utils';
import { NonCheckingService } from './services/non-checking.service';
import { CART_ROUTES } from './cart-config';

@Component({
  selector: 'st-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartComponent implements OnInit, OnDestroy {
  order$: Observable<Partial<OrderInfo>>;
  merchant$: Observable<MerchantInfo>;
  addressModalSettings$: Observable<AddressModalSettings>;
  orderDetailOptions$: Observable<OrderDetailOptions>;
  applePayEnabled$: Observable<boolean>;
  orderTypes$: Observable<MerchantOrderTypesInfo>;
  accounts$: Promise<UserAccount[]>;
  accountInfoList$: Observable<MerchantAccountInfoList>;
  cartFormState: OrderDetailsFormData = {} as OrderDetailsFormData;
  contentStrings: OrderingComponentContentStrings = <OrderingComponentContentStrings>{};
  placingOrder = false;
  isProcessingOrder = false;
  @ViewChild('orderDetails', { static: true }) orderDetail: OrderDetailsComponent;
  merchantTimeZoneDisplayingMessage: string;
  isOnline = true;
  networkSubcription: Subscription;
  orderSubmitErrorMessage = {
    timeout: '',
    connectionLost: '',
    duplicateOrdering: '',
    noConnection: '',
  };

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
    private readonly nonCheckingService: NonCheckingService
  ) {}

  ionViewWillEnter() {
    this.accounts$ = this.getAvailableAccounts().then(accounts => {
      if (this.isExistingOrder) this.orderDetail.initAccountSelected(accounts);
      return accounts;
    });
    this.cdRef.detectChanges();
  }

  ngOnDestroy() {
    this.networkSubcription.unsubscribe();
  }

  ngOnInit() {
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
    this.accountInfoList$ = this.activatedRoute.data.pipe(map(({ data: [, accInfo] }) => accInfo));
    this.applePayEnabled$ = this.userFacadeService.isApplePayEnabled$();
    this.initContentStrings();
    this.subscribe2NetworkChanges();
  }

  subscribe2NetworkChanges() {
    this.networkSubcription = this.connectionService
      .networkStatus()
      .subscribe(isOnline => (this.isOnline = isOnline));
  }

  get isOrderASAP(): Observable<boolean> {
    return this.cartService.orderDetailsOptions$.pipe(
      filter((orderDetailOptions) => orderDetailOptions !== null),
      map(({ isASAP }) => isASAP));
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
      map(
        ([
          orderDetailOptions,
          buildings,
          merchant,
          deliveryAddresses,
          pickupLocations,
        ]) => {
          return {
            defaultAddress: orderDetailOptions?.address,
            buildings,
            isOrderTypePickup: orderDetailOptions?.orderType === ORDER_TYPE.PICKUP,
            pickupLocations,
            deliveryAddresses,
            merchantId: merchant?.id,
          } as AddressModalSettings;
        }
      ),
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

  onCartStateFormChanged(state) {
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
    if (!this.cartFormState.valid || this.placingOrder) return;
    this.placingOrder = true;
    const { type } = await this.cartService.orderInfo$.pipe(first()).toPromise();
    if (type === ORDER_TYPE.DELIVERY && (await this.isDeliveryAddressOutOfRange())) {
      await this.onValidateErrorToast('Delivery location is out of delivery range, please choose another location');
      this.placingOrder = false;
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
  }: OrderInfo) {
    if (OrderCheckinStatus.isNotCheckedIn(checkinStatus)) {
      this.checkinProcess.start(
        { id, pickupAddressId, orderPayment, dueTime, checkNumber, total, merchantId, type },
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
    const data: any = {
      title: 'Oooops',
      message,
      showClose: !buttonLable,
      buttons: buttonLable && [{ ...Buttons.OKAY, label: buttonLable }],
    };

    const modal = await this.popoverController.create({
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

    const { orderItems } = await this.cartService.orderInfo$.pipe(first()).toPromise();
    if (!orderItems.length) {
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

  private async submitOrder(): Promise<void> {
    await this.loadingService.showSpinner();
    let accountId = this.cartFormState.data[FORM_CONTROL_NAMES.paymentMethod].id;
    this.cartService.updateOrderNote(this.cartFormState.data[FORM_CONTROL_NAMES.note]);
    this.cartService.updateOrderPhone(this.cartFormState.data[FORM_CONTROL_NAMES.phone]);
    /// if Apple Pay Order
    if (this.cartFormState.data.paymentMethod.accountType === AccountType.APPLEPAY) {
      const orderData = await this.cartService.orderInfo$.pipe(first()).toPromise();

      Browser.addListener(browserState.FINISHED, () => {
        this.placingOrder = false;
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
          this.placingOrder = false;
          return await this.onErrorModal('Something went wrong, please try again...');
        })
        .finally(() => {
          this.placingOrder = false;
        });
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
      .catch(async (error: string | [string, string]) => {
        if (Array.isArray(error) && +error[0] === +ORDER_ERROR_CODES.ORDER_CAPACITY) {
          //something went wrong in the backend, order did not succeed for sure,
          this.cartService.changeClientOrderId;
          await this.onErrorModal(error[1], this.navigateToFullMenu.bind(this));
        } else if (typeof error === 'string') {
          if (error.includes(ORDER_ERROR_CODES.CONNECTION_TIMEOUT)) {
            // the request timed out...
            await this.onErrorModal(this.orderSubmitErrorMessage.timeout, () => this.onPosibleDuplicateOrder(), 'OK');
          } else if (error.includes(ORDER_ERROR_CODES.CONNECTION_LOST)) {
            // the internet connection was interrupted
            await this.onErrorModal(
              this.orderSubmitErrorMessage.connectionLost,
              () => this.onPosibleDuplicateOrder(),
              'OK'
            );
          } else if (error.includes(ORDER_ERROR_CODES.DUPLICATE_ORDER)) {
            //
            await this.onErrorModal(
              this.orderSubmitErrorMessage.duplicateOrdering,
              () => this.onPosibleDuplicateOrder(),
              'OK'
            );
          } else {
            this.cartService.changeClientOrderId;
            //something went wrong in the backend, order did not succeed for sure,
            await this.onErrorModal('There was an issue with the transaction, please try again.');
          }
        }
      })
      .finally(() => {
        this.isProcessingOrder = false;
        this.loadingService.closeSpinner();
        this.placingOrder = false;
      });
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

  private getDeliveryLocations(): Observable<any> {
    return this.cartService.merchant$.pipe(
      filter((merchant) => merchant !== null),
      switchMap(({ id }) => this.merchantService.retrieveDeliveryAddresses(id)),
      map(([, deliveryLocations]) => deliveryLocations)
    );
  }

  private getPickupLocations(): Observable<any> {
    return this.cartService.merchant$.pipe(
      filter((pickupsLocations) => pickupsLocations !== null),
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

  private async getAvailableAccounts(): Promise<UserAccount[]> {
    const accInfo = await this.accountInfoList$.pipe(first()).toPromise();
    const { mealBased } = await this.cartService.menuInfo$.pipe(first()).toPromise();

    return mealBased ? this.filterMealBasedAccounts(accInfo.accounts) : this.extractNoneMealsAccounts(accInfo);
  }

  private extractNoneMealsAccounts({ cashlessAccepted, accounts, creditAccepted }): UserAccount[] {
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
        this.accountInfoList$ = this.cartService.merchant$.pipe(
          switchMap(({ id }) => this.merchantService.getMerchantPaymentAccounts(id)),
          finalize(() => this.loadingService.closeSpinner())
        );
        this.accounts$ = this.getAvailableAccounts();
        this.cdRef.markForCheck();
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
      .pipe(
        first(),
        handleServerError<OrderInfo>(ORDER_VALIDATION_ERRORS)
      )
      .toPromise()
      .catch(onError)
      .finally(this.loadingService.closeSpinner.bind(this.loadingService));
  }

  private async onValidateErrorToast(message: string) {
    await this.toastService.showToast({ message, toastButtons: [{ text: 'Close' }] });
  }

  private initContentStrings() {
    this.contentStrings.buttonPlaceOrder = this.orderingService.getContentStringByName(
      ORDERING_CONTENT_STRINGS.buttonPlaceOrder
    );
    this.contentStrings.labelCart = this.orderingService.getContentStringByName(ORDERING_CONTENT_STRINGS.labelCart);
    this.contentStrings.buttonScheduleOrder = this.orderingService.getContentStringByName(
      ORDERING_CONTENT_STRINGS.buttonScheduleOrder
    );
    this.loadOrderingErrorStrings();
  }

  private async loadOrderingErrorStrings(): Promise<void> {
    const timeOutError = this.orderingService.getContentStringByName(ORDERING_CONTENT_STRINGS.orderSubmitTimeout);
    const connectionLostError = this.orderingService.getContentStringByName(ORDERING_CONTENT_STRINGS.connectionLost);
    const duplicateOrderSubmissionError = this.orderingService.getContentStringByName(
      ORDERING_CONTENT_STRINGS.duplicateOrdering
    );
    const noConnectionError = this.orderingService.getContentStringByName(ORDERING_CONTENT_STRINGS.noConnection);

    this.orderSubmitErrorMessage = await zip(
      timeOutError,
      connectionLostError,
      duplicateOrderSubmissionError,
      noConnectionError
    )
      .pipe(
        take(1),
        map(([timeout, connectionLost, duplicateOrdering, noConnection]) => {
          if (!timeout || !connectionLost) {
            return defaultOrderSubmitErrorMessages;
          }
          return {
            timeout,
            connectionLost,
            duplicateOrdering,
            noConnection,
          };
        }),
        catchError(() => of(defaultOrderSubmitErrorMessages))
      )
      .toPromise();
  }

  private setupCartInfo(order: OrderInfo) {
    this.cartService.changeClientOrderId;
    this.cartService.orderIsAsap = false;
    this.cartService.checkNumber = order.checkNumber;
    this.cartService.currentOrderId = order.id;
  }
}
