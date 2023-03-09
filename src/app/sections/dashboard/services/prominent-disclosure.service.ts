import { Injectable } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { NativeStartupFacadeService } from '@core/facades/native-startup/native-startup.facade.service';
import { LoadingService } from '@core/service/loading/loading.service';
import { ModalController } from '@ionic/angular';
import { PLATFORM } from '@shared/accessibility/services/accessibility.service';
import { ContentStringCategory } from '@shared/model/content-strings/content-strings-api';
import { CommonService } from '@shared/services/common.service';
import { NavigationFacadeSettingsService } from '@shared/ui-components/st-global-navigation/services/navigation-facade-settings.service';
import { take } from 'rxjs/operators';
import { LocationDisclosureCsModel } from '../components/location-disclosure/location-disclosure-content-string.model';
import { LocationPermissionModal } from '../components/location-disclosure/location-disclosure.component';

@Injectable()
export class ProminentDisclosureService {
  constructor(
    private readonly loadingService: LoadingService,
    private readonly navigationFacade: NavigationFacadeSettingsService,
    private readonly commonService: CommonService,
    private readonly modalController: ModalController,
    private readonly nativeStartupFacadeService: NativeStartupFacadeService
  ) {}

  openProminentDisclosure() {
    if (Capacitor.getPlatform() == PLATFORM.android) {
      this.navigationFacade.permissionsPrompted$.pipe(take(1)).subscribe(prompted => {
        if (!prompted) {
           this.requestPermissionModal();
        }
      });
    }
  }

  private async requestPermissionModal(): Promise<void> {
    const disclosureCs = await this.locationDisclosureCs();
    this.hideGlobalNavBar(true);
    const modal = await this.modalController.create({
      component: LocationPermissionModal,
      animated: false,
      backdropDismiss: false,
      componentProps: { disclosureCs: disclosureCs },
    });
    await modal.present();
    return await modal.onDidDismiss().then(() => {
      this.hideGlobalNavBar(false);
      this.loadingService.closeSpinner();
    });
  }

  private async locationDisclosureCs() {
    return this.commonService
      .loadContentString<LocationDisclosureCsModel>(ContentStringCategory.locationDisclosure)
      .pipe(take(1))
      .toPromise();
  }

  private hideGlobalNavBar(hide: boolean) {
    this.nativeStartupFacadeService.blockGlobalNavigationStatus = hide;
  }
}
