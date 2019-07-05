import { Resolve } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable, zip } from 'rxjs';
import { AccountsService } from '../services/accounts.service';
import { SYSTEM_SETTINGS_CONFIG } from '../accounts.config';
import { UserAccount } from '../../../core/model/account/account.model';
import { SettingInfo } from '../../../core/model/configuration/setting-info.model';

@Injectable()
export class AccountsPageResolver implements Resolve<Observable<[UserAccount[], SettingInfo[]]>> {
  constructor(private readonly accountsService: AccountsService) {}

  resolve(): Observable<[UserAccount[], SettingInfo[]]> {
    const requireSettings = [
      SYSTEM_SETTINGS_CONFIG.depositTenders,
      SYSTEM_SETTINGS_CONFIG.enableAutoDeposits,
      SYSTEM_SETTINGS_CONFIG.enableOnetimeDeposits,
    ];
    const accountsCall = this.accountsService.getUserAccounts();
    const settingsCall = this.accountsService.getUserSettings(requireSettings);

    return zip(accountsCall, settingsCall);
  }
}
