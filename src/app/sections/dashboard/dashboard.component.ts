import { ChangeDetectionStrategy, Component, OnInit, ViewChild, QueryList, ViewChildren } from '@angular/core';
import { ModalController, Platform, PopoverController } from '@ionic/angular';

import { TileWrapperConfig } from '@sections/dashboard/models';
import { TILES_ID } from './dashboard.config';
import { firstValueFrom, Observable, zip } from 'rxjs';
import { TileConfigFacadeService } from '@sections/dashboard/tile-config-facade.service';
import { MEAL_CONTENT_STRINGS } from '@sections/accounts/pages/meal-donations/meal-donation.config';
import { ContentStringsFacadeService } from '@core/facades/content-strings/content-strings.facade.service';
import { CONTENT_STRINGS_CATEGORIES, CONTENT_STRINGS_DOMAINS } from '../../content-strings';
import { AccessCardComponent } from './containers/access-card/access-card.component';
import { ORDERING_CONTENT_STRINGS } from '@sections/ordering/ordering.config';
import { SessionFacadeService } from '@core/facades/session/session.facade.service';
import { BUTTON_TYPE } from '@core/utils/buttons.config';
import { map, take } from 'rxjs/operators';
import { NativeStartupFacadeService } from '@core/facades/native-startup/native-startup.facade.service';
import { StNativeStartupPopoverComponent } from '@shared/ui-components/st-native-startup-popover';
import { UserFacadeService } from '@core/facades/user/user.facade.service';
import { InstitutionFacadeService } from '@core/facades/institution/institution.facade.service';
import { PhoneEmailComponent } from '@shared/ui-components/phone-email/phone-email.component';
import { EditHomePageModalComponent } from '@shared/ui-components/edit-home-page-modal/edit-home-page-modal.component';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { EMAIL_REGEXP } from '@core/utils/regexp-patterns';
import { AccountsTileComponent } from './containers/accounts-tile/accounts-tile.component';
import { TransactionsTileComponent } from './containers/transactions-tile/transactions-tile.component';
import { RewardsTileComponent } from './containers/rewards-tile/rewards-tile.component';
import { OrderTileComponent } from './containers/order-tile/order-tile.component';
import { ExploreTileComponent } from './containers/explore-tile/explore-tile.component';
import { ConversationsTileComponent } from './containers/conversations-tile/conversations-tile.component';
import { MobileAccessTileComponent } from './containers/mobile-access-tile/mobile-access-tile.component';
import { Router } from '@angular/router';
import { App } from '@capacitor/app';
import { Device } from '@capacitor/device';
import { AndroidPermissionsService } from './services/android-permissions.service';
import { NavigationFacadeSettingsService } from '@shared/ui-components/st-global-navigation/services/navigation-facade-settings.service';

