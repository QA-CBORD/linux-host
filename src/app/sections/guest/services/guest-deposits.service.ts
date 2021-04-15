import { Injectable } from '@angular/core';
import { SettingsFacadeService } from '@core/facades/settings/settings-facade.service';
import { UserFacadeService } from '@core/facades/user/user.facade.service';
import { UserAccount } from '@core/model/account/account.model';
import { SettingInfo } from '@core/model/configuration/setting-info.model';
import { CommerceApiService } from '@core/service/commerce/commerce-api.service';
import { Observable, of } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import { User } from 'src/app/app.global';

@Injectable({ providedIn: 'root' })
export class GuestDepositsService {
  constructor(
    private readonly settingsFacadeService: SettingsFacadeService,
    private readonly commerceApiService: CommerceApiService,
    private readonly userFacadeService: UserFacadeService
  ) {}

  getRecipientList(settings: User.Settings): Promise<SettingInfo> {
    CommerceApiService;
    return this.settingsFacadeService.getUserSetting(settings).toPromise();
  }

  saveRecipientList(settings: User.Settings, value: string): Promise<boolean> {
    return this.settingsFacadeService.saveUserSetting(settings, value).toPromise();
  }

  guestAccounts(): Observable<UserAccount[]> {
    return this.userFacadeService.getUserData$().pipe(
      switchMap(({ id: userId }) => {
        console.log('guest id: ', userId)
        return this.userAccounts(userId);
      })
    );
  }

  userAccounts(userId: string): Observable<UserAccount[]> {
    console.log('patron id: ', userId)
    return this.commerceApiService.retrieveAccountsByUser(userId).pipe(take(1));
  }

  
  guestDeposit(fromAccountId: string, toAccountId: string, amount: number): Observable<string> {
    return this.userFacadeService.getUserData$().pipe(
      switchMap(({ id: userId }) => {
        console.log('userId??? ', userId);
        return this.commerceApiService.depositForUser(userId, fromAccountId, toAccountId, amount);
      })
    );
  }
}
