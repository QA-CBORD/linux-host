import { Injectable } from '@angular/core';
import { SettingsFacadeService } from '@core/facades/settings/settings-facade.service';
import { SettingInfo } from '@core/model/configuration/setting-info.model';
import { CommerceApiService } from '@core/service/commerce/commerce-api.service';
import { User } from 'src/app/app.global';

@Injectable({ providedIn: 'root' })
export class GuestDepositsService {
  constructor(
    private readonly settingsFacadeService: SettingsFacadeService,
    private readonly commerceApiService: CommerceApiService
  ) {}

  getRecipientList(settings: User.Settings): Promise<SettingInfo> {
    CommerceApiService
    return this.settingsFacadeService
      .getUserSetting(settings)
      .toPromise();
  }

  saveRecipientList(settings: User.Settings, value: string): Promise<boolean> {
    return this.settingsFacadeService
      .saveUserSetting(settings, value)
      .toPromise();
  }

  guestAccounts(userId: string) {
   return this.commerceApiService.retrieveAccountsByUser(userId);
  }

  guestDeposit(userId: string, fromAccountId: string, toAccountId: string, amount: number) {
    return this.commerceApiService.depositForUser(userId, fromAccountId, toAccountId, amount);
   }
}
