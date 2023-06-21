import { Injectable } from '@angular/core';
import { ContentStringsFacadeService } from '@core/facades/content-strings/content-strings.facade.service';
import { SettingsFacadeService } from '@core/facades/settings/settings-facade.service';
import { ToastService } from '@core/service/toast/toast.service';
import { ORDERING_CONTENT_STRINGS } from '@sections/ordering/ordering.config';
import { firstValueFrom, map } from 'rxjs';
import { Settings } from 'src/app/app.global';
import { CONTENT_STRINGS_CATEGORIES, CONTENT_STRINGS_DOMAINS } from 'src/app/content-strings';

@Injectable({ providedIn: 'root' })
export class LockDownService {
  lockDownMessage: string;
  lockDownFlag: boolean;

  constructor(
    private readonly contentStringsFacadeService: ContentStringsFacadeService,
    private readonly settingsFacadeService: SettingsFacadeService,
    private readonly toastService: ToastService
  ) {}

  async loadStringsAndSettings(): Promise<void> {
    this.lockDownMessage = await firstValueFrom(
      this.contentStringsFacadeService.getContentStringValue$(
        CONTENT_STRINGS_DOMAINS.get_common,
        CONTENT_STRINGS_CATEGORIES.error_message,
        ORDERING_CONTENT_STRINGS.disableOrdering
      )
    );

    this.lockDownFlag = await firstValueFrom(
      this.settingsFacadeService
        .fetchSettingValue$(Settings.Setting.LOCK_DOWN_ORDERING)
        .pipe(map(sett => Boolean(sett === '1')))
    );
  }

  isLockDownOn(): boolean {
    if (this.lockDownFlag) {
      this.toastService.showError(this.lockDownMessage, 5000, 'bottom');
      return true;
    }

    return false;
  }
}
