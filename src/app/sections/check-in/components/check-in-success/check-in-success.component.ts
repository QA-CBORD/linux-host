import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NativeStartupFacadeService } from '@core/facades/native-startup/native-startup.facade.service';
import { ModalController } from '@ionic/angular';
import { CheckingSuccessContentCsModel } from '@sections/check-in/contents-strings/checkin-content-string.model';
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
  ) {}

  ionViewWillEnter() {
    this.nativeStartupFacadeService.blockGlobalNavigationStatus = true;
  }

  ionViewWillLeave() {
    this.nativeStartupFacadeService.blockGlobalNavigationStatus = false;
  }

  async goToRecentOrders() {
    await this.modalController.dismiss();
    await this.router.navigate([PATRON_NAVIGATION.ordering, LOCAL_ROUTING.recentOrders]);
  }
  
  async goToOrderDetails() {
    this.resolver.resolve().then(async () => {
      await this.router.navigate([PATRON_NAVIGATION.ordering, LOCAL_ROUTING.recentOrders, this.orderId]);
      await this.modalController.dismiss();
    });
  }
}
