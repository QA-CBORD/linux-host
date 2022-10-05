import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { LoadingService } from '@core/service/loading/loading.service';
import { NavigationFacadeSettingsService } from '@shared/ui-components/st-global-navigation/services/navigation-facade-settings.service';
import { LocationDisclosureCsModel } from './location-disclosure-content-string.model';
import { AndroidPermissionsService } from '@sections/dashboard/services/android-permissions.service';

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
    private readonly appPermissions: AndroidPermissionsService,
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
    this.navigationFacade.promptPermissionsOnce();
  }

  async requestLocationPermissions() {
    await this.loadingService.showSpinner({ keyboardClose: false });
    const response = await this.appPermissions.requestLocationPermissions();
    this.navigationFacade.setPermissionResponse(response);
    await this.modalController.dismiss();
  }

  async close() {
    this.appPermissions.permissionDismissed = true;
    await this.modalController.dismiss();
  }
}
