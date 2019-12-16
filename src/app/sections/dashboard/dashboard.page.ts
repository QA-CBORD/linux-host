import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { EditHomePageModalComponent } from './components/edit-home-page-modal';
import { TileWrapperConfig } from './models/tile-wrapper-config.model';
import { DashboardService, AccountsService } from './services';
import { take, tap, switchMap } from 'rxjs/operators';
import {
  DASHBOARD_SETTINGS_CONFIG,
  tilesConfig,
  TILES_TITLE,
  ACCOUNTS_SETTINGS_CONFIG,
  TILES_ID,
} from './dashboard.config';
import { Observable } from 'rxjs';
import { SettingInfo } from '@core/model/configuration/setting-info.model';

@Component({
  selector: 'st-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  tiles: TileWrapperConfig[];
  isMobileAccessButtonEnabled: boolean;

  constructor(
    private readonly modalController: ModalController,
    private readonly dashboardService: DashboardService,
    private readonly accountsService: AccountsService
  ) {}

  get tilesTitle() {
    return TILES_TITLE;
  }
  ngOnInit() {
    this.dashboardService
      .retrieveSettingsList()
      .pipe(
        tap(settings => this.updateTilesConfig(settings)),
        switchMap(() => this.isAddFundsButtonEnabled()),
        take(1)
      )
      .subscribe();
  }

  private updateTilesConfig(settings) {
    tilesConfig.forEach(e => {
      switch (e.id) {
        case DASHBOARD_SETTINGS_CONFIG.enableRewards.name:
          e.isEnable = this.getBoolValue(
            settings.map[`get~feature~${DASHBOARD_SETTINGS_CONFIG.enableRewards.name}`].value
          );
          break;
        case DASHBOARD_SETTINGS_CONFIG.enableMobileAccess.name:
          const isMobileAccessEnabled = this.getBoolValue(
            settings.map[`get~feature~${DASHBOARD_SETTINGS_CONFIG.enableMobileAccess.name}`].value
          );
          this.isMobileAccessButtonEnabled = isMobileAccessEnabled;
          e.isEnable = isMobileAccessEnabled;
          break;
        case DASHBOARD_SETTINGS_CONFIG.enableMealDonations.name:
          e.isEnable = true;
          // this.getBoolValue(
          //   settings.map[`get~feature~${DASHBOARD_SETTINGS_CONFIG.enableMealDonations.name}`].value
          // );
          break;
        case DASHBOARD_SETTINGS_CONFIG.enableOrder.name:
          e.isEnable = this.getBoolValue(
            settings.map[`get~feature~${DASHBOARD_SETTINGS_CONFIG.enableOrder.name}`].value
          );
          break;
        case DASHBOARD_SETTINGS_CONFIG.enableExplore.name:
          e.isEnable = this.getBoolValue(
            settings.map[`get~feature~${DASHBOARD_SETTINGS_CONFIG.enableExplore.name}`].value
          );
          break;
        case DASHBOARD_SETTINGS_CONFIG.enableConversation.name:
          e.isEnable = this.getBoolValue(
            settings.map[`get~feature~${DASHBOARD_SETTINGS_CONFIG.enableConversation.name}`].value
          );
          break;
      }
    });
    this.tiles = tilesConfig;
  }

  private isAddFundsButtonEnabled(): Observable<SettingInfo[]> {
    const requireSettings = [ACCOUNTS_SETTINGS_CONFIG.paymentTypes, ACCOUNTS_SETTINGS_CONFIG.enableOnetimeDeposits];

    return this.accountsService.getUserSettings(requireSettings).pipe(
      tap(([paymentTypes, onetimeDeposits]) => {
        if (JSON.parse(paymentTypes.value).length && this.getBoolValue(onetimeDeposits.value)) {
          this.tiles = this.tiles.map(elem => {
            if (elem.id === TILES_ID.accounts) {
              elem.buttonConfig.show = true;
            }
            return elem;
          });
        }
      })
    );
  }

  async presentEditHomePageModal() {
    const modal = await this.modalController.create({
      component: EditHomePageModalComponent,
    });
    return await modal.present();
  }

  private getBoolValue(value) {
    return !!parseInt(value);
  }
}
