import { ChangeDetectionStrategy, Component, OnInit, ViewChild, QueryList, ViewChildren } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';

import { TileWrapperConfig } from '@sections/dashboard/models';
import { TILES_ID } from './dashboard.config';
import { Observable, zip } from 'rxjs';
import { TileConfigFacadeService } from '@sections/dashboard/tile-config-facade.service';
import { MEAL_CONTENT_STRINGS } from '@sections/accounts/pages/meal-donations/meal-donation.config.ts';
import { ContentStringsFacadeService } from '@core/facades/content-strings/content-strings.facade.service';
import { CONTENT_STINGS_CATEGORIES, CONTENT_STINGS_DOMAINS } from '../../content-strings';
import { AccessCardComponent } from './containers/access-card/access-card.component';
import { ORDERING_CONTENT_STRINGS } from '@sections/ordering/ordering.config';
import { SessionFacadeService } from '@core/facades/session/session.facade.service';
import { BUTTON_TYPE } from '@core/utils/buttons.config';

import { Plugins } from '@capacitor/core';
import { map, take } from 'rxjs/operators';
import { NativeStartupFacadeService } from '@core/facades/native-startup/native-startup.facade.service';
import { StNativeStartupPopoverComponent } from '@shared/ui-components/st-native-startup-popover';
import { UserFacadeService } from '@core/facades/user/user.facade.service';
import { InstitutionFacadeService } from '@core/facades/institution/institution.facade.service';
import { PhoneEmailComponent } from '@shared/ui-components/phone-email/phone-email.component';
import { EditHomePageModalComponent } from '@shared/ui-components/edit-home-page-modal/edit-home-page-modal.component';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { EMAIL_REGEXP } from '@core/utils/regexp-patterns';
import { AccountsTileComponent } from './containers/accounts-tile/accounts-tile.component';

const { App, Device } = Plugins;

@Component({
  selector: 'st-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardPage implements OnInit {
  @ViewChild(AccessCardComponent) accessCard: AccessCardComponent;
  @ViewChildren('accountsTile') accountsChild: QueryList<AccountsTileComponent>
  tiles$: Observable<TileWrapperConfig[]>;
  accountsTile: AccountsTileComponent;

  constructor(
    private readonly modalController: ModalController,
    private readonly tileConfigFacadeService: TileConfigFacadeService,
    private readonly contentStringsFacadeService: ContentStringsFacadeService,
    private readonly sessionFacadeService: SessionFacadeService,
    private readonly nativeStartupFacadeService: NativeStartupFacadeService,
    private readonly popoverCtrl: PopoverController,
    private readonly userFacadeService: UserFacadeService,
    private readonly institutionFacadeService: InstitutionFacadeService,
    private readonly appBrowser: InAppBrowser,
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

  ngAfterViewInit(){
    this.accountsChild.forEach((child) => this.accountsTile = child);
  }

  async ionViewWillEnter() {
    this.accessCard.ionViewWillEnter();
  }

  ionViewDidEnter() {
    this.checkNativeStartup();
    this.updateAccountsTile();
  }

  private async checkNativeStartup() {
    this.nativeStartupFacadeService
      .fetchNativeStartupInfo()
      .pipe(take(1))
      .subscribe(nativeStartupConfig => {
        if (nativeStartupConfig) {
          const { title, message, arrOfBtns } = nativeStartupConfig;
          this.initModal(title, message, arrOfBtns, this.redirectToTheStore.bind(this));
        } else {
          this.checkStaleProfile();
        }
      });
  }

  private async checkStaleProfile() {
    zip(this.userFacadeService.getUserData$(), this.institutionFacadeService.getlastChangedTerms$())
      .pipe(
        map(([{ email, staleProfile, lastUpdatedProfile }, lastChangedTerms]) => {
          /// if stale profile or user email is not defined or malformed
          if (staleProfile || !EMAIL_REGEXP.test(email)) {
            return true;
          }

          /// if institution does not have a TOS changed date
          if (!lastChangedTerms) {
            return false;
          }

          /// if user has not TOS seen / profile update date value
          if (!lastUpdatedProfile) {
            return true;
          }
          /// if user hasn't seen new TOS for the institution
          return lastUpdatedProfile < lastChangedTerms;
        }),
        take(1)
      )
      .subscribe(showUpdateProfile => {
        if (showUpdateProfile) {
          this.showUpdateProfileModal();
        }
      });
  }

  private async initModal(title, message, buttons, onSuccessCb): Promise<void> {
    this.hideGlobalNavBar(true);
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
      this.hideGlobalNavBar(false);
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
          this.checkStaleProfile();
          break;
      }
    });

    await modal.present();
  }

  private redirectToTheStore() {
    Device.getInfo()
      .then(deviceInfo => {

        if (deviceInfo.platform === 'ios') {
          this.appBrowser.create('itms-apps://itunes.apple.com/app/id844091049', '_system');
        } else if (deviceInfo.platform === 'android') {
          this.appBrowser.create('https://play.google.com/store/apps/details?id=com.cbord.get', '_system');
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

  async showUpdateProfileModal(): Promise<void> {
    const modal = await this.modalController.create({
      component: PhoneEmailComponent,
      componentProps: { staleProfile: true },
      backdropDismiss: false,
    });

    modal.onDidDismiss().then(() => this.hideGlobalNavBar(false));
    this.hideGlobalNavBar(true);
    return await modal.present();
  }

  updateAccountsTile() {
    this.accountsTile.getUserAccounts();
  }

  private hideGlobalNavBar(hide: boolean) {
    this.nativeStartupFacadeService.blockGlobalNavigationStatus = hide;
  }
}
