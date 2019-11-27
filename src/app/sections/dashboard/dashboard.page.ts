import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { EditHomePageModalComponent } from './components/edit-home-page-modal';
import { TileWrapperConfig } from './models/tile-wrapper-config.model';
import { DashboardService, AccountsService } from './services';
import { take } from 'rxjs/operators';
import { DASHBOARD_SETTINGS_CONFIG, tilesConfig, TILES_TITLE, ACCOUNTS_SETTINGS_CONFIG } from './dashboard.config';

@Component({
  selector: 'st-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  tiles: TileWrapperConfig[];

  constructor(private readonly modalController: ModalController, private readonly dashboardService: DashboardService,
    private readonly accountsService: AccountsService) { }

  get tilesTitle() {
    return TILES_TITLE;
  }
  ngOnInit() {
    const requireSettings = [
      ACCOUNTS_SETTINGS_CONFIG.paymentTypes,
      ACCOUNTS_SETTINGS_CONFIG.enableOnetimeDeposits,
    ];
    this.accountsService
      .getUserSettings(requireSettings)
      .pipe(
        take(1)
      )
      .subscribe(([paymentTypes, onetimeDeposits]) => {
        console.log(JSON.parse(paymentTypes.value).length)
        console.log(this.getBoolValue(onetimeDeposits.value))
      });

    this.dashboardService.retrieveSettingsList()
      .pipe(take(1))
      .subscribe(
        settings => {
          tilesConfig.forEach(elem => {
            switch (elem.id) {
              case DASHBOARD_SETTINGS_CONFIG.enableRewards.name:
                elem.isEnable = this.getBoolValue(settings.map[`get~feature~${DASHBOARD_SETTINGS_CONFIG.enableRewards.name}`].value);
                break;

              case DASHBOARD_SETTINGS_CONFIG.enableMobileAccess.name:
                elem.isEnable = this.getBoolValue(settings.map[`get~feature~${DASHBOARD_SETTINGS_CONFIG.enableMobileAccess.name}`].value);
                break;
              case DASHBOARD_SETTINGS_CONFIG.enableOrder.name:
                elem.isEnable = this.getBoolValue(settings.map[`get~feature~${DASHBOARD_SETTINGS_CONFIG.enableOrder.name}`].value);
                break;
              case DASHBOARD_SETTINGS_CONFIG.enableExplore.name:
                elem.isEnable = this.getBoolValue(settings.map[`get~feature~${DASHBOARD_SETTINGS_CONFIG.enableExplore.name}`].value);
                break;
              case DASHBOARD_SETTINGS_CONFIG.enableConversation.name:
                elem.isEnable = this.getBoolValue(settings.map[`get~feature~${DASHBOARD_SETTINGS_CONFIG.enableConversation.name}`].value);
                break;
            }
          });
          this.tiles = tilesConfig;

          console.log(settings.map[`get~feature~${DASHBOARD_SETTINGS_CONFIG.enableScanCardButton.name}`]);
        }
      )
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
