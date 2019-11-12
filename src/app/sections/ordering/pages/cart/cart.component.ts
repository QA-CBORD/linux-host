import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { CartService } from '@sections/ordering/services/cart.service';
import { Observable, zip } from 'rxjs';
import {
  AddressModalSettings,
  DETAILS_FORM_CONTROL_NAMES,
  MerchantService,
  OrderDetailsFormData,
  OrderInfo,
} from '@sections/ordering';
import { first, map, switchMap, tap } from 'rxjs/operators';
import {
  ACCOUNT_TYPES,
  MerchantSettings,
  ORDER_TYPE,
  ORDER_VALIDATION_ERRORS,
  PAYMENT_SYSTEM_TYPE,
  SYSTEM_SETTINGS_CONFIG,
} from '@sections/ordering/ordering.config';
import { LoadingService } from '@core/service/loading/loading.service';
import { SettingService } from '@core/service/settings/setting.service';
import { ActivatedRoute, Router } from '@angular/router';
import { handleServerError, parseArrayFromString } from '@core/utils/general-helpers';
import { UserAccount } from '@core/model/account/account.model';
import { ModalController, ToastController } from '@ionic/angular';
import { AddressInfo } from '@core/model/address/address-info';
import { NAVIGATE } from '../../../../app.global';
import { SuccessModalComponent } from '@sections/ordering/pages/cart/components/success-modal';

