import { Injectable } from '@angular/core';
import { Observable, zip } from 'rxjs';
import { LoadingService } from 'src/app/core/service/loading/loading.service';
import { finalize } from 'rxjs/operators';
import { SettingInfo } from '@core/model/configuration/setting-info.model';
import { MealDonationsService } from '../service/meal-donations.service';
import { AccountService } from '@sections/accounts/services/accounts.service';
import { Settings } from '../../../../../app.global';
import { UserAccount } from '@core/model/account/account.model';
import { ContentStringInfo } from '@core/model/content/content-string-info.model';

type MealDonationsResolution = Observable<[UserAccount[], SettingInfo[], ContentStringInfo[], ContentStringInfo[]]>;

@Injectable()
export class MealDonationsResolver  {
  constructor(
    private readonly loadingService: LoadingService,
    private readonly mealDonationsService: MealDonationsService,
    private readonly accountsService: AccountService
  ) {}

  resolve(): MealDonationsResolution {
    const requiredSettings: Settings.Setting[] = [
      Settings.Setting.MEAL_DONATIONS_TENDERS,
      Settings.Setting.MEAL_DONATIONS_FREEFORM_ENABLED,
      Settings.Setting.MEAL_DONATIONS_FIXED_DOLLAR_AMOUNTS,
      Settings.Setting.MEAL_DONATIONS_FIXED_MEAL_AMOUNTS,
    ];

    const accountContentStrings = this.accountsService.initContentStringsList();
    const accountsCall = this.mealDonationsService.getUserAccounts();
    const settingsCall = this.mealDonationsService.getUserSettings(requiredSettings);
    const contentStrings = this.mealDonationsService.fetchMealsDonationContentStrings$();
    this.loadingService.showSpinner();

    return zip(accountsCall, settingsCall, accountContentStrings, contentStrings).pipe(
      finalize(() => this.loadingService.closeSpinner())
    );
  }
}
