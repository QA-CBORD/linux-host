import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { LoadingService } from '@core/service/loading/loading.service';
import { Plugins } from '@capacitor/core';
import { NavigationFacadeSettingsService } from '@shared/ui-components/st-global-navigation/services/navigation-facade-settings.service';


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
    private readonly navigationFacade: NavigationFacadeSettingsService
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
    this.navigationFacade.onRequestedPermissions();
    await Geolocation.getCurrentPosition({ enableHighAccuracy: true });
    this.loadingService.showSpinner();
    await this.modalController.dismiss();
  }
}

