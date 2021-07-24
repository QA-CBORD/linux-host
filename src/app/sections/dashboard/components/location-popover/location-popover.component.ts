import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
@Component({
  selector: 'st-location-popover',
  templateUrl: './location-popover.component.html',
  styleUrls: ['./location-popover.component.scss'],
})
export class LocationPermissionModal {
  constructor(
    private readonly modalController: ModalController,
    private readonly androidPermissions: AndroidPermissions
  ) {}

  async askForLocation() {
    await this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION, this.androidPermissions.PERMISSION.ACCESS_FINE_LOCATION]);
    this.modalController.dismiss();
  }
}
