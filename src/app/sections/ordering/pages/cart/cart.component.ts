import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CartService, OrderDetailOptions } from '@sections/ordering/services/cart.service';
import { combineLatest, Observable } from 'rxjs';
import {
  AddressModalSettings,
  DETAILS_FORM_CONTROL_NAMES,
  MerchantAccountInfoList,
  MerchantService,
  OrderDetailsFormData,
  OrderInfo,
  OrderPayment,
} from '@sections/ordering';
import { LOCAL_ROUTING as ACCOUNT_LOCAL_ROUTING } from '@sections/accounts/accounts.config';
import { first, map, switchMap, tap, finalize } from 'rxjs/operators';
import {
  ACCOUNT_TYPES,
  MerchantSettings,
  ORDER_TYPE,
  ORDER_VALIDATION_ERRORS,
  PAYMENT_SYSTEM_TYPE,
  LOCAL_ROUTING,
  SYSTEM_SETTINGS_CONFIG,
} from '@sections/ordering/ordering.config';
import { LoadingService } from '@core/service/loading/loading.service';
import { SettingService } from '@core/service/settings/setting.service';
import { ActivatedRoute, Router } from '@angular/router';
import { handleServerError } from '@core/utils/general-helpers';
import { UserAccount } from '@core/model/account/account.model';
import { ModalController, PopoverController, ToastController } from '@ionic/angular';
import { NAVIGATE, AccountType } from '../../../../app.global';
import { SuccessModalComponent } from '@sections/ordering/pages/cart/components/success-modal';
import { StGlobalPopoverComponent } from '@shared/ui-components';
import { MerchantOrderTypesInfo } from '@sections/ordering/shared/models';
import { NativeProvider, NativeData } from '@core/provider/native-provider/native.provider';
import { UserService } from '@core/service/user-service/user.service';

