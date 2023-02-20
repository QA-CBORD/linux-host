import { Injectable } from '@angular/core';
import { SettingsFacadeService } from '@core/facades/settings/settings-facade.service';
import { UserFacadeService } from '@core/facades/user/user.facade.service';
import { UserAccount } from '@core/model/account/account.model';
import { Observable, throwError, of } from 'rxjs';
import { LookupFieldInfo } from '@core/model/institution/institution-lookup-field.model';
import { UserApiService } from '@core/service/user-api/user-api.service';
import { map, switchMap, withLatestFrom, take, catchError } from 'rxjs/operators';
import { User } from 'src/app/app.global';
import { Recipient } from '../model/recipient.model';
import { InstitutionFacadeService } from '@core/facades/institution/institution.facade.service';
import { AuthFacadeService } from '@core/facades/auth/auth.facade.service';
import { CommerceApiService } from '@core/service/commerce/commerce-api.service';
import { handleServerError } from '@core/utils/general-helpers';
import { ACCOUNTS_VALIDATION_ERRORS } from '@sections/accounts/accounts.config';
import { ToastService } from '@core/service/toast/toast.service';

@Injectable({ providedIn: 'root' })
export class GuestDepositsService {
  constructor(
    private readonly settingsFacadeService: SettingsFacadeService,
    private readonly institutionFacadeService: InstitutionFacadeService,
    private readonly userApiService: UserApiService,
    private readonly authFacadeService: AuthFacadeService,
    private readonly userFacadeService: UserFacadeService,
    private readonly commerceApiService: CommerceApiService,
    private readonly toastService: ToastService
  ) {}

  getRecipientList(): Observable<Recipient[]> {
    return this.settingsFacadeService
      .getUserSettingNoCache(User.Settings.GUEST_DEPOSIT_RECIPIENTS)
      .pipe(map(res => JSON.parse(res.value || '[]')));
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
    save = false
  ): Promise<{ nickname: string; id: string }> {
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
    return this.authFacadeService.isGuestUser().pipe(
      switchMap(isGuest => this.handleGuestUser(isGuest)),
      switchMap(({ id: userId }) => {
        return this.commerceApiService.retrieveAccountsByUser(userId).pipe(take(1));
      }),
      handleServerError(ACCOUNTS_VALIDATION_ERRORS),
      catchError(err => {
        this.onErrorRetrieve(err);
        return throwError(() => new Error(err));
      })
    );
  }

  recipientAccounts(userId: string): Observable<UserAccount[]> {
    return this.commerceApiService.retrieveDepositAccountsByUser(userId).pipe(
      handleServerError(ACCOUNTS_VALIDATION_ERRORS),
      catchError(err => {
        this.onErrorRetrieve(err);
        return throwError(() => new Error(err));
      }),
      take(1)
    );
  }

  guestDeposit(fromAccountId: string, toAccountId: string, amount: number): Observable<string> {
    return this.authFacadeService.isGuestUser().pipe(
      switchMap(isGuest => this.handleGuestUser(isGuest)),
      switchMap(({ id: userId }) => {
        return this.commerceApiService.depositForUser(userId, fromAccountId, toAccountId, amount);
      })
    );
  }

  private async onErrorRetrieve(message: any) {
    await this.toastService.showToast({ message, duration: 5000 });
  }

  private handleGuestUser(isGuest: boolean) {
    if (isGuest) {
      return this.userFacadeService.getUserData$();
    }
    return throwError(() => new Error('You are not logged in as a Guest.'));
  }
}
