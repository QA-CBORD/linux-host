import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { EditHomePageModalComponent } from './components/edit-home-page-modal';
import { TileWrapperConfig } from '@sections/dashboard/models';
import { AccountsService, DashboardService } from './services';
import {
  ACCOUNTS_SETTINGS_CONFIG, TILES_ID,
  TILES_TITLE,
  tilesConfig,
} from './dashboard.config';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { parseArrayFromString } from '@core/utils/general-helpers';

@Component({
  selector: 'st-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardPage implements OnInit {
  tiles: TileWrapperConfig[];

  constructor(
    private readonly modalController: ModalController,
    private readonly dashboardService: DashboardService,
    private readonly accountsService: AccountsService,
    private readonly route: ActivatedRoute,
  ) {
  }

  get tilesTitle() {
    return TILES_TITLE;
  }

  ngOnInit() {
    const { data: [settings] } = this.route.snapshot.data;
    this.tiles = this.getUpdatedTilesConfig(settings);
    this.updateAccountTile();
  }

  private getUpdatedTilesConfig(settings) {
    return tilesConfig.map((setting) => {
      let s = settings.list.find(({name}) => name === setting.id);
      return s ? { ...setting, isEnable: DashboardPage.getBoolValue(s.value) } : setting;
    });
  }

  async presentEditHomePageModal(): Promise<void> {
    const modal = await this.modalController.create({
      component: EditHomePageModalComponent,
    });
    return await modal.present();
  }

  private updateAccountTile() {
    this.isAddFundsButtonEnabled().pipe(
      first(),
    ).subscribe(enabled => {
      const index = this.tiles.findIndex((tile) => tile.id === TILES_ID.accounts);
      if (index >= 0 && enabled) {
        const tile = this.tiles[index];
        this.tiles[index] = { ...tile, buttonConfig: { ...tile.buttonConfig, show: enabled } };
      }
    });
  }

  private static getBoolValue(value): boolean {
    return !!Number(value);
  }

  private isAddFundsButtonEnabled(): Observable<boolean> {
    const requireSettings = [
      ACCOUNTS_SETTINGS_CONFIG.paymentTypes,
      ACCOUNTS_SETTINGS_CONFIG.enableOnetimeDeposits,
    ];

    return this.accountsService.getUserSettings(requireSettings)
      .pipe(
        map(([paymentTypes, onetimeDeposits]) =>
          parseArrayFromString(paymentTypes.value).length && !!Number(onetimeDeposits.value),
        ),
      );
  }
}
