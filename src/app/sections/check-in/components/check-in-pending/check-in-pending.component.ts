import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserFacadeService } from '@core/facades/user/user.facade.service';
import { AddressInfo } from '@core/model/address/address-info';
import { LoadingService } from '@core/service/loading/loading.service';
import { TIMEZONE_REGEXP } from '@core/utils/regexp-patterns';
import { ModalController } from '@ionic/angular';
import {
  CheckingContentCsModel,
} from '@sections/check-in/contents-strings/checkin-content-string.model';
import { CheckingServiceFacade } from '@sections/check-in/services/checkin-facade.service';
import { MerchantOrderTypesInfo, MerchantService } from '@sections/ordering';
import { LOCAL_ROUTING } from '@sections/ordering/ordering.config';
import { RecentOrdersResolver } from '@sections/ordering/resolvers/recent-orders.resolver';
import { Observable, Subscription, zip } from 'rxjs';
import { first, map, take } from 'rxjs/operators';
import { PATRON_NAVIGATION } from 'src/app/app.global';
import { CheckInFailureComponent } from '../check-in-failure/check-in-failure.component';

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
})
export class CheckInPendingComponent implements OnInit, OnDestroy {
  total: number;
  merchantId: string;
  dueTime: string;
  orderId: string;
  checkNumber: number;
  mealBased: boolean;
  orderNew: boolean;
  contentStrings: CheckingContentCsModel = {} as any;
  locationPermissionDisabled: boolean;
  location$: Observable<any>;
  locationSubscription: Subscription;

  data: orderInfo;
  contentString: any;

  constructor(
    private readonly loadingService: LoadingService,
    private readonly checkInService: CheckingServiceFacade,
    private readonly modalController: ModalController,
    private readonly router: Router,
    private readonly merchantService: MerchantService,
    private readonly userFacadeService: UserFacadeService,
    private readonly resolver: RecentOrdersResolver
  ) {}

  ngOnInit() {
    this.setData();
    this.watchLocationChanges();
  }

  watchLocationChanges() {
    this.locationSubscription = this.location$.subscribe(
      ({ coords: { latitude } }) => (this.locationPermissionDisabled = !latitude)
    );
  }

  ngOnDestroy() {
    this.locationSubscription.unsubscribe();
  }

  setData() {
    zip(this.userFacadeService.getUserData$(), this.merchantService.menuMerchants$)
      .pipe(
        first(),
        map(([{ locale, timeZone }, merchants]) => {
          const { storeAddress, orderTypes } = merchants.find(({ id }) => id == this.merchantId);
          const date = new Date(this.dueTime.replace(TIMEZONE_REGEXP, '$1:$2'));
          const pickupTime = date.toLocaleString(locale, { hour12: false, timeZone });
          return { storeAddress, pickupTime: { dueTime: pickupTime }, orderTypes };
        })
      )
      .subscribe(data => (this.data = data));
    this.checkInService.getContentStringByName('pickup_info').toPromise();
  }

  async onClosed() {
    await this.modalController.dismiss({ closed: this.orderNew });
  }

  async goToOrderDetails() {
    const order = (await this.merchantService.recentOrders$.pipe(take(1)).toPromise()).find(
      ({ id }) => id == this.orderId
    );
    if (!order) {
      this.resolver.resolve().then(async () => {
        this.checkInService.navedFromCheckin = true;
        await this.router.navigate([PATRON_NAVIGATION.ordering, LOCAL_ROUTING.recentOrders, this.orderId]);
        this.modalController.dismiss();
      });
    } else {
      this.checkInService.navedFromCheckin = true;
      this.router.navigate([PATRON_NAVIGATION.ordering, LOCAL_ROUTING.recentOrders, this.orderId]);
      this.modalController.dismiss();
    }
  }

  async onScanCode() {
    this.showSuccessModal();
    // this.loadingService.showSpinner();
    // const modal = await this.modalController.create({
    //   component: ScanCodeComponent,
    // });
    // await modal.present();
    // modal.onDidDismiss().then(() => {
    //   if (this.checkInService.barcodeScanResult == null) return;
    //   this.checkInService
    //     .checkInOrderByBarcode(this.orderId, this.checkInService.barcodeScanResult)
    //     .pipe(take(1))
    //     .toPromise()
    //     .then(async res => {
    //       if (res) {
    //         await this.showSuccessModal();
    //       }
    //     })
    //     .catch(async err => await this.onCheckInFailed(err))
    //     .finally(() => this.loadingService.closeSpinner());
    // });
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
      .catch(err => this.onCheckInFailed(err))
      .finally(() => this.loadingService.closeSpinner());
  }

  private async showSuccessModal() {
    await this.modalController.dismiss();
    this.router.navigate([PATRON_NAVIGATION.ordering, 'success'], {
      queryParams: {
        mealBased: this.mealBased,
        orderId: this.orderId,
        total: this.total,
        checkNumber: this.checkNumber,
        data: JSON.stringify(this.data),
      },
      skipLocationChange: true,
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
}
