import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';

import { EditHomePageModalComponent } from './components/edit-home-page-modal';
import { TileWrapperConfig } from '@sections/dashboard/models';
import { TILES_ID } from './dashboard.config';
import { Observable } from 'rxjs';
import { TileConfigFacadeService } from '@sections/dashboard/tile-config-facade.service';
import { MEAL_CONTENT_STRINGS } from '@sections/accounts/pages/meal-donations/meal-donation.config.ts';
import { ContentStringsFacadeService } from '@core/facades/content-strings/content-strings.facade.service';
import { CONTENT_STINGS_CATEGORIES, CONTENT_STINGS_DOMAINS } from '../../content-strings';
import { AccessCardComponent } from './containers/access-card/access-card.component';
import { ORDERING_CONTENT_STRINGS } from '@sections/ordering/ordering.config';
import { SessionFacadeService } from '@core/facades/session/session.facade.service';
import { BUTTON_TYPE } from '@core/utils/buttons.config';

import { Plugins } from '@capacitor/core';
import { take } from 'rxjs/operators';
import { NativeStartupFacadeService } from '@core/facades/native-startup/native-startup.facade.service';
import { StNativeStartupPopoverComponent } from '@shared/ui-components/st-native-startup-popover';
import { UserFacadeService } from '@core/facades/user/user.facade.service';
import { UpdateContactInformationComponent } from './components/update-contact-information-modal/update-contact-information.component';
import { InstitutionFacadeService } from '@core/facades/institution/institution.facade.service';

const { App, Device } = Plugins;

@Component({
  selector: 'st-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardPage implements OnInit {
  @ViewChild(AccessCardComponent) accessCard: AccessCardComponent;
  tiles$: Observable<TileWrapperConfig[]>;

  constructor(
    private readonly modalController: ModalController,
    private readonly tileConfigFacadeService: TileConfigFacadeService,
    private readonly contentStringsFacadeService: ContentStringsFacadeService,
    private readonly sessionFacadeService: SessionFacadeService,
    private readonly nativeStartupFacadeService: NativeStartupFacadeService,
    private readonly popoverCtrl: PopoverController,
    private readonly userFacadeService: UserFacadeService,
    private readonly institutionFacadeService: InstitutionFacadeService
  ) {}

  get tilesIds(): { [key: string]: string } {
    return TILES_ID;
  }

  ngOnInit() {
    this.tiles$ = this.tileConfigFacadeService.tileSettings$;
    this.updateDonationMealsStrings();
    this.updateOrderingStrings();
    this.pushNotificationRegistration();
  }

  async ionViewWillEnter() {
    this.accessCard.ionViewWillEnter();
    await this.updateContactIfNeccesary();
  }

  ionViewDidEnter() {
    this.checkNativeStartup();
  }

  private async checkNativeStartup() {
    this.nativeStartupFacadeService
      .fetchNativeStartupInfo()
      .pipe(take(1))
      .subscribe(nativeStartupConfig => {
        if (nativeStartupConfig) {
          const { title, message, arrOfBtns } = nativeStartupConfig;
          this.initModal(title, message, arrOfBtns, this.redirectToTheStore.bind(this));
        }
      });
  }

  private async initModal(title, message, buttons, onSuccessCb): Promise<void> {
    this.nativeStartupFacadeService.blockGlobalNavigationStatus = true;
    const modal = await this.popoverCtrl.create({
      component: StNativeStartupPopoverComponent,
      componentProps: {
        data: {
          title,
          message,
          buttons,
        },
      },
      animated: false,
      backdropDismiss: false,
    });

    modal.onDidDismiss().then(({ role }) => {
      this.nativeStartupFacadeService.blockGlobalNavigationStatus = false;
      switch (role) {
        case BUTTON_TYPE.OKAY:
          onSuccessCb();
          this.sessionFacadeService.lockVault();
          App.exitApp();
          break;
        case BUTTON_TYPE.CLOSE:
          this.sessionFacadeService.lockVault();
          App.exitApp();
          break;
        case BUTTON_TYPE.CANCEL:
          /// do nothing
          break;
      }
    });

    await modal.present();
  }

  private redirectToTheStore() {
    Device.getInfo()
      .then(deviceInfo => {
        if (deviceInfo.platform === 'ios') {
          window.open('itms-apps://itunes.apple.com/app/id844091049');
        } else if (deviceInfo.platform === 'android') {
          window.open('https://play.google.com/store/apps/details?id=com.cbord.get');
        }
      })
      .catch(reason => {});
  }

  pushNotificationRegistration() {
    this.sessionFacadeService.handlePushNotificationRegistration();
  }

  async presentEditHomePageModal(): Promise<void> {
    const modal = await this.modalController.create({
      component: EditHomePageModalComponent,
    });
    return await modal.present();
  }

  trackFn(i, { id, iconPath }): string {
    return id + iconPath;
  }

  private async updateDonationMealsStrings(): Promise<void> {
    const res = await this.tileConfigFacadeService.resolveAsyncUpdatingConfig({
      title: this.contentStringsFacadeService.getContentStringValue$(
        CONTENT_STINGS_DOMAINS.patronUi,
        CONTENT_STINGS_CATEGORIES.mealDonation,
        MEAL_CONTENT_STRINGS.dashboardTitle
      ),
      buttonConfig: {
        title: this.contentStringsFacadeService.getContentStringValue$(
          CONTENT_STINGS_DOMAINS.patronUi,
          CONTENT_STINGS_CATEGORIES.mealDonation,
          MEAL_CONTENT_STRINGS.buttonDonateAMeal
        ),
      },
    });

    await this.tileConfigFacadeService.updateConfigById(TILES_ID.mealDonations, res);
  }

  private async updateOrderingStrings(): Promise<void> {
    const res = await this.tileConfigFacadeService.resolveAsyncUpdatingConfig({
      title: this.contentStringsFacadeService.getContentStringValue$(
        CONTENT_STINGS_DOMAINS.patronUi,
        CONTENT_STINGS_CATEGORIES.ordering,
        ORDERING_CONTENT_STRINGS.labelDashboard
      ),
      buttonConfig: {
        title: this.contentStringsFacadeService.getContentStringValue$(
          CONTENT_STINGS_DOMAINS.patronUi,
          CONTENT_STINGS_CATEGORIES.ordering,
          ORDERING_CONTENT_STRINGS.buttonDashboardStartOrder
        ),
      },
    });

    await this.tileConfigFacadeService.updateConfigById(TILES_ID.order, res);
  }

  async getStaleProfileStatus$(): Promise<boolean> {
    return await this.userFacadeService.isStaleProfileEnabled$().toPromise();
  }

  private async isContactInformationUpToDate$(): Promise<boolean> {
    return new Promise<boolean>(async (resolve, reject) => {
      const lastUpdatedProfile = await this.userFacadeService.getlastUpdatedProfile$().toPromise();
      const lastChangedTerms = await this.institutionFacadeService.getlastChangedTerms$().toPromise();
      const profileDate = new Date(lastUpdatedProfile);
      const termDate = new Date(lastChangedTerms);
      if (termDate > profileDate) {
        resolve(true);
      } else {
        reject(false);
      }
    });
  }

  async presentUpdateContactInformationModal(): Promise<void> {
    const modal = await this.modalController.create({
      component: UpdateContactInformationComponent,
    });
    return await modal.present();
  }

  private async updateContactIfNeccesary() {
    const staleProfile = await this.getStaleProfileStatus$();
    const contactInformation = await this.isContactInformationUpToDate$();
    if (staleProfile || contactInformation) {
      this.presentUpdateContactInformationModal();
    }
  }
}