@Component({
  selector: 'st-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardPage implements OnInit {
  @ViewChild(AccessCardComponent, { static: true }) accessCard: AccessCardComponent;
  @ViewChildren('accountsTile') accountsChild: QueryList<AccountsTileComponent>;
  @ViewChildren('transactionsTile') transactionsChild: QueryList<TransactionsTileComponent>;
  @ViewChildren('rewardsTile') rewardsChild: QueryList<RewardsTileComponent>;
  @ViewChildren('orderTile') ordersChild: QueryList<OrderTileComponent>;
  @ViewChildren('exploreTile') explorerChild: QueryList<ExploreTileComponent>;
  @ViewChildren('mobileAccessTile') mobileAccessChild: QueryList<MobileAccessTileComponent>;
  @ViewChildren('conversationsTile') conversationChild: QueryList<ConversationsTileComponent>;
  tiles$: Observable<TileWrapperConfig[]>;
  accountsTile: AccountsTileComponent;
  transactionsTile: TransactionsTileComponent;
  rewardsTile: RewardsTileComponent;
  ordersTile: OrderTileComponent;
  explorerTile: ExploreTileComponent;
  mobileAccessTile: MobileAccessTileComponent;
  conversationTile: ConversationsTileComponent;
  disclosureCs: any;

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
    private readonly router: Router,
    private readonly platform: Platform,
    private readonly appPermissions: AndroidPermissionsService,
    private readonly navigationFacade: NavigationFacadeSettingsService
  ) {}

  get tilesIds(): { [key: string]: string } {
    return TILES_ID;
  }

  async ngOnInit() {
    this.tiles$ = this.tileConfigFacadeService.tileSettings$;
    this.updateDonationMealsStrings();
    this.updateOrderingStrings();
    this.pushNotificationRegistration();
    this.initLocationForAndroid();
  }

  ngAfterViewInit() {
    this.accountsChild.forEach(child => (this.accountsTile = child));
    this.transactionsChild.forEach(child => (this.transactionsTile = child));
    this.rewardsChild.forEach(child => (this.rewardsTile = child));
    this.ordersChild.forEach(child => (this.ordersTile = child));
    this.explorerChild.forEach(child => (this.explorerTile = child));
    this.mobileAccessChild.forEach(child => (this.mobileAccessTile = child));
    this.conversationChild.forEach(child => (this.conversationTile = child));
    this.checkOpenedFromDeepLink();
  }

  async ionViewWillEnter() {
    this.accessCard.ionViewWillEnter();
    this.updateTiles();
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
      .subscribe(async showUpdateProfile => {
        if (showUpdateProfile) {
          await this.showUpdateProfileModal();
        }
      });
  }

  private async initModal(title, message, buttons, onSuccessCb): Promise<void> {
    this.hideGlobalNavBar(true);
    const modal = await this.popoverCtrl.create({
      cssClass: 'sc-popover',
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
      this.nativeStartupFacadeService.unblockNavigationStartup();
      switch (role) {
        case BUTTON_TYPE.OKAY:
          onSuccessCb();
          App.exitApp();
          break;
        case BUTTON_TYPE.CLOSE:
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
      .catch(() => {
        // TODO: Properly handle exception
      });
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
        CONTENT_STRINGS_DOMAINS.patronUi,
        CONTENT_STRINGS_CATEGORIES.mealDonation,
        MEAL_CONTENT_STRINGS.dashboardTitle
      ),
      buttonConfig: {
        title: this.contentStringsFacadeService.getContentStringValue$(
          CONTENT_STRINGS_DOMAINS.patronUi,
          CONTENT_STRINGS_CATEGORIES.mealDonation,
          MEAL_CONTENT_STRINGS.buttonDonateAMeal
        ),
      },
    });

    await this.tileConfigFacadeService.updateConfigById(TILES_ID.mealDonations, res);
  }

  private async updateOrderingStrings(): Promise<void> {
    const res = await this.tileConfigFacadeService.resolveAsyncUpdatingConfig({
      title: this.contentStringsFacadeService.getContentStringValue$(
        CONTENT_STRINGS_DOMAINS.patronUi,
        CONTENT_STRINGS_CATEGORIES.ordering,
        ORDERING_CONTENT_STRINGS.labelDashboard
      ),
      buttonConfig: {
        title: this.contentStringsFacadeService.getContentStringValue$(
          CONTENT_STRINGS_DOMAINS.patronUi,
          CONTENT_STRINGS_CATEGORIES.ordering,
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
    return modal.present();
  }

  updateTiles() {
    if (this.accountsTile) {
      this.accountsTile.getUserAccounts();
    }
    if (this.transactionsTile) {
      this.transactionsTile.getRecentTransactions();
    }
    if (this.rewardsTile) {
      this.rewardsTile.getUserRewardTrackInfo();
    }
    if (this.ordersTile) {
      this.ordersTile.initMerchantSlides();
    }
    if (this.explorerTile) {
      this.explorerTile.getMerchants();
    }
    if (this.conversationTile) {
      this.conversationTile.initializePage();
    }
    if (this.mobileAccessTile) {
      this.mobileAccessTile.getLocations();
    }
  }

  private hideGlobalNavBar(hide: boolean) {
    this.nativeStartupFacadeService.blockGlobalNavigationStatus = hide;
  }

  private checkOpenedFromDeepLink() {
    // Check if opened from deep link and navigate
    const deepLinkPath = this.sessionFacadeService.deepLinkPath;
    if (deepLinkPath && deepLinkPath.length) {
      this.router.navigate(deepLinkPath).then(() => this.sessionFacadeService.navigatedToLinkPath());
    }
  }

  private async initLocationForAndroid(): Promise<void> {
    const permissionRequested = await firstValueFrom(this.navigationFacade.permissionsPrompted$.pipe(take(1)));
    const permissionAllowed = await firstValueFrom(this.navigationFacade.permissionResponse$.pipe(take(1)));
    
    if (this.platform.is('android') && permissionRequested && permissionAllowed) {
      const { hasPermission } = await this.appPermissions.checkLocationPermission();

      if (!hasPermission) {
        const response = await this.appPermissions.requestLocationPermissions();
        this.navigationFacade.setPermissionResponse(response);
      }
    }
  }
}
