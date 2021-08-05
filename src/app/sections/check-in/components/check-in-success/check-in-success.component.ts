import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NativeStartupFacadeService } from '@core/facades/native-startup/native-startup.facade.service';
import { ModalController } from '@ionic/angular';
import { LOCAL_ROUTING } from '@sections/ordering/ordering.config';
import { RecentOrdersResolver } from '@sections/ordering/resolvers/recent-orders.resolver';
import { PATRON_NAVIGATION } from 'src/app/app.global';

@Component({
  selector: 'st-check-in-success',
  templateUrl: './check-in-success.component.html',
  styleUrls: ['./check-in-success.component.scss'],
})
export class CheckInSuccessComponent implements OnInit {
  @Input() total: number;
  @Input() orderId: string;
  @Input() data: any;

  constructor(
    private readonly router: Router,
    private readonly nativeStartupFacadeService: NativeStartupFacadeService,
    private readonly resolver: RecentOrdersResolver,
    private readonly modalController: ModalController
  ) {}

  ngOnInit() {}

  ionViewWillEnter() {
    this.nativeStartupFacadeService.blockGlobalNavigationStatus = true;
  }

  ionViewWillLeave() {
    this.nativeStartupFacadeService.blockGlobalNavigationStatus = false;
  }

  async goToRecentOrders() {
    await this.router.navigate([PATRON_NAVIGATION.ordering, LOCAL_ROUTING.recentOrders]);
    await this.modalController.dismiss();
  }

  async goToOrderDetails(): Promise<void> {
    this.resolver.resolve().then(async res => {
      await this.router.navigate([PATRON_NAVIGATION.ordering, LOCAL_ROUTING.recentOrders, this.orderId]);
      await this.modalController.dismiss();
    });
  }
}
