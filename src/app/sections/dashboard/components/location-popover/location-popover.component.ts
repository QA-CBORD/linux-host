import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { LoadingService } from '@core/service/loading/loading.service';
import { Plugins } from '@capacitor/core';
import { NavigationFacadeSettingsService } from '@shared/ui-components/st-global-navigation/services/navigation-facade-settings.service';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';

const { Geolocation } = Plugins;
@Component({
  selector: 'st-location-popover',
  templateUrl: './location-popover.component.html',
  styleUrls: ['./location-popover.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class LocationPermissionModal {
  constructor(
    private readonly modalController: ModalController,
    private readonly loadingService: LoadingService,
    private readonly navigationFacade: NavigationFacadeSettingsService,
    private readonly androidPermissions: AndroidPermissions
  ) {}

  private readonly WAIT_IMAGE_RENDERING = 2500;

  ionViewWillEnter() {
    this.loadingService.showSpinner();
  }

  ionViewDidEnter() {
    setTimeout(() => {
      this.loadingService.closeSpinner();
    }, this.WAIT_IMAGE_RENDERING);
  }

  async requestLocationPermissions() {
    await this.modalController.dismiss();
    await this.androidPermissions.requestPermissions([
      this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION,
      this.androidPermissions.PERMISSION.ACCESS_FINE_LOCATION,
    ]);
    await this.loadingService.showSpinner();
    this.navigationFacade.onRequestedPermissions();
  }
}