@Component({
  selector: 'st-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartComponent implements OnInit {
  order$: Observable<Partial<OrderInfo>>;
  addressModalSettings$: Observable<AddressModalSettings>;
  address$: Observable<AddressInfo>;
  address1$: Observable<AddressInfo>;

  accounts: UserAccount[];
  cartFormState: OrderDetailsFormData;

  constructor(private readonly cartService: CartService,
              private readonly merchantService: MerchantService,
              private readonly loadingService: LoadingService,
              private readonly settingService: SettingService,
              private readonly activatedRoute: ActivatedRoute,
              private readonly toastController: ToastController,
              private readonly cdRef: ChangeDetectorRef,
              private readonly router: Router,
              private readonly modalController: ModalController) {
  }

  ngOnInit() {
    this.order$ = this.cartService.orderInfo$;
    this.address$ = this.cartService.orderDetailsOptions$.pipe(
      map(({ address }) => address)
    );
    this.addressModalSettings$ = this.initAddressModalConfig();
    this.getAvailableAccounts().then((acc) => this.accounts = acc);
  }

  initAddressModalConfig(): Observable<AddressModalSettings> {
    this.loadingService.showSpinner();
    return zip(
      this.cartService.orderDetailsOptions$,
      this.merchantService.retrieveBuildings(),
      this.cartService.merchant$,
      this.getDeliveryLocations(),
      this.getPickupLocations(),
    ).pipe(
      map(([
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
      })),
      tap(this.loadingService.closeSpinner.bind(this.loadingService)),
    );
  }

  onCartStateFormChanged(state) {
    this.cartService.updateOrderAddress(state.data[DETAILS_FORM_CONTROL_NAMES.address]);
    this.cartFormState = state;
  }

  async onSubmit() {
    if (!this.cartFormState.valid) return;

    await this.loadingService.showSpinner();
    this.cartService.submitOrder(
      this.cartFormState.data[DETAILS_FORM_CONTROL_NAMES.paymentMethod].id,
      this.cartFormState.data[DETAILS_FORM_CONTROL_NAMES.cvv] || null,
    ).pipe().toPromise()
      .then(async order => await this.showModal(order))
      .finally( this.loadingService.closeSpinner.bind(this.loadingService));
  }

  async showModal({ tax, total, subTotal, orderPayment: [{ accountName }], deliveryFee, pickupFee, tip, checkNumber }: OrderInfo) {
    const modal = await this.modalController.create({
      component: SuccessModalComponent,
      componentProps: {
        tax,
        total,
        subTotal,
        deliveryFee,
        pickupFee,
        tip,
        checkNumber,
        accountName,
      },
    });

    modal.onDidDismiss().then(async () => {
      await this.router.navigate([`../../`], { skipLocationChange: true, relativeTo: this.activatedRoute });

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
    const onError = async (message) => {
      await this.onValidateErrorToast(message);
      this.cartService.addOrderItems(removedItem);
    };
    await this.validateOrder(onError);
    this.cdRef.reattach();
  }

  private async onValidateErrorToast(message: string) {
    const toast = await this.toastController.create({
      message,
      showCloseButton: true,
      position: 'top',
    });
    await toast.present();
  }

  private getDeliveryLocations(): Observable<any> {
    return this.cartService.merchant$.pipe(
      switchMap(({ id }) => this.merchantService.retrieveDeliveryAddresses(id)),
      map(([, deliveryLocations]) => deliveryLocations));
  }

  private getPickupLocations(): Observable<any> {
    return this.cartService.merchant$.pipe(
      switchMap(({ storeAddress, settings }) => this.merchantService.retrievePickupLocations(
        storeAddress, settings.map[MerchantSettings.pickupLocationsEnabled],
      )),
    );
  }

  private async getAvailableAccounts(): Promise<UserAccount[]> {
    let accounts = [];
    const { data: [settings, accInfo] } = await this.activatedRoute.data.pipe(first()).toPromise();
    const displayTenderSetting = this.settingService.getSettingByName(settings, SYSTEM_SETTINGS_CONFIG.displayTenders.name);
    const displayCreditCardSetting = this.settingService.getSettingByName(settings, SYSTEM_SETTINGS_CONFIG.displayCreditCard.name);
    const displayTenders = displayTenderSetting ? parseArrayFromString<string>(displayTenderSetting.value) : [];
    const displayCreditCards = displayCreditCardSetting ? parseArrayFromString<string>(displayCreditCardSetting.value) : [];
    const { mealBased } = await this.cartService.menuInfo$.pipe(first()).toPromise();

    if (accInfo.cashlessAccepted && !accInfo.rollOverr) {
      accounts = [...accounts, ...this.filterCashlessAccounts(accInfo.accounts, displayTenders)];
    }
    if (accInfo.creditAccepted) {
      accounts = [...accounts, ...this.filterCreditAccounts(accInfo.accounts, displayCreditCards)];
    }
    if (accInfo.rollOver) {
      accounts = [...accounts, ...this.filterRollupAccounts(accInfo.accounts)];
    }
    if (mealBased) {
      accounts = [...accounts, ...this.filterMealBasedAccounts(accInfo.accounts)];
    }

    return accounts;
  }

  private async validateOrder(onError): Promise<void> {
    await this.loadingService.showSpinner();
    await this.cartService.validateOrder().pipe(
      first(),
      handleServerError<OrderInfo>(ORDER_VALIDATION_ERRORS),
    ).toPromise()
      .catch(onError)
      .finally(this.loadingService.closeSpinner.bind(this.loadingService));
  }

  private filterCashlessAccounts(sourceAccounts: UserAccount[], displayTenders: string[]): UserAccount[] {
    return sourceAccounts.filter(({ paymentSystemType, accountTender }) =>
      (paymentSystemType === PAYMENT_SYSTEM_TYPE.OPCS || paymentSystemType === PAYMENT_SYSTEM_TYPE.CSGOLD)
      && displayTenders.includes(accountTender),
    );
  }

  private filterCreditAccounts(sourceAccounts: UserAccount[], displayCreditCards: string[]): UserAccount[] {
    return sourceAccounts.filter(({ paymentSystemType, id }) =>
      (paymentSystemType === PAYMENT_SYSTEM_TYPE.MONETRA || paymentSystemType === PAYMENT_SYSTEM_TYPE.USAEPAY)
      && displayCreditCards.includes(id),
    );
  }

  private filterRollupAccounts(sourceAccounts: UserAccount[]): UserAccount[] {
    return sourceAccounts.filter(acc => acc.id === 'rollup');
  }

  private filterMealBasedAccounts(sourceAccounts: UserAccount[]): UserAccount[] {
    return sourceAccounts.filter(({ accountType }: UserAccount) => accountType === ACCOUNT_TYPES.meals);
  }
}
