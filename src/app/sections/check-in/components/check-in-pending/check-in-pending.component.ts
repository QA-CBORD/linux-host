import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AddressInfo } from '@core/model/address/address-info';
import { CoordsService } from '@core/service/coords/coords.service';
import { LoadingService } from '@core/service/loading/loading.service';
import { ModalController } from '@ionic/angular';
import { CHECKIN_ROUTES } from '@sections/check-in/check-in-config';
import { CheckingContentCsModel } from '@sections/check-in/contents-strings/check-in-content-string.model';
import { CheckingServiceFacade } from '@sections/check-in/services/check-in-facade.service';
import { MerchantOrderTypesInfo, MerchantService } from '@sections/ordering';
import { LOCAL_ROUTING } from '@sections/ordering/ordering.config';
import { RecentOrdersResolver } from '@sections/ordering/resolvers/recent-orders.resolver';
import { GlobalNavService } from '@shared/ui-components/st-global-navigation/services/global-nav.service';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { PATRON_NAVIGATION } from 'src/app/app.global';
import { CheckInFailureComponent } from '../check-in-failure/check-in-failure.component';
import { Barcode, ScanCodeComponent } from '../scan-code/scan-code.component';

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
export class CheckInPendingComponent implements OnInit, OnDestroy {
  contentStrings: CheckingContentCsModel;
  locationPermissionDisabled: boolean;
  locationSubscription: Subscription;
  routeSubscription: Subscription;

  data: orderInfo;
  total: number;
  merchantId: string;
  dueTime: string;
  orderId: string;
  checkNumber: number;
  mealBased = false;
  orderNew: boolean;
  scanCode: any;

  constructor(
    private readonly loadingService: LoadingService,
    private readonly checkInService: CheckingServiceFacade,
    private readonly modalController: ModalController,
    private readonly merchantService: MerchantService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly resolver: RecentOrdersResolver,
    private readonly coordsService: CoordsService,
    private readonly globalNav: GlobalNavService,
    private readonly cdRef: ChangeDetectorRef,
    private readonly router: Router
  ) {}

  ngOnInit() {
    this.setData();
    this.watchLocationChanges();
  }

  ngOnDestroy() {
    this.locationSubscription.unsubscribe();
    this.routeSubscription.unsubscribe();
  }

  ionViewWillLeave() {
    this.globalNav.showNavBar();
  }

  ionViewWillEnter() {
    this.globalNav.hideNavBar();
    this.loadingService.closeSpinner();
    this.cdRef.detectChanges();
  }

  ionViewDidEnter() {
    this.globalNav.hideNavBar();
  }

  async onClosed() {
    await this.loadingService.showSpinner();
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
    if (!order) {
      this.loadingService.showSpinner();
      this.resolver.resolve().then(async () => {
        this.checkInService.navedFromCheckin = true;
        await this.router.navigate([PATRON_NAVIGATION.ordering, LOCAL_ROUTING.recentOrders, this.orderId]);
      });
    } else {
      this.checkInService.navedFromCheckin = true;
      await this.router.navigate([PATRON_NAVIGATION.ordering, LOCAL_ROUTING.recentOrders, this.orderId]);
    }
  }

  async onScanCode() {
    const modal = await this.modalController.create({
      component: ScanCodeComponent,
      cssClass: 'scan-modal',
      backdropDismiss: false,
      componentProps: {
        formats: [Barcode.QRCode],
        title: this.scanCode.title,
      },
    });
    await modal.present();
    modal.onDidDismiss().then(({ data }) => {
      const { scanCodeResult } = data;
      if (scanCodeResult == null) {
        return;
      }
      alert('scanCodeResult: ' + scanCodeResult);
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
    await this.router.navigate([PATRON_NAVIGATION.ordering, CHECKIN_ROUTES.success], {
      queryParams: {
        mealBased: this.mealBased,
        orderId: this.orderId,
        total: this.total,
        checkNumber: this.checkNumber,
        data: JSON.stringify(this.data),
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
      if (data.scancode) {
        await this.onScanCode();
      }
    });
    await modal.present();
  }

  private setData() {
    this.routeSubscription = this.activatedRoute.data.subscribe(response => {
      const {
        contentStrings,
        mealBased,
        orderId,
        total,
        checkNumber,
        merchantId,
        dueTime,
        data,
        orderNew,
        scanCode,
      } = response.data;
      const { content } = contentStrings;
      this.data = <orderInfo>data;
      this.contentStrings = <CheckingContentCsModel>content;
      this.mealBased = mealBased ? null : mealBased;
      this.orderId = orderId;
      this.total = total;
      this.checkNumber = checkNumber;
      this.merchantId = merchantId;
      this.dueTime = dueTime;
      this.orderNew = orderNew;
      this.scanCode = scanCode;
    });
  }

  private watchLocationChanges() {
    this.locationSubscription = this.coordsService.location$.subscribe(({ coords: { latitude, longitude } }) => {
      this.locationPermissionDisabled = !(latitude && longitude);
    });
  }
}
