import { Injectable } from '@angular/core';
import { AuthFacadeService } from '@core/facades/auth/auth.facade.service';
import { InstitutionFacadeService } from '@core/facades/institution/institution.facade.service';
import { SettingsFacadeService } from '@core/facades/settings/settings-facade.service';
import { SettingInfo } from '@core/model/configuration/setting-info.model';
import { combineLatest, Observable } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import { Settings, User } from 'src/app/app.global';

@Injectable()
export class GuestDepositsService {
  private guestUserId: string;
  private recipient: string;
  constructor(
    private readonly settingsFacadeService: SettingsFacadeService,
    private readonly institutionFacadeService: InstitutionFacadeService
  ) {}

  getRecipientList(settings: User.Settings): Promise<SettingInfo> {
    return this.settingsFacadeService
      .getUserSetting(settings)
      .toPromise();
  }

  saveRecipientList(settings: User.Settings, value: string): Promise<boolean> {
    return this.settingsFacadeService
      .saveUserSetting(settings, value)
      .toPromise();
  }

  setGuestDepositData(userId: string, recipientName: string) {
    this.guestUserId = userId;
    this.recipient = recipientName;
  }

  getGuestUserId(): string {
     return this.guestUserId;
  }

  getGuestRecipientName(): string {
    return this.recipient;
 }
}
