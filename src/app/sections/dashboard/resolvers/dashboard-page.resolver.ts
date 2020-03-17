import { Resolve } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable, zip } from 'rxjs';
import { finalize, first } from 'rxjs/operators';

import { AccountsService } from '@sections/accounts/services/accounts.service';
import { LoadingService } from '@core/service/loading/loading.service';
import { SettingInfoList } from '@core/model/configuration/setting-info-list.model';
import { DashboardService } from '../services';
import { TileConfigFacadeService } from '@sections/dashboard/tile-config-facade.service';
import { CONTENT_STRING_NAMES } from '@sections/accounts/pages/meal-donations/content-strings';
import { ContentStringsFacadeService } from '@core/facades/content-strings/content-strings.facade.service';
import { CONTENT_STINGS_CATEGORIES, CONTENT_STINGS_DOMAINS } from '../../../content-strings';
import { ORDERING_CONTENT_STRINGS } from '@sections/ordering/ordering.config';
import { ContentStringInfo } from '@core/model/content/content-string-info.model';

@Injectable()
export class DashboardPageResolver implements Resolve<Observable<SettingInfoList>> {
  constructor(
    private readonly dashboardService: DashboardService,
    private readonly accountsService: AccountsService,
    private readonly loadingService: LoadingService,
    private readonly tileConfigFacadeService: TileConfigFacadeService,
    private readonly contentStringsFacadeService: ContentStringsFacadeService,
  ) {
  }

  resolve(): Observable<any> {
    this.loadingService.showSpinner();
    const strings = this.loadContentStrings();

    const accountContentStrings = this.accountsService.initContentStringsList();
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
        CONTENT_STRING_NAMES.dashboardTitle),
      this.contentStringsFacadeService.fetchContentString$(
        CONTENT_STINGS_DOMAINS.patronUi,
        CONTENT_STINGS_CATEGORIES.mealDonation,
        CONTENT_STRING_NAMES.buttonDonateAMeal),
      this.contentStringsFacadeService.fetchContentString$(
        CONTENT_STINGS_DOMAINS.patronUi,
        CONTENT_STINGS_CATEGORIES.ordering,
        ORDERING_CONTENT_STRINGS.labelDashboard),
    ];
  }
}
