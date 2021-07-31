import { Resolve } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable, zip } from 'rxjs';
import { finalize, first, map, take } from 'rxjs/operators';
import { AccountService } from '@sections/accounts/services/accounts.service';
import { LoadingService } from '@core/service/loading/loading.service';
import { SettingInfoList } from '@core/model/configuration/setting-info-list.model';
import { TileConfigFacadeService } from '@sections/dashboard/tile-config-facade.service';
import { ContentStringsFacadeService } from '@core/facades/content-strings/content-strings.facade.service';
import { CONTENT_STRINGS_CATEGORIES, CONTENT_STRINGS_DOMAINS } from '../../../content-strings';
import { ORDERING_CONTENT_STRINGS } from '@sections/ordering/ordering.config';
import { ContentStringInfo } from '@core/model/content/content-string-info.model';
import { Settings } from '../../../app.global';
import { InstitutionFacadeService } from '@core/facades/institution/institution.facade.service';
import { SettingsFacadeService } from '@core/facades/settings/settings-facade.service';
import { UserFacadeService } from '@core/facades/user/user.facade.service';
import { MobileCredentialFacade } from '@shared/ui-components/mobile-credentials/service/mobile-credential-facade.service';
import { MEAL_CONTENT_STRINGS } from '@sections/accounts/pages/meal-donations/meal-donation.config';
import { Capacitor } from '@capacitor/core';
import { PLATFORM } from '@shared/accessibility/services/accessibility.service';
import { NavigationFacadeSettingsService } from '@shared/ui-components/st-global-navigation/services/navigation-facade-settings.service';
import { CommonService } from '@shared/services/common.service';
import { LocationPermissionModal } from '../components/location-disclosure/location-disclosure.component';
import { ModalController } from '@ionic/angular';
import { LocationDisclosureCsModel } from '../components/location-disclosure/location-disclosure-content-string.model';
import { ContentStringCategory } from '@shared/model/content-strings/content-strings-api';
import { NativeStartupFacadeService } from '@core/facades/native-startup/native-startup.facade.service';

@Injectable()
export class DashboardPageResolver implements Resolve<Observable<SettingInfoList>> {
  constructor(
    private readonly accountsService: AccountService,
    private readonly userFacadeService: UserFacadeService,
    private readonly tileConfigFacadeService: TileConfigFacadeService,
    private readonly contentStringsFacadeService: ContentStringsFacadeService,
    private readonly institutionService: InstitutionFacadeService,
    private readonly settingsFacadeService: SettingsFacadeService,
    private readonly loadingService: LoadingService,
    private readonly mobileCredentialFacade: MobileCredentialFacade,
    private readonly navigationFacade: NavigationFacadeSettingsService,
    private readonly commonService: CommonService,
    private readonly modalController: ModalController,
    private readonly nativeStartupFacadeService: NativeStartupFacadeService
  ) {}

  resolve(): Observable<SettingInfoList> {

    this.locationDisclosurePage();
    /// get fresh data on dashboard load
    const strings = this.loadContentStrings();
    const user = this.userFacadeService.getUser$();
    const inst = this.institutionService.fetchInstitutionData();
    const settingList = this.settingsFacadeService.fetchSettingList(Settings.SettingList.FEATURES);
    const accountContentStrings = this.accountsService.initContentStringsList();
    const mCredential$ = this.mobileCredentialFacade.mobileCredentialEnabled$().pipe(take(1));
    const tilesConfig = this.tileConfigFacadeService.updateTilesConfigBySystemSettings().pipe(first());
    this.loadingService.showSpinner();
    return zip(user, inst, settingList, mCredential$, tilesConfig, accountContentStrings, ...strings).pipe(
      map(([userInfo, institutionInfo, featureSettingsList]) => featureSettingsList),
      take(1),
      finalize(() => this.loadingService.closeSpinner())
    );
  }

  private loadContentStrings(): Observable<ContentStringInfo>[] {
    return [
      this.contentStringsFacadeService.fetchContentString$(
        CONTENT_STRINGS_DOMAINS.patronUi,
        CONTENT_STRINGS_CATEGORIES.mealDonation,
        MEAL_CONTENT_STRINGS.dashboardTitle
      ),
      this.contentStringsFacadeService.fetchContentString$(
        CONTENT_STRINGS_DOMAINS.patronUi,
        CONTENT_STRINGS_CATEGORIES.mealDonation,
        MEAL_CONTENT_STRINGS.buttonDonateAMeal
      ),
      this.contentStringsFacadeService.fetchContentString$(
        CONTENT_STRINGS_DOMAINS.patronUi,
        CONTENT_STRINGS_CATEGORIES.ordering,
        ORDERING_CONTENT_STRINGS.labelDashboard
      ),
      this.contentStringsFacadeService.fetchContentString$(
        CONTENT_STRINGS_DOMAINS.patronUi,
        CONTENT_STRINGS_CATEGORIES.ordering,
        ORDERING_CONTENT_STRINGS.buttonDashboardStartOrder
      ),
    ];
  }

  private async locationDisclosurePage() {
    if (Capacitor.platform == PLATFORM.android) {
      this.navigationFacade.hasRequestedPermissions$.pipe(take(1)).subscribe(requested => {
        if (!requested) {
           this.requestPermissionModal();
        }
       // this.requestPermissionModal();
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
    return modal.onDidDismiss().then(() => {
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
