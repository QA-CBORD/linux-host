import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { LoadingService } from 'src/app/core/service/loading/loading.service';
import { tap } from 'rxjs/operators';
import { SYSTEM_SETTINGS_CONFIG } from '../accounts.config';
import { ContentStringRequest } from '@core/model/content/content-string-request.model';
import { SettingInfo } from '@core/model/configuration/setting-info.model';
import { SettingService } from '@core/service/settings/setting.service';

@Injectable()
export class MealDonationsResolver implements Resolve<Observable<SettingInfo[]>> {
  constructor(private readonly loadingService: LoadingService, private readonly settingsService: SettingService) {}
  resolve(): Observable<any> {
    
    const requireSettings: ContentStringRequest[] = [
      SYSTEM_SETTINGS_CONFIG.mealDonationsTenders,
      SYSTEM_SETTINGS_CONFIG.mealDonationsAllowFreeform,
      SYSTEM_SETTINGS_CONFIG.mealDonationsFixedDollarAmounts,
      SYSTEM_SETTINGS_CONFIG.mealDonationsFixedMealAmounts,
    ];
    
    const mealDonationsSettings = this.settingsService.getUserSettings(requireSettings);
    this.loadingService.showSpinner();

    return mealDonationsSettings.pipe(
      tap(() => this.loadingService.closeSpinner(), () => this.loadingService.closeSpinner())
    );
  }
}
