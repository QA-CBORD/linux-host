import { Injectable } from '@angular/core';
import { InstitutionFacadeService } from '@core/facades/institution/institution.facade.service';
import { SettingsFacadeService } from '@core/facades/settings/settings-facade.service';
import { map } from 'rxjs/operators';
import { User } from 'src/app/app.global';
import { Recipient } from '../model/recipient.model';

@Injectable()
export class GuestDepositsService {
  constructor(
    private readonly settingsFacadeService: SettingsFacadeService,
    private readonly institutionFacadeService: InstitutionFacadeService
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
}
