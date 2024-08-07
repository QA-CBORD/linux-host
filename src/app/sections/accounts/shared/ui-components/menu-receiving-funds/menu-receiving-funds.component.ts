import { CONTENT_STRINGS } from '../../../accounts.config';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { SettingInfo } from '@core/model/configuration/setting-info.model';
import { AccountService } from '../../../services/accounts.service';
import { PATRON_NAVIGATION, Settings } from '../../../../../app.global';
import { MENU_LIST_ITEMS, MENU_LIST_ROUTES } from './local.config';
import { MenuReceivingFundsListItem } from '../../../models/menu-list-item';

@Component({
  selector: 'st-menu-receiving-funds',
  templateUrl: './menu-receiving-funds.component.html',
  styleUrls: ['./menu-receiving-funds.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuReceivingFundsComponent implements OnInit {
  menuItems$: Observable<MenuReceivingFundsListItem[]>;
  contentString: { [key: string]: string };

  constructor(private readonly accountsService: AccountService,
              private readonly router: Router) {
  }

  ngOnInit() {
    this.setContentStrings();
    this.menuItems$ = this.accountsService.settings$.pipe(
      map(settings => this.handleListItems(settings).filter(item => item),
      ));
  }

  //TODO: Add correct Desktop Settings for menu icons

  get hasShowedItem$(): Observable<boolean> {
    return this.menuItems$.pipe(map(items => items.some((item) => item && item.isShow)));
  }

  redirect(name: string) {
    this.router.navigate([PATRON_NAVIGATION.accounts, MENU_LIST_ROUTES.get(name)]);
  }

  trackByMenuName(i: number, { name }: MenuReceivingFundsListItem): string {
    return name;
  }

  private handleListItems(settings: SettingInfo[]): MenuReceivingFundsListItem[] {
    const navList = Array.from(MENU_LIST_ITEMS.keys());

    return navList.map((element) => {
      const setting = settings.find(setting => setting !== null && setting.name === element);

      if (!setting) return;
      let displayName = '';

      switch (setting.name) {
        case Settings.Setting.AUTO_DEPOSIT_ENABLED.split('.')[2]:
          displayName = this.contentString[CONTENT_STRINGS.autoDepositBtn];
          break;
        case Settings.Setting.LOW_BALANCE_AUTO_DEPOSIT_ENABLED.split('.')[2]:
          displayName = this.contentString[CONTENT_STRINGS.autoDepositBtn];
          break;
        case Settings.Setting.ONETIME_DEPOSITS_ENABLED.split('.')[2]:
          displayName = this.contentString[CONTENT_STRINGS.addFundsBtn];
          break;
        case Settings.Setting.GUEST_DEPOSIT_ENABLED.split('.')[2]:
          displayName = this.contentString[CONTENT_STRINGS.requestFundsBtn];
          break;
        case Settings.Setting.MEAL_DONATIONS_ENABLED.split('.')[2]:
          // There are no ui-patron Content Settings API response for meal donations
          displayName = this.contentString[CONTENT_STRINGS.mealDonationsBtn];
          break;
      }

      return element !== null && {
        name: setting.name,
        displayName: displayName,
        isShow: Boolean(Number(setting.value)),
      };
    }).reduce((prev, current) => {

      const elemIndex =  prev.findIndex((item) => item && item?.displayName === current?.displayName);
      if (elemIndex !== -1) {
        prev[elemIndex] = { ...prev[elemIndex], isShow: current.isShow ? current.isShow : prev[elemIndex].isShow };
        return prev;
      }

      return [...prev, current];
    }, []);
  }

  async setContentStrings() {
    const accountStringNames: string[] = [
      CONTENT_STRINGS.autoDepositBtn,
      CONTENT_STRINGS.requestFundsBtn,
      CONTENT_STRINGS.addFundsBtn,
      CONTENT_STRINGS.mealDonationsBtn,
    ];

    this.contentString = this.accountsService.getContentStrings(accountStringNames);
  }
}
