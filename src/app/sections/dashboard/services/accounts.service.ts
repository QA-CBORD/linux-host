import { Injectable } from '@angular/core';

import { from, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { CommerceApiService } from 'src/app/core/service/commerce/commerce-api.service';

import { PaymentSystemType, Settings } from 'src/app/app.global';
import { UserAccount } from 'src/app/core/model/account/account.model';
import { SettingInfo } from '@core/model/configuration/setting-info.model';
import { UserFacadeService } from '@core/facades/user/user.facade.service';
import { SettingsFacadeService } from '@core/facades/settings/settings-facade.service';

@Injectable()
export class AccountsService {
  constructor(
    private readonly commerceApiService: CommerceApiService,
    private readonly userFacadeService: UserFacadeService,
    private readonly settingsFacadeService: SettingsFacadeService
  ) {}

  getUserAccounts(defaults = [PaymentSystemType.OPCS, PaymentSystemType.MONETRA]): Promise<UserAccount[]> {
    return this.commerceApiService
      .getUserAccounts()
      .pipe(map(accounts => this.filterAccountsByPaymentSystem(accounts, defaults))).toPromise();
  }

  removeCreditCardAccount({ id: accountId }: UserAccount): Promise<Boolean> {
    return this.commerceApiService.removeAccount({ accountId }).toPromise();
  }

  transformStringToArray(value: string): Array<unknown> {
    if (!value || !value.length) return [];
    const result = JSON.parse(value);
    return Array.isArray(result) ? result : [];
  }

  getAccountsFilteredByDisplayTenders(): Observable<UserAccount[]> {
    return this.settingsFacadeService.getSetting(Settings.Setting.DISPLAY_TENDERS).pipe(
      map(({ value }) => this.transformStringToArray(value)),
      switchMap((tenderIds: Array<string>) =>
      from(this.getUserAccounts([PaymentSystemType.OPCS, PaymentSystemType.CSGOLD]
        )).pipe(map(accounts => this.filterAccountsByTenders(tenderIds, accounts)))
      )
    );
  }

  getAccountsFilteredByDepositTenders(): Observable<UserAccount[]> {
    return this.settingsFacadeService.getSetting(Settings.Setting.DEPOSIT_TENDERS).pipe(
      map(({ value }) => this.transformStringToArray(value)),
      switchMap((tenderIds: Array<string>) =>
        from(this.getUserAccounts()).pipe(map(accounts => this.filterAccountsByTenders(tenderIds, accounts)))
      )
    );
  }

  private filterAccountsByTenders(tendersId: Array<string>, accounts: Array<UserAccount>): Array<UserAccount> {
    return accounts.filter(({ accountTender: tId }) => tendersId.includes(tId));
  }

  private filterAccountsByPaymentSystem(accounts: UserAccount[], paymentSistems:number[]): UserAccount[] {
    return accounts.filter(
      ({ paymentSystemType: type }) => paymentSistems.includes(type)
    );
  }

  getUserSettings(settings: Settings.Setting[]): Observable<SettingInfo[]> {
    return this.settingsFacadeService.getSettings(settings);
  }
}
