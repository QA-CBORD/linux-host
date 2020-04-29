import { Resolve } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable, zip } from 'rxjs';
import { finalize, first } from 'rxjs/operators';

import { AccountsService } from '@sections/accounts/services/accounts.service';
import { LoadingService } from '@core/service/loading/loading.service';
import { SettingInfoList } from '@core/model/configuration/setting-info-list.model';
import { TileConfigFacadeService } from '@sections/dashboard/tile-config-facade.service';
import { MEAL_CONTENT_STRINGS } from '@sections/accounts/pages/meal-donations/meal-donation.config.ts';
import { ContentStringsFacadeService } from '@core/facades/content-strings/content-strings.facade.service';
import { CONTENT_STINGS_CATEGORIES, CONTENT_STINGS_DOMAINS } from '../../../content-strings';
import { ORDERING_CONTENT_STRINGS } from '@sections/ordering/ordering.config';
import { ContentStringInfo } from '@core/model/content/content-string-info.model';
import { NativeData, NativeProvider } from '@core/provider/native-provider/native.provider';

@Injectable()
export class DashboardPageResolver implements Resolve<Observable<SettingInfoList>> {
  constructor(
    private readonly accountsService: AccountsService,
    private readonly loadingService: LoadingService,
    private readonly tileConfigFacadeService: TileConfigFacadeService,
    private readonly contentStringsFacadeService: ContentStringsFacadeService,
    private readonly nativeProviderService: NativeProvider,
  ) {
  }

  resolve(): Observable<any> {
    this.loadingService.showSpinner();
    const strings = this.loadContentStrings();

    const accountContentStrings = this.accountsService.initContentStringsList();
    try {
      if (this.nativeProviderService.getAndroidData(NativeData.IS_SAME_USER) != true) {
        this.tileConfigFacadeService.deleteConfigState();
      }
    } catch (e){
    }
    return zip(
      this.tileConfigFacadeService.updateTilesConfigBySystemSettings().pipe(first()),
      accountContentStrings,
      ...strings,
    ).pipe(
      finalize(() => this.loadingService.closeSpinner()),
    );
  }

  private loadContentStrings(): Observable<ContentStringInfo>[] {
    return [
      this.contentStringsFacadeService.fetchContentString$(
        CONTENT_STINGS_DOMAINS.patronUi,
        CONTENT_STINGS_CATEGORIES.mealDonation,
        MEAL_CONTENT_STRINGS.dashboardTitle),
      this.contentStringsFacadeService.fetchContentString$(
        CONTENT_STINGS_DOMAINS.patronUi,
        CONTENT_STINGS_CATEGORIES.mealDonation,
        MEAL_CONTENT_STRINGS.buttonDonateAMeal),
      this.contentStringsFacadeService.fetchContentString$(
        CONTENT_STINGS_DOMAINS.patronUi,
        CONTENT_STINGS_CATEGORIES.ordering,
        ORDERING_CONTENT_STRINGS.labelDashboard),
      this.contentStringsFacadeService.fetchContentString$(
        CONTENT_STINGS_DOMAINS.patronUi,
        CONTENT_STINGS_CATEGORIES.ordering,
        ORDERING_CONTENT_STRINGS.buttonDashboardStartOrder),
    ];
  }
}
