import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NativeStartupFacadeService } from '@core/facades/native-startup/native-startup.facade.service';
import { LoadingService } from '@core/service/loading/loading.service';
import { ModalController } from '@ionic/angular';
import { CheckingSuccessContentCsModel } from '@sections/check-in/contents-strings/checkin-content-string.model';
import { CheckingServiceFacade } from '@sections/check-in/services/checkin-service-facade';
import { LOCAL_ROUTING } from '@sections/ordering/ordering.config';
import { RecentOrdersResolver } from '@sections/ordering/resolvers/recent-orders.resolver';
import { PATRON_NAVIGATION } from 'src/app/app.global';

@Component({
  selector: 'st-check-in-success',
  templateUrl: './check-in-success.component.html',
  styleUrls: ['./check-in-success.component.scss'],
})
export class CheckInSuccessComponent {
  @Input() total: number;
  @Input() orderId: string;
  @Input() data: any;
  @Input() checkNumber: number;
  @Input() contentString: CheckingSuccessContentCsModel;

  constructor(
    private readonly router: Router,
    private readonly nativeStartupFacadeService: NativeStartupFacadeService,
    private readonly resolver: RecentOrdersResolver,
    private readonly modalController: ModalController,
    private readonly loadingService: LoadingService,
    private readonly checkInService: CheckingServiceFacade
  ) {}

  ionViewWillEnter() {
    this.nativeStartupFacadeService.blockGlobalNavigationStatus = true;
  }

  ionViewWillLeave() {
    this.nativeStartupFacadeService.blockGlobalNavigationStatus = false;
  }

  async goToRecentOrders() {
    await this.modalController.dismiss();
    await this.resolver.resolve();
    await this.router.navigate([PATRON_NAVIGATION.ordering, LOCAL_ROUTING.recentOrders]);
  }

  async goToOrderDetails() {
    this.checkInService.navedFromCheckin = true;
    this.resolver.resolve().then(async () => {
      await this.loadingService.showSpinner();
      await this.modalController.dismiss();
      await this.router.navigate([PATRON_NAVIGATION.ordering, LOCAL_ROUTING.recentOrders, this.orderId]);
      await this.loadingService.closeSpinner();
    });
  }
}