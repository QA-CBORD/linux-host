import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CartService, OrderDetailOptions } from '@sections/ordering/services/cart.service';
import { combineLatest, Observable, from } from 'rxjs';
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
import { finalize, first, map, switchMap, tap } from 'rxjs/operators';
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
import { ActivatedRoute, Router } from '@angular/router';
import { handleServerError, isCashlessAccount, isCreditCardAccount, isMealsAccount } from '@core/utils/general-helpers';
import { UserAccount } from '@core/model/account/account.model';
import { ModalController, PopoverController } from '@ionic/angular';
import { AccountType, PATRON_NAVIGATION, Settings } from '../../../../app.global';
import { SuccessModalComponent } from '@sections/ordering/pages/cart/components/success-modal';
import { StGlobalPopoverComponent } from '@shared/ui-components';
import { MerchantInfo, MerchantOrderTypesInfo } from '@sections/ordering/shared/models';
import { OrderingComponentContentStrings, OrderingService } from '@sections/ordering/services/ordering.service';
import { UserFacadeService } from '@core/facades/user/user.facade.service';
import { SettingsFacadeService } from '@core/facades/settings/settings-facade.service';
import { ExternalPaymentService } from '@core/service/external-payment/external-payment.service';
import { ApplePay } from '@core/model/add-funds/applepay-response.model';
import { Plugins } from '@capacitor/core';
import { ToastService } from '@core/service/toast/toast.service';
const { Browser } = Plugins;

@Component({
  selector: 'st-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartComponent implements OnInit {
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
  placingOrder: boolean = false;

  constructor(
    private readonly cartService: CartService,
    private readonly merchantService: MerchantService,
    private readonly loadingService: LoadingService,
    private readonly settingsFacadeService: SettingsFacadeService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly toastService: ToastService,
    private readonly popoverController: PopoverController,
    private readonly cdRef: ChangeDetectorRef,
    private readonly router: Router,
    private readonly modalController: ModalController,
    private readonly orderingService: OrderingService,
    private readonly userFacadeService: UserFacadeService,
    private externalPaymentService: ExternalPaymentService
  ) {}

  ionViewWillEnter() {
    this.accounts$ = this.getAvailableAccounts();
    this.cdRef.detectChanges();
  }

  ngOnInit() {
    this.order$ = this.cartService.orderInfo$;
    this.merchant$ = this.cartService.merchant$;
    this.orderTypes$ = this.merchantService.orderTypes$;
    this.orderDetailOptions$ = this.cartService.orderDetailsOptions$;
    this.addressModalSettings$ = this.initAddressModalConfig();
    this.accountInfoList$ = this.activatedRoute.data.pipe(map(({ data: [, accInfo] }) => accInfo));
    this.applePayEnabled$ = this.userFacadeService.isApplePayEnabled$();
    this.initContentStrings();
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
    this.router.navigate([PATRON_NAVIGATION.ordering, LOCAL_ROUTING.itemDetail], {
      queryParams: { menuItemId: menuItemId, orderItemId: id, isItemExistsInCart: true },
    });
  }

  onCartStateFormChanged(state) {
    this.cartService.updateOrderAddress(state.data[DETAILS_FORM_CONTROL_NAMES.address]);
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
        this.router.navigate([PATRON_NAVIGATION.accounts, ACCOUNT_LOCAL_ROUTING.addCreditCard]);

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
      await this.router.navigate([PATRON_NAVIGATION.ordering]);
    });

    await modal.present();
  }

  private async onErrorModal(message: string, cb?: () => void) {
    const modal = await this.popoverController.create({
      component: StGlobalPopoverComponent,
      componentProps: {
        data: {
          title: 'Oooops', /// xD
          message,
        },
      },
      animated: false,
      backdropDismiss: true,
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
      this.router.navigate([PATRON_NAVIGATION.ordering, LOCAL_ROUTING.fullMenu]);
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
    await this.router.navigate([PATRON_NAVIGATION.ordering, LOCAL_ROUTING.fullMenu], {
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
    let accountId = this.cartFormState.data[DETAILS_FORM_CONTROL_NAMES.paymentMethod].id;
    this.cartService.updateOrderNote(this.cartFormState.data[DETAILS_FORM_CONTROL_NAMES.note]);

    /// if Apple Pay Order
    if (this.cartFormState.data.paymentMethod.accountType === AccountType.APPLEPAY) {
      let orderData = await this.cartService.orderInfo$.pipe(first()).toPromise();

      Browser.addListener('browserFinished', (info: any) => {
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
        .catch(async error => {
          this.placingOrder = false;
          return await this.onErrorModal('Something went wrong, please try again...');
        })
        .finally(() => {
          this.placingOrder = false;
        });
    }

    this.cartService
      .submitOrder(accountId, this.cartFormState.data[DETAILS_FORM_CONTROL_NAMES.cvv] || null)
      .pipe(handleServerError(ORDER_VALIDATION_ERRORS))
      .toPromise()
      .then(async order => await this.showModal(order))
      .catch(async (error: string | [string, string]) => {
        if (Array.isArray(error) && +error[0] === +ORDER_ERROR_CODES.ORDER_CAPACITY) {
          await this.onErrorModal(error[1], this.navigateToFullMenu.bind(this));
        } else if (typeof error === 'string') {
          await this.onErrorModal(error);
        }
      })
      .finally(() => {
        this.loadingService.closeSpinner();
        this.placingOrder = false;
      });
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
  }
}
