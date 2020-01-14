import { SYSTEM_SETTINGS_CONFIG, LOCAL_ROUTING } from '../../../accounts.config';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';

import { SettingInfo } from '../../../../../core/model/configuration/setting-info.model';
import { AccountsService } from '../../../services/accounts.service';
import { NAVIGATE } from '../../../../../app.global';
import { MENU_LIST_ITEMS, MENU_LIST_ROUTES } from './local.config';
import { MenuReceivingFundsListItem } from '../../../models/menu-list-item';
import { CONTENT_STRINGS } from '../../../accounts.config';

@Component({
  selector: 'st-menu-receiving-funds',
  templateUrl: './menu-receiving-funds.component.html',
  styleUrls: ['./menu-receiving-funds.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuReceivingFundsComponent implements OnInit {
  menuItems$: Observable<MenuReceivingFundsListItem[]>;
  contentString: { [key: string]: string };

  constructor(private readonly accountsService: AccountsService, private readonly router: Router) {}

  ngOnInit() {
    this.setContentStrings();
    this.menuItems$ = this.accountsService.settings$.pipe(map(settings => this.handleListItems(settings)));
  }

  //TODO: Add correct Desktop Settings for menu icons
  
  get hasShowedItem$(): Observable<boolean> {
    return this.menuItems$.pipe(map(items => items.some((item) => item && item.isShow)));
  }

  redirect(name: string) {
    this.router.navigate([NAVIGATE.accounts, MENU_LIST_ROUTES.get(name)], { skipLocationChange: true });
  }

  trackByMenuName(i: number, { name }: MenuReceivingFundsListItem): string {
    return name;
  }

  private handleListItems(settings: SettingInfo[]): MenuReceivingFundsListItem[] {
    const navList = Array.from(MENU_LIST_ITEMS.keys());

    return navList.map(element => {
      const setting = settings.find(setting => setting.name === element);
      if (!setting) return;
      let displayName = '';
      switch (setting.name) {
        case SYSTEM_SETTINGS_CONFIG.enableAutoDeposits.name:
          displayName = this.contentString[CONTENT_STRINGS.autoDepositBtn];
          break;
        case SYSTEM_SETTINGS_CONFIG.enableOnetimeDeposits.name:
          displayName = this.contentString[CONTENT_STRINGS.addFundsBtn];
          break;
        case SYSTEM_SETTINGS_CONFIG.guestDeposit.name:
          displayName = this.contentString[CONTENT_STRINGS.requestFundsBtn];
          break;
        case SYSTEM_SETTINGS_CONFIG.enableMeals.name:
          // There are no ui-patron Content Settings API response for meal donations
          // displayName = this.contentString[CONTENT_STRINGS.mealDonationsBtn];
          displayName = 'Meal Donations';
          break;
      }
      return { name: setting.name, displayName: displayName, isShow: Boolean(Number(setting.value)) };
    });
  }

  setContentStrings() {
    const accountStringNames: string[] = [
      CONTENT_STRINGS.autoDepositBtn,
      CONTENT_STRINGS.requestFundsBtn,
      CONTENT_STRINGS.addFundsBtn,
      // CONTENT_STRINGS.mealDonationsBtn,
    ];

    this.contentString = this.accountsService.getContentStrings(accountStringNames);
  }
}
