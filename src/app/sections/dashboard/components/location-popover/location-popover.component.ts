import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { LoadingService } from '@core/service/loading/loading.service';
@Component({
  selector: 'st-location-popover',
  templateUrl: './location-popover.component.html',
  styleUrls: ['./location-popover.component.scss'],
})
export class LocationPermissionModal {
  constructor(
    private readonly modalController: ModalController,
    private readonly androidPermissions: AndroidPermissions,
    private readonly loadingService: LoadingService,
  ) {}

  ionViewWillEnter() {
    this.loadingService.showSpinner();
  }

  ionViewDidEnter() {
    this.loadingService.closeSpinner();
  }

  async requestLocationPermissions() {
    await this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION, this.androidPermissions.PERMISSION.ACCESS_FINE_LOCATION]);
    this.modalController.dismiss();
  }
}
