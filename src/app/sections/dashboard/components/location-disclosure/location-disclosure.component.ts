import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { LoadingService } from '@core/service/loading/loading.service';
import { NavigationFacadeSettingsService } from '@shared/ui-components/st-global-navigation/services/navigation-facade-settings.service';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { LocationDisclosureCsModel } from './location-disclosure-content-string.model';

@Component({
  selector: 'st-location-disclosure',
  templateUrl: './location-disclosure.component.html',
  styleUrls: ['./location-disclosure.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class LocationPermissionModal {

  @Input() disclosureCs: LocationDisclosureCsModel;
  
  private readonly WAIT_IMAGE_RENDERING = 2500;

  constructor(
    private readonly modalController: ModalController,
    private readonly loadingService: LoadingService,
    private readonly navigationFacade: NavigationFacadeSettingsService,
    private readonly androidPermissions: AndroidPermissions
  ) {}

  ionViewWillEnter() {
    this.loadingService.showSpinner();
  }

  ionViewDidEnter() {
    setTimeout(() => {
      this.loadingService.closeSpinner();
    }, this.WAIT_IMAGE_RENDERING);
  }

  ionViewWillLeave() {
    this.navigationFacade.onRequestedPermissions();
  }

  async requestLocationPermissions() {
    await this.loadingService.showSpinner();
    await this.androidPermissions.requestPermissions([
      this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION,
      this.androidPermissions.PERMISSION.ACCESS_FINE_LOCATION,
    ]);
    await this.modalController.dismiss();
  }
  
  async close() {
    await this.modalController.dismiss();
  }
}
