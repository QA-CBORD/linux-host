import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserFacadeService } from '@core/facades/user/user.facade.service';
import { AddressInfo } from '@core/model/address/address-info';
import { LoadingService } from '@core/service/loading/loading.service';
import { TIMEZONE_REGEXP } from '@core/utils/regexp-patterns';
import { ModalController } from '@ionic/angular';
import {
  CheckingContentCsModel,
  CheckingSuccessContentCsModel,
} from '@sections/check-in/contents-strings/checkin-content-string.model';
import { CheckingServiceFacade } from '@sections/check-in/services/checkin-service-facade';
import { MerchantOrderTypesInfo, MerchantService } from '@sections/ordering';
import { LOCAL_ROUTING } from '@sections/ordering/ordering.config';
import { RecentOrdersResolver } from '@sections/ordering/resolvers/recent-orders.resolver';
import { ContentStringCategory } from '@shared/model/content-strings/content-strings-api';
import { CommonService } from '@shared/services/common.service';
import { Observable, Subscription, zip } from 'rxjs';
import { first, map, take } from 'rxjs/operators';
import { PATRON_NAVIGATION } from 'src/app/app.global';
import { CheckInFailureComponent } from '../check-in-failure/check-in-failure.component';
import { CheckInSuccessComponent } from '../check-in-success/check-in-success.component';
import { ScanCodeComponent } from '../scan-code/scan-code.component';

@Component({
  selector: 'st-check-in-pending',
  templateUrl: './check-in-pending.component.html',
  styleUrls: ['./check-in-pending.component.scss'],
})
export class CheckInPendingComponent implements OnInit, OnDestroy {
  @Input() total: number;
  @Input() merchantId: string;
  @Input() dueTime: string;
  @Input() orderId: string;
  @Input() checkNumber: number;
  @Input() mealBased: boolean;
  @Input() contentStrings: CheckingContentCsModel = {} as any;
  @Input() locationPermissionDisabled: boolean;
  location$: Observable<any>; // GeolocationPosition
  locationSubscription: Subscription;

  data: {
    pickupTime: { dueTime: string };
    storeAddress: AddressInfo;
    orderTypes: MerchantOrderTypesInfo;
  } = <any>{};
  contentString: any;

  constructor(
    private readonly loadingService: LoadingService,
    private readonly checkInService: CheckingServiceFacade,
    private readonly modalController: ModalController,
    private readonly router: Router,
    private readonly merchantService: MerchantService,
    private readonly userFacadeService: UserFacadeService,
    private readonly resolver: RecentOrdersResolver,
    private readonly commonService: CommonService
  ) {}

  ngOnInit() {
    this.setData();
    this.watchLocationChanges();
    this.checkinSuccessCs();
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
  }

  async onClosed() {
    await this.modalController.dismiss(); // bad
  }

  async goToOrderDetails() {
    this.resolver.resolve().then(async () => {
      await this.modalController.dismiss();
      this.router.navigate([PATRON_NAVIGATION.ordering, LOCAL_ROUTING.recentOrders, this.orderId]);
    });
  }

  async onScanCode() {
    this.loadingService.showSpinner();
    const modal = await this.modalController.create({
      component: ScanCodeComponent,
    });
    await modal.present();
    modal.onDidDismiss().then(() => {
      if (this.checkInService.barcodeScanResult == null) return;
      this.checkInService
        .checkInOrderByBarcode(this.orderId, this.checkInService.barcodeScanResult)
        .pipe(take(1))
        .toPromise()
        .then(async res => {
          if (res) {
            await this.showSuccessModal();
          }
        })
        .catch(async err => await this.onCheckInFailed(err))
        .finally(() => this.loadingService.closeSpinner());
    });
  }

  async onLocationCheckinClicked() {
    if (this.locationPermissionDisabled) return;

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
    const modal = await this.modalController.create({
      component: CheckInSuccessComponent,
      componentProps: {
        orderId: this.orderId,
        total: this.total,
        checkNumber: this.checkNumber,
        data: this.data,
        contentString: this.contentString,
      },
    });
    await modal.present();
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

  private checkinSuccessCs() {
    (async () => {
      this.contentString = await this.commonService
        .loadContentString<CheckingSuccessContentCsModel>(ContentStringCategory.checkinSuccess)
        .pipe(take(1))
        .toPromise();
    })();
  }
}
