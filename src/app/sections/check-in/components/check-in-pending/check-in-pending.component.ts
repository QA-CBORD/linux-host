import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserFacadeService } from '@core/facades/user/user.facade.service';
import { AddressInfo } from '@core/model/address/address-info';
import { LoadingService } from '@core/service/loading/loading.service';
import { TIMEZONE_REGEXP } from '@core/utils/regexp-patterns';
import { ModalController } from '@ionic/angular';
import { CheckingContentCsModel } from '@sections/check-in/contents-strings/checkin-content-string.model';
import { CheckingServiceFacade } from '@sections/check-in/services/checkin-service-facade';
import { MerchantOrderTypesInfo, MerchantService, OrderInfo } from '@sections/ordering';
import { LOCAL_ROUTING } from '@sections/ordering/ordering.config';
import { RecentOrdersResolver } from '@sections/ordering/resolvers/recent-orders.resolver';
import { Observable, zip } from 'rxjs';
import { finalize, first, map, tap } from 'rxjs/operators';
import { PATRON_NAVIGATION } from 'src/app/app.global';
import { CheckInFailureComponent } from '../check-in-failure/check-in-failure.component';

@Component({
  selector: 'st-check-in-pending',
  templateUrl: './check-in-pending.component.html',
  styleUrls: ['./check-in-pending.component.scss'],
})
export class CheckInPendingComponent implements OnInit {
  @Input() total: number;
  @Input() merchantId: string;
  @Input() dueTime: string;
  @Input() orderId: string;
  data: {
    pickupTime: { dueTime: string };
    storeAddress: AddressInfo;
    orderTypes: MerchantOrderTypesInfo;
  } = <any>{};
  locationPermissionDisabled$: Observable<boolean>;
  contentStrings: CheckingContentCsModel = {} as any;
  locationDisabled: boolean;
  constructor(
    private readonly loadingService: LoadingService,
    private readonly checkInService: CheckingServiceFacade,
    private readonly modalController: ModalController,
    private readonly router: Router,
    private readonly merchantService: MerchantService,
    private readonly userFacadeService: UserFacadeService,
    private readonly resolver: RecentOrdersResolver,
    private readonly changeDetection: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.init();
    console.log(this.contentStrings);
    console.log(this.dueTime);
    console.log(this.merchantId);
    console.log(this.orderId);
    this.setData();
  }

  async init() {
    this.loadingService.showSpinner();
    const { content } = <any>await this.checkInService.getContent();
    this.contentStrings = content;
    this.locationPermissionDisabled$ = this.checkInService.locationPermissionDisabled().pipe(
      tap(disabled => (this.locationDisabled = disabled)),
      finalize(() => this.loadingService.closeSpinner())
    );
  }

  setData() {
    zip(this.userFacadeService.getUserData$(), this.merchantService.menuMerchants$)
      .pipe(
        first(),
        map(([{ locale, timeZone }, merchants]) => {
          const { storeAddress, orderTypes } = merchants.find(({ id }) => id == this.merchantId);
          const date = new Date(this.dueTime.replace(TIMEZONE_REGEXP, '$1:$2'));
          const pickupTime = date.toLocaleString(locale, { hour12: false, timeZone });
          console.log(storeAddress, pickupTime, orderTypes);
          return { storeAddress, pickupTime: { dueTime: pickupTime }, orderTypes };
        })
      )
      .subscribe(data => (this.data = data));
  }

  async onClosed() {
    await this.modalController.dismiss();
  }

  async goToOrderDetails(): Promise<void> {
    this.resolver.resolve().then(async res => {
      console.log('response ==>> ', res);
      await this.modalController.dismiss();
      this.router.navigate([PATRON_NAVIGATION.ordering, LOCAL_ROUTING.recentOrders, this.orderId]);
    });
  }

  onScanCodeClicked() {
    // open scanCode component here...
  }

  async onLocationCheckinClicked() {
    if (this.locationDisabled) return;

    this.loadingService.showSpinner();
    await this.checkInService
      .checkInOrder(this.orderId)
      .toPromise()
      .then(res => {
        // redirect to checkin success here..
        console.log(res);
        if (res) {
        } else {
          this.onCheckInFailed(res);
        }
      })
      .catch(err => this.onCheckInFailed(err))
      .finally(() => this.loadingService.closeSpinner());
  }

  private async onCheckInFailed(arg) {
    console.log('arg: ', arg);
    const modal = await this.modalController.create({
      component: CheckInFailureComponent,
      componentProps: {
        contentStrings: this.contentStrings,
      },
    });

    // modal.onDidDismiss().then(async () => {
    //   await this.routingService.navigate([APP_ROUTES.ordering]);
    // });

    await modal.present();
  }
}
