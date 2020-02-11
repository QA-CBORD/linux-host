import { Injectable } from '@angular/core';

import { Observable, zip } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { CommerceApiService } from 'src/app/core/service/commerce/commerce-api.service';
import { ConfigurationService as ConfigService } from 'src/app/core/service/configuration/configuration.service';
import { UserService } from 'src/app/core/service/user-service/user.service';

import { PaymentSystemType, Settings } from 'src/app/app.global';
import { UserAccount } from 'src/app/core/model/account/account.model';
import { ContentStringRequest } from '@core/model/content/content-string-request.model';
import { SettingInfo } from '@core/model/configuration/setting-info.model';
import { ConfigurationService } from '@core/service/config-service/configuration.service';

@Injectable()
export class AccountsService {

  constructor(
    private readonly commerceApiService: CommerceApiService,
    private readonly userService: UserService,
    private readonly configService: ConfigService,
    private readonly configurationService: ConfigurationService,
  ) {
  }

  getUserAccounts(): Observable<UserAccount[]> {
    return this.commerceApiService.getUserAccounts().pipe(
      map(accounts => this.filterAccountsByPaymentSystem(accounts)),
    );
  }

  transformStringToArray(value: string): Array<unknown> {
    if (!value.length) return [];
    const result = JSON.parse(value);
    return Array.isArray(result) ? result : [];
  }

  getAccountsFilteredByDisplayTenders(): Observable<UserAccount[]> {
    return this.userService.userData.pipe(
      switchMap(({ institutionId }) => this.configService.getSetting(institutionId, Settings.Setting.DISPLAY_TENDERS)),
      map(({ value }) => this.transformStringToArray(value)),
      switchMap((tenderIds: Array<string>) =>
        this.getUserAccounts().pipe(map(accounts => this.filterAccountsByTenders(tenderIds, accounts))),
      ),
    );
  }

  getAccountsFilteredByDepositTenders(): Observable<UserAccount[]> {
    return this.userService.userData.pipe(
      switchMap(({ institutionId }) => this.configService.getSetting(institutionId, Settings.Setting.DEPOSIT_TENDERS)),
      map(({ value }) => this.transformStringToArray(value)),
      switchMap((tenderIds: Array<string>) =>
        this.getUserAccounts().pipe(map(accounts => this.filterAccountsByTenders(tenderIds, accounts))),
      ),
    );
  }

  private filterAccountsByTenders(tendersId: Array<string>, accounts: Array<UserAccount>): Array<UserAccount> {
    return accounts.filter(({ accountTender: tId }) => tendersId.includes(tId));
  }

  private filterAccountsByPaymentSystem(accounts: UserAccount[]): UserAccount[] {
    return accounts.filter(
      ({ paymentSystemType: type }) => type === PaymentSystemType.OPCS || type === PaymentSystemType.CSGOLD,
    );
  }

  getUserSettings(settings: ContentStringRequest[]): Observable<SettingInfo[]> {
    const requestArray = settings.map(setting => this.configurationService.getSettingByConfig(setting));

    return zip(...requestArray);
  }
}
