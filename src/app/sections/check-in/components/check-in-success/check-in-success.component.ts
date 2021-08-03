import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NativeStartupFacadeService } from '@core/facades/native-startup/native-startup.facade.service';
import { ModalController } from '@ionic/angular';
import { APP_ROUTES } from '@sections/section.config';
import { GlobalNavService } from '@shared/ui-components/st-global-navigation/services/global-nav.service';

@Component({
  selector: 'st-check-in-success',
  templateUrl: './check-in-success.component.html',
  styleUrls: ['./check-in-success.component.scss'],
})
export class CheckInSuccessComponent implements OnInit {

  constructor(private readonly router: Router,  private readonly nativeStartupFacadeService: NativeStartupFacadeService) { }

  ngOnInit() {}
  
  ionViewWillEnter() {
    this.nativeStartupFacadeService.blockGlobalNavigationStatus = true;
  }

  ionViewWillLeave() {
    this.nativeStartupFacadeService.blockGlobalNavigationStatus = false;
  }

  goToRecentOrders() {
    this.router.navigate([APP_ROUTES.ordering]);
  }
}
