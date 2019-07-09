import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Observable, zip } from 'rxjs';
import { map } from 'rxjs/operators';

import { SettingInfo } from '../../../../core/model/configuration/setting-info.model';
import { AccountsService } from '../../services/accounts.service';
import { UserAccount } from '../../../../core/model/account/account.model';
import { AccountSettingInfo } from '../../models/account-setting-info.model';
import { NAVIGATE } from '../../../../app.global';
import { MENU_LIST_ROUTES } from './local.config';
import { SYSTEM_SETTINGS_CONFIG } from '../../accounts.config';

@Component({
  selector: 'st-menu-receiving-funds',
  templateUrl: './menu-receiving-funds.component.html',
  styleUrls: ['./menu-receiving-funds.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuReceivingFundsComponent implements OnInit {
  settings$: Observable<AccountSettingInfo[]>;

  constructor(private readonly accountsService: AccountsService, private readonly router: Router) {}

  ngOnInit() {
    this.settings$ = zip(this.accountsService.settings$, this.accountsService.accounts$).pipe(
      map(([settings, accounts]) => this.expandSetting(settings, accounts))
    );
  }

  redirect(name: string) {
    this.router.navigate([NAVIGATE.accounts, MENU_LIST_ROUTES.get(name)]);
  }

  private expandSetting(settings: SettingInfo[], accounts: UserAccount[]): AccountSettingInfo[] {
    return settings.map(setting => {
      if (setting.name === SYSTEM_SETTINGS_CONFIG.depositTenders.name) {
        return { ...setting, isShow: this.hasTenderInAccounts(setting, accounts) };
      }
      return { ...setting, isShow: Boolean(Number(setting.value)) };
    });
  }

  private hasTenderInAccounts({ value: funds }: SettingInfo, accounts: UserAccount[]): boolean {
    if (!funds.length || !accounts.length) return false;
    const _funds = JSON.parse(funds);
    if (!Array.isArray(_funds) || !_funds.length) return false;

    return !!accounts.find(({ accountTender }) => _funds.includes(accountTender));
  }
}