@Component({
  selector: 'st-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartComponent implements OnInit {
  order$: Observable<Partial<OrderInfo>>;
  addressModalSettings$: Observable<AddressModalSettings>;
  orderDetailOptions$: Observable<OrderDetailOptions>;
  applePayEnabled$: Observable<boolean>;
  orderTypes$: Observable<MerchantOrderTypesInfo>;
  accounts$: Promise<UserAccount[]>;
  accountInfoList$: Observable<MerchantAccountInfoList>;
  cartFormState: OrderDetailsFormData = {} as OrderDetailsFormData;

  constructor(
    private readonly cartService: CartService,
    private readonly merchantService: MerchantService,
    private readonly loadingService: LoadingService,
    private readonly settingService: SettingService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly toastController: ToastController,
    private readonly popoverController: PopoverController,
    private readonly cdRef: ChangeDetectorRef,
    private readonly router: Router,
    private readonly modalController: ModalController,
    private readonly userService: UserService,
    private readonly nativeProvider: NativeProvider
  ) {}

  ionViewWillEnter() {
    this.accounts$ = this.getAvailableAccounts();
    this.cdRef.detectChanges();
  }

  ngOnInit() {
    this.order$ = this.cartService.orderInfo$;
    this.orderTypes$ = this.merchantService.orderTypes$;
    this.orderDetailOptions$ = this.cartService.orderDetailsOptions$;
    this.addressModalSettings$ = this.initAddressModalConfig();
    this.accountInfoList$ = this.activatedRoute.data.pipe(map(({ data: [, accInfo] }) => accInfo));
    this.applePayEnabled$ = this.userService.isApplePayEnabled$();
  }

  get isOrderASAP(): Observable<boolean> {
    return this.cartService.orderDetailsOptions$.pipe(map(({ isASAP }) => isASAP));
  }

  initAddressModalConfig(): Observable<AddressModalSettings> {
    this.loadingService.showSpinner();
    return combineLatest(
      this.cartService.orderDetailsOptions$,
      this.merchantService.retrieveBuildings(),
      this.cartService.merchant$,
      this.getDeliveryLocations(),
      this.getPickupLocations()
    ).pipe(
      map(
        ([
          { address: defaultAddress, orderType },
          buildings,
          { id: merchantId },
          deliveryAddresses,
          pickupLocations,
        ]) => ({
          defaultAddress,
          buildings,
          isOrderTypePickup: orderType === ORDER_TYPE.PICKUP,
          pickupLocations,
          deliveryAddresses,
          merchantId,
        })
      ),
      tap(() => this.loadingService.closeSpinner())
    );
  }

  onOrderItemClicked({ menuItemId, id }) {
    this.router.navigate([NAVIGATE.ordering, LOCAL_ROUTING.itemDetail], {
      skipLocationChange: true,
      queryParams: { menuItemId: menuItemId, orderItemId: id },
    });
  }

  onCartStateFormChanged(state) {
    this.cartService.updateOrderAddress(state.data[DETAILS_FORM_CONTROL_NAMES.address]);
    this.cartFormState = state;
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
        this.router.navigate([NAVIGATE.accounts, ACCOUNT_LOCAL_ROUTING.addCreditCard], {
          skipLocationChange: true,
        });

        return;
      }

      this.addUSAePayCreditCard();
    }
  }

  async onSubmit() {
    if (!this.cartFormState.valid) return;
    const { type } = await this.cartService.orderInfo$.pipe(first()).toPromise();
    if (type === ORDER_TYPE.DELIVERY && (await this.isDeliveryAddressOutOfRange())) {
      await this.onValidateErrorToast('Delivery location is out of delivery range, please choose another location');
      return;
    }

    await this.submitOrder();
  }

  async showModal({
    tax,
    discount,
    total,
    subTotal,
    orderPayment: [{ accountName }],
    deliveryFee,
    pickupFee,
    tip,
    checkNumber,
    mealBased,
  }: OrderInfo) {
    const modal = await this.modalController.create({
      component: SuccessModalComponent,
      componentProps: {
        tax,
        discount,
        total,
        subTotal,
        deliveryFee,
        pickupFee,
        tip,
        checkNumber,
        accountName,
        mealBased,
      },
    });

    modal.onDidDismiss().then(async () => {
      await this.router.navigate([NAVIGATE.ordering], { skipLocationChange: true });
    });

    await modal.present();
  }

  private async onErrorModal(message) {
    const modal = await this.popoverController.create({
      component: StGlobalPopoverComponent,
      componentProps: {
        data: {
          title: 'Oooops',
          message,
        },
      },
      animated: false,
      backdropDismiss: true,
    });

    await modal.present();
  }

  async removeOrderItem(id: string) {
    this.cdRef.detach();
    const removedItem = this.cartService.removeOrderItemFromOrderById(id);

    if (!removedItem) {
      this.cdRef.reattach();
      return;
    }
    const onError = async message => {
      await this.onValidateErrorToast(message);
      this.cartService.addOrderItems(removedItem);
    };
    await this.validateOrder(onError);
    this.cdRef.reattach();
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
    
    /// if Apple Pay Order
    if(this.cartFormState.data.paymentMethod.accountType === AccountType.APPLEPAY){
      let orderData = await this.cartService.orderInfo$.pipe(first()).toPromise();
      orderData["orderTotal"] = orderData.total;
      orderData["fee"] = orderData.useFee;
      await this.nativeProvider.payWithApplePay(NativeData.ORDERS_WITH_APPLE_PAY, orderData).toPromise()
      .catch(async error => await this.onErrorModal(error));
    }

    this.cartService
      .submitOrder(
        this.cartFormState.data[DETAILS_FORM_CONTROL_NAMES.paymentMethod].id,
        this.cartFormState.data[DETAILS_FORM_CONTROL_NAMES.cvv] || null
      )
      .pipe(handleServerError(ORDER_VALIDATION_ERRORS))
      .toPromise()
      .then(async order => await this.showModal(order))
      .catch(async error => await this.onErrorModal(error))
      .finally(this.loadingService.closeSpinner.bind(this.loadingService));
  }

  private getDeliveryLocations(): Observable<any> {
    return this.cartService.merchant$.pipe(
      switchMap(({ id }) => this.merchantService.retrieveDeliveryAddresses(id)),
      map(([, deliveryLocations]) => deliveryLocations)
    );
  }

  private getPickupLocations(): Observable<any> {
    return this.cartService.merchant$.pipe(
      switchMap(({ storeAddress, settings }) =>
        this.merchantService.retrievePickupLocations(
          storeAddress,
          settings.map[MerchantSettings.pickupLocationsEnabled]
        )
      )
    );
  }

  private filterCashlessAccounts(sourceAccounts: UserAccount[]): UserAccount[] {
    return sourceAccounts.filter(
      ({ paymentSystemType, id }) =>
        id === 'rollup' ||
        (paymentSystemType === PAYMENT_SYSTEM_TYPE.OPCS || paymentSystemType === PAYMENT_SYSTEM_TYPE.CSGOLD)
    );
  }

  private filterCreditAccounts(sourceAccounts: UserAccount[]): UserAccount[] {
    return sourceAccounts.filter(
      ({ paymentSystemType }) =>
        paymentSystemType === PAYMENT_SYSTEM_TYPE.MONETRA || paymentSystemType === PAYMENT_SYSTEM_TYPE.USAEPAY
    );
  }

  private filterMealBasedAccounts(sourceAccounts: UserAccount[]): UserAccount[] {
    return sourceAccounts.filter(({ accountType }: UserAccount) => accountType === ACCOUNT_TYPES.meals);
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
    return sourceAccounts.filter(({ accountType }: UserAccount) => accountType !== ACCOUNT_TYPES.meals);
  }

  private addUSAePayCreditCard() {
    this.nativeProvider
      .addUSAePayCreditCard()
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
      });
  }

  private definePaymentSystemType(): Promise<number> {
    return this.settingService.settings$
      .pipe(
        map(settings => {
          const settingInfo = this.settingService.getSettingByName(settings, SYSTEM_SETTINGS_CONFIG.paymentSystem.name);

          return parseInt(settingInfo.value);
        }),
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
    const toast = await this.toastController.create({
      message,
      showCloseButton: true,
      position: 'top',
    });
    await toast.present();
  }
}
