import { Injectable } from '@angular/core';

import { Observable, firstValueFrom, zip } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { CommerceApiService } from 'src/app/core/service/commerce/commerce-api.service';

import { PaymentSystemType, Settings } from 'src/app/app.global';
import { UserAccount } from 'src/app/core/model/account/account.model';
import { SettingInfo } from '@core/model/configuration/setting-info.model';
import { SettingsFacadeService } from '@core/facades/settings/settings-facade.service';
import { AuthFacadeService } from '@core/facades/auth/auth.facade.service';
import { CreditPaymentMethods } from '@core/model/account/credit-payment-methods.model';
import { UserFacadeService } from '@core/facades/user/user.facade.service';

@Injectable()
export class AccountsService {
  constructor(
    private readonly commerceApiService: CommerceApiService,
    private readonly settingsFacadeService: SettingsFacadeService,
    private readonly authFacadeService: AuthFacadeService,
    private readonly userFacadeService: UserFacadeService
  ) {}

  getUserAccounts(defaults = [PaymentSystemType.OPCS, PaymentSystemType.MONETRA]): Observable<UserAccount[]> {
    return this.commerceApiService
      .getUserAccounts()
      .pipe(map(accounts => this.filterAccountsByPaymentSystem(accounts, defaults)));
  }

  removeCreditCardAccount({ id: accountId }: UserAccount): Promise<boolean> {
    return firstValueFrom(this.commerceApiService.removeAccount({ accountId }));
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
        this.getUserAccounts([PaymentSystemType.OPCS, PaymentSystemType.CSGOLD]).pipe(
          map(accounts => this.filterAccountsByTenders(tenderIds, accounts))
        )
      )
    );
  }

  getAccountsFilteredByDepositTenders(): Observable<UserAccount[]> {
    return this.settingsFacadeService.getSetting(Settings.Setting.DEPOSIT_TENDERS).pipe(
      map(({ value }) => this.transformStringToArray(value)),
      switchMap((tenderIds: Array<string>) =>
        this.getUserAccounts().pipe(map(accounts => this.filterAccountsByTenders(tenderIds, accounts)))
      )
    );
  }

  private filterAccountsByTenders(tendersId: Array<string>, accounts: Array<UserAccount>): Array<UserAccount> {
    return accounts.filter(({ accountTender: tId }) => tendersId.includes(tId));
  }

  private filterAccountsByPaymentSystem(accounts: UserAccount[], paymentSistems: number[]): UserAccount[] {
    return accounts.filter(({ paymentSystemType: type }) => paymentSistems.includes(type));
  }

  getUserSettings(settings: Settings.Setting[]): Observable<SettingInfo[]> {
    return this.settingsFacadeService.getSettings(settings);
  }

  getAllowedPaymentsMethods(paymentSystemType: number): Observable<CreditPaymentMethods[]> {
    return zip(this.authFacadeService.getAuthSessionToken$(), this.userFacadeService.getUserData$()).pipe(
      switchMap(([sessionId, user]) =>
        this.commerceApiService.getAllowedPaymentsMethods(sessionId, paymentSystemType, user.id)
      )
    );
  }
}
