import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable, zip } from 'rxjs';
import { LoadingService } from 'src/app/core/service/loading/loading.service';
import { finalize } from 'rxjs/operators';
import { SYSTEM_SETTINGS_CONFIG} from '../../../accounts.config';
import { ContentStringRequest } from '@core/model/content/content-string-request.model';
import { SettingInfo } from '@core/model/configuration/setting-info.model';
import { MealDonationsService } from '../../../services/meal-donations.service';
import { AccountsService } from '@sections/accounts/services/accounts.service';

@Injectable()
export class MealDonationsResolver implements Resolve<Observable<SettingInfo[]>> {
  constructor(
    private readonly loadingService: LoadingService,
    private readonly mealDonationsService: MealDonationsService,
    private readonly accountsService: AccountsService
  ) {}
  resolve(): Observable<any> {
    const requireSettings: ContentStringRequest[] = [
      SYSTEM_SETTINGS_CONFIG.mealsTenders,
      SYSTEM_SETTINGS_CONFIG.mealsAllowFreeform,
      SYSTEM_SETTINGS_CONFIG.mealsFixedDollarAmounts,
      SYSTEM_SETTINGS_CONFIG.mealsFixedMealAmounts,
    ];

    const accountContentStrings = this.accountsService.initContentStringsList();
    const accountsCall = this.mealDonationsService.getUserAccounts();
    const settingsCall = this.mealDonationsService.getUserSettings(requireSettings);
    this.loadingService.showSpinner();
    return zip(accountsCall, settingsCall, accountContentStrings).pipe(
      finalize(() => this.loadingService.closeSpinner())
    );
  }
}
