import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { EditHomePageModalComponent } from './components/edit-home-page-modal';
import { TileWrapperConfig } from '@sections/dashboard/models';
import { AccountsService, DashboardService } from './services';
import { map, switchMap } from 'rxjs/operators';
import {
  ACCOUNTS_SETTINGS_CONFIG, DASHBOARD_SETTINGS_CONFIG,
  TILES_ID,
  TILES_TITLE,
  tilesConfig,
} from './dashboard.config';
import { Observable, of } from 'rxjs';
import { parseArrayFromString } from '@core/utils/general-helpers';

@Component({
  selector: 'st-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardPage implements OnInit {
  tiles$: Observable<TileWrapperConfig[]>;
  isMobileAccessButtonEnabled$: Observable<boolean>;

  constructor(
    private readonly modalController: ModalController,
    private readonly dashboardService: DashboardService,
    private readonly accountsService: AccountsService,
  ) {
  }

  get tilesTitle() {
    return TILES_TITLE;
  }

  ngOnInit() {
    this.tiles$ = this.dashboardService.retrieveSettingsList().pipe(
      map(settings => this.getUpdatedTilesConfig(settings)),
      switchMap((settings) => this.isAddFundsButtonEnabled(settings)),
    );
    this.isMobileAccessButtonEnabled$ = this.tiles$.pipe(
      map(settings =>
        settings.find((s) => (s.id === DASHBOARD_SETTINGS_CONFIG.enableMobileAccess.name))!.isEnable
      )
    );
  }

  private getUpdatedTilesConfig(settings) {
    return tilesConfig.map((setting) => {
      let s = settings.list.find((s) => s.name === setting.id);
      return s ? { ...setting, isEnable: DashboardPage.getBoolValue(s.value) } : setting;
    });
  }

  private isAddFundsButtonEnabled(settings: TileWrapperConfig[]): Observable<TileWrapperConfig[]> {
    const requireSettings = [
      ACCOUNTS_SETTINGS_CONFIG.paymentTypes,
      ACCOUNTS_SETTINGS_CONFIG.enableOnetimeDeposits,
    ];

    return this.accountsService.getUserSettings(requireSettings)
      .pipe(
        switchMap(([paymentTypes, onetimeDeposits]) =>
          parseArrayFromString(paymentTypes.value).length && DashboardPage.getBoolValue(onetimeDeposits.value)
            ? of(settings.map((elem) =>
              (elem.id === TILES_ID.accounts) ? { ...elem, buttonConfig: { ...elem.buttonConfig, show: true } } : elem,
            ))
            : of(settings),
        ),
      );
  }

  async presentEditHomePageModal(): Promise<void> {
    const modal = await this.modalController.create({
      component: EditHomePageModalComponent,
    });
    return await modal.present();
  }

  private static getBoolValue(value): boolean {
    return !!Number(value);
  }
}
