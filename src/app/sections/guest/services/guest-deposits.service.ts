import { Injectable } from '@angular/core';
import { SettingsFacadeService } from '@core/facades/settings/settings-facade.service';
import { UserFacadeService } from '@core/facades/user/user.facade.service';
import { UserAccount } from '@core/model/account/account.model';
import { Observable } from 'rxjs';
import { LookupFieldInfo } from '@core/model/institution/institution-lookup-field.model';
import { UserApiService } from '@core/service/user-api/user-api.service';
import { of } from 'rxjs';
import { map, switchMap, withLatestFrom, take } from 'rxjs/operators';
import { User } from 'src/app/app.global';
import { Recipient } from '../model/recipient.model';
import { InstitutionFacadeService } from '@core/facades/institution/institution.facade.service';
import { AuthFacadeService } from '@core/facades/auth/auth.facade.service';
import { CommerceApiService } from '@core/service/commerce/commerce-api.service';

@Injectable({ providedIn: 'root' })
export class GuestDepositsService {
  constructor(
    private readonly settingsFacadeService: SettingsFacadeService,
    private readonly institutionFacadeService: InstitutionFacadeService,
    private readonly userApiService: UserApiService,
    private readonly authFacadeService: AuthFacadeService,
    private readonly userFacadeService: UserFacadeService,
    private readonly commerceApiService: CommerceApiService
  ) {}

  getRecipientList(): Promise<Recipient[]> {
    return this.settingsFacadeService
      .getUserSetting(User.Settings.GUEST_DEPOSIT_RECIPIENTS)
      .pipe(map(res => JSON.parse(res.value || '[]')))
      .toPromise();
  }

  saveRecipientList(recipients: Recipient[]): Promise<boolean> {
    return this.settingsFacadeService
      .saveUserSetting(User.Settings.GUEST_DEPOSIT_RECIPIENTS, JSON.stringify(recipients))
      .toPromise();
  }

  retrieveAndSaveRecipientByCashlessFields(
    nickname: string,
    fields: LookupFieldInfo[],
    recipients: Recipient[],
    save: boolean = false
  ): Promise<{ nickname: string; id: any }> {
    return this.authFacadeService
      .getAuthSessionToken$()
      .pipe(
        withLatestFrom(this.institutionFacadeService.cachedInstitutionInfo$),
        switchMap(([sessionId, ins]) => this.userApiService.retrieveUserIdByCashlessFields(ins.id, sessionId, fields)),
        switchMap(id => {
          const newRecepient = { nickname, id };
          if (!save) return of(newRecepient);
          recipients.push(newRecepient);
          return this.settingsFacadeService
            .saveUserSetting(User.Settings.GUEST_DEPOSIT_RECIPIENTS, JSON.stringify(recipients))
            .pipe(map(saved => saved && newRecepient));
        })
      )
      .toPromise();
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
