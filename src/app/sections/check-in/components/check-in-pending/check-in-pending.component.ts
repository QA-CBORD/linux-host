import { AfterContentChecked, AfterViewChecked, AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SupportedFormat } from '@capacitor-community/barcode-scanner';
import { AddressInfo } from '@core/model/address/address-info';
import { CoordsService } from '@core/service/coords/coords.service';
import { LoadingService } from '@core/service/loading/loading.service';
import { AlertController, ModalController, Platform, PopoverController } from '@ionic/angular';
import { CHECKIN_ROUTES } from '@sections/check-in/check-in-config';
import { CheckingContentCsModel } from '@sections/check-in/contents-strings/check-in-content-string.model';
import { CheckingServiceFacade } from '@sections/check-in/services/check-in-facade.service';
import {
  CartService,
  MenuInfo,
  MerchantInfo,
  MerchantOrderTypesInfo,
  MerchantService,
  OrderDetailOptions,
  OrderInfo,
  OrderPayment,
} from '@sections/ordering';
import { LOCAL_ROUTING, MerchantSettings } from '@sections/ordering/ordering.config';
import { RecentOrdersResolver } from '@sections/ordering/resolvers/recent-orders.resolver';
import { LockDownService } from '@shared/services';
import { Observable, Subscription, firstValueFrom, of } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { PATRON_NAVIGATION } from 'src/app/app.global';
import { CheckInFailureComponent } from '../check-in-failure/check-in-failure.component';
import { PickCheckinModeComponent } from '../pick-checkin-mode/pick-checkin-mode.component';
import { ScanCodeComponent } from '../scan-code/scan-code.component';
export interface orderInfo {
  pickupTime: {
    dueTime: string;
  };
  storeAddress: AddressInfo;
  orderTypes: MerchantOrderTypesInfo;
}

