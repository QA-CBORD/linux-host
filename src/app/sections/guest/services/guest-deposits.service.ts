import { Injectable } from '@angular/core';
import { AuthFacadeService } from '@core/facades/auth/auth.facade.service';
import { InstitutionFacadeService } from '@core/facades/institution/institution.facade.service';
import { SettingsFacadeService } from '@core/facades/settings/settings-facade.service';
import { LookupFieldInfo } from '@core/model/institution/institution-lookup-field.model';
import { UserApiService } from '@core/service/user-api/user-api.service';
import { of } from 'rxjs';
import { map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { User } from 'src/app/app.global';
import { Recipient } from '../model/recipient.model';

@Injectable()
export class GuestDepositsService {
  constructor(
    private readonly settingsFacadeService: SettingsFacadeService,
    private readonly institutionFacadeService: InstitutionFacadeService,
    private readonly userApiService: UserApiService,
    private readonly authFacadeService: AuthFacadeService
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
}