@Component({
  templateUrl: './check-in-pending.component.html',
  styleUrls: ['./check-in-pending.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckInPendingComponent implements OnInit, AfterViewChecked, AfterViewInit, AfterContentChecked {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  contentStrings: any;
  locationPermissionDisabled: boolean;
  locationSubscription: Subscription;
  routeSubscription: Subscription;
  orderDetailOptions$: Observable<OrderDetailOptions>;

  data: orderInfo;
  total: number;
  merchantId: string;
  dueTime: string;
  orderId: string;
  checkNumber: number;
  menuInfo$: Observable<MenuInfo>;
  isExistingOrder: boolean;
  merchant: MerchantInfo;
  addToCartEnabled: boolean;
  orderPayment: OrderPayment;
  order$: Observable<OrderInfo>;


  constructor(
    private readonly loadingService: LoadingService,
    private readonly checkInService: CheckingServiceFacade,
    private readonly modalController: ModalController,
    protected readonly alertCtrl: AlertController,
    protected readonly popoverCtrl: PopoverController,
    private readonly router: Router,
    private readonly merchantService: MerchantService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly resolver: RecentOrdersResolver,
    private readonly coordsService: CoordsService,
    private readonly cdRef: ChangeDetectorRef,
    private platform: Platform,
    private readonly cartService: CartService,
    private readonly lockDownService: LockDownService,
  ) {}

  ngOnInit() {
    this.setData();
    this.watchLocationChanges();
    this.hardwareBackButton();
  }

  ionViewWillEnter() {
    this.loadingService.closeSpinner();
    this.cdRef.detectChanges();
  }

  ngAfterContentChecked(): void {
    document.getElementById('modal-mainTitle')?.focus();
  }
  ngAfterViewChecked(): void {
    document.getElementById('modal-mainTitle')?.focus();
  }

  ngAfterViewInit(): void {
    document.getElementById('modal-mainTitle')?.focus();
  }

  async onAddItems() {
    const {
      orderType,
      pickupTime: { dueTime },
      storeAddress: address,
      merchant,
      isASAP,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } = <any> this.data;

    if (this.lockDownService.isLockDownOn()) {
      return;
    }

    await this.cartService.onAddItems({
      merchant,
      orderOptions: { dueTime: new Date(dueTime), orderType, address, isASAP },
      orderId: this.orderId,
      orderPayment: this.orderPayment,
    });
    this.router.navigate([PATRON_NAVIGATION.ordering, LOCAL_ROUTING.fullMenu], {
      queryParams: { isExistingOrder: true },
    });
  }

  async onCheckingClicked() {
    const modal = await this.popoverCtrl.create({
      component: PickCheckinModeComponent,
      cssClass: 'sc-popover',
      mode: 'md',
      backdropDismiss: false,
      componentProps: {
        contentStrings: this.contentStrings,
        locationPermissionDisabled: this.locationPermissionDisabled,
      },
    });

    modal.onDidDismiss().then(({ data }) => {
      if (data) {
        const { handler } = data;
        if (/onScanCode/.test(handler) || /onLocationCheckinClicked/.test(handler)) {
          this[handler]();
        }
      }
    });

    await modal.present();
  }

  async onClosed() {
    const path = this.activatedRoute.snapshot.queryParams.path;
    if (path.includes(LOCAL_ROUTING.recentOrders)) {
      await this.resolver.resolve();
      await this.router.navigate([PATRON_NAVIGATION.ordering, LOCAL_ROUTING.recentOrders]);
    } else {
      await this.router.navigate([PATRON_NAVIGATION.ordering]);
    }
  }

  async goToOrderDetails() {
    const order = (await this.merchantService.recentOrders$.pipe(take(1)).toPromise()).find(
      ({ id }) => id == this.orderId
    );
    if (!order || this.isExistingOrder) {
      this.resolver.resolve().then(() => {
        this.checkInService.navedFromCheckin = true;
        this.router.navigate([PATRON_NAVIGATION.ordering, LOCAL_ROUTING.recentOrders, this.orderId]);
      });
    } else {
      this.checkInService.navedFromCheckin = true;
      this.router.navigate([PATRON_NAVIGATION.ordering, LOCAL_ROUTING.recentOrders, this.orderId]);
    }
  }

  async onScanCode() {
    const modal = await this.modalController.create({
      component: ScanCodeComponent,
      cssClass: 'scan-modal',
      backdropDismiss: false,
      componentProps: {
        formats: [SupportedFormat.QR_CODE],
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        title: (<any> this.contentStrings).scan_code_title,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        prompt: (<any> this.contentStrings).scan_code_prompt,
      },
    });
    await modal.present();
    modal.onDidDismiss().then(({ data }) => {
      const { scanCodeResult } = data;
      if (scanCodeResult == null) {
        return;
      }
      this.checkInService
        .checkInOrderByBarcode(this.orderId, scanCodeResult)
        .pipe(take(1))
        .toPromise()
        .then(async res => {
          if (res) {
            await this.showSuccessModal();
          }
        })
        .catch(async err => await this.onCheckInFailed(err));
    });
  }

  async onLocationCheckinClicked() {
    this.loadingService.showSpinner();
    await this.checkInService
      .checkInOrderByLocation(this.orderId)
      .toPromise()
      .then(async res => {
        if (res) {
          await this.showSuccessModal();
        }
      })
      .catch(err => this.onCheckInFailed(err));
  }

  private async showSuccessModal() {
    const orderDetailOptions = await firstValueFrom(this.orderDetailOptions$);

    await this.router.navigate([PATRON_NAVIGATION.ordering, CHECKIN_ROUTES.success], {
      queryParams: {
        orderId: this.orderId,
        total: this.total,
        checkNumber: this.checkNumber,
        data: JSON.stringify(this.data),
        orderDetailOptions: JSON.stringify(orderDetailOptions),
      },
    });
  }

  private async onCheckInFailed({ message: errorMessage }) {
    const modal = await this.modalController.create({
      component: CheckInFailureComponent,
      componentProps: {
        errorMessage,
        contentStrings: this.contentStrings,
        orderId: this.orderId,
        checkNumber: this.checkNumber,
      },
    });
    modal.onDidDismiss().then(async ({ data }) => {
      if (data?.scancode) {
        await this.onScanCode();
      }
    });
    await modal.present();
  }

  private setData() {
    this.orderDetailOptions$ = this.cartService.orderDetailsOptions$;
    this.menuInfo$ = this.cartService.menuInfo$;
    this.order$ = this.merchantService.recentOrders$.pipe(map(orders => orders.find(({ id }) => id === this.orderId)));
    this.routeSubscription = this.activatedRoute.data.pipe(take(1)).subscribe(response => {
      this.setProps(response);
    });
  }

  private watchLocationChanges() {
    this.locationSubscription = this.coordsService.location$.pipe(take(1)).subscribe(location => {
      if (!location || !location.coords) return of(null);
      this.locationPermissionDisabled = !(location.coords.latitude && location.coords.longitude);
    });
  }

  private hardwareBackButton() {
    this.platform.backButton.subscribeWithPriority(10, async () => {
      this.onClosed();
    });
  }

  private async setProps(response) {
    const { contentStrings, orderId, total, checkNumber, data, orderPayment, isExistingOrder, type } = response.data;
    const { content } = contentStrings;
    this.data = <orderInfo>data;
    this.contentStrings = <CheckingContentCsModel>content;
    this.orderId = orderId;
    this.total = total;
    this.checkNumber = checkNumber;
    this.merchant = data.merchant;
    this.merchantId = data.merchant.id;
    this.dueTime = data.pickupTime.dueTime;
    this.isExistingOrder = isExistingOrder;
    const res = this.merchant.settings.map[MerchantSettings.addToCartEnabled];
    this.addToCartEnabled = res.value && !!JSON.parse(res.value);
    this.orderPayment = JSON.parse(orderPayment);

    const orderDetailOptions = await firstValueFrom(this.orderDetailOptions$);

    if (!orderDetailOptions) {
      this.orderDetailOptions$ = of({
        orderType: type,
        address: {} as AddressInfo,
        dueTime: new Date(this.dueTime),
        isASAP: false,
      });
    }
  }
}
