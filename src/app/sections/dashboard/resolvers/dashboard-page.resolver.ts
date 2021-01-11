import { Resolve } from '@angular/router';
import { Injectable } from '@angular/core';
import { from, Observable, zip } from 'rxjs';
import { finalize, first, map, switchMap, take } from 'rxjs/operators';

import { AccountsService } from '@sections/accounts/services/accounts.service';
import { LoadingService } from '@core/service/loading/loading.service';
import { SettingInfoList } from '@core/model/configuration/setting-info-list.model';
import { TileConfigFacadeService } from '@sections/dashboard/tile-config-facade.service';
import { MEAL_CONTENT_STRINGS } from '@sections/accounts/pages/meal-donations/meal-donation.config.ts';
import { ContentStringsFacadeService } from '@core/facades/content-strings/content-strings.facade.service';
import { CONTENT_STRINGS_CATEGORIES, CONTENT_STRINGS_DOMAINS } from '../../../content-strings';
import { ORDERING_CONTENT_STRINGS } from '@sections/ordering/ordering.config';
import { ContentStringInfo } from '@core/model/content/content-string-info.model';
import { Settings } from '../../../app.global';
import { InstitutionFacadeService } from '@core/facades/institution/institution.facade.service';
import { SettingsFacadeService } from '@core/facades/settings/settings-facade.service';
import { UserFacadeService } from '@core/facades/user/user.facade.service';
import { MobileCredentialFacade } from '@shared/ui-components/mobile-credentials/service/mobile-credential-facade.service';

@Injectable()
export class DashboardPageResolver implements Resolve<Observable<SettingInfoList>> {
  constructor(
    private readonly accountsService: AccountsService,
    private readonly userFacadeService: UserFacadeService,
    private readonly tileConfigFacadeService: TileConfigFacadeService,
    private readonly contentStringsFacadeService: ContentStringsFacadeService,
    private readonly institutionService: InstitutionFacadeService,
    private readonly settingsFacadeService: SettingsFacadeService,
    private readonly loadingService: LoadingService,
    private readonly mobileCredentialFacade: MobileCredentialFacade
  ) {}

  resolve(): Observable<SettingInfoList> {
    this.loadingService.showSpinner();

    /// get fresh data on dashboard load
    const strings = this.loadContentStrings();
    const user = this.userFacadeService.getUser$();
    const inst = this.institutionService.fetchInstitutionData();
    const call = this.settingsFacadeService.fetchSettingList(Settings.SettingList.FEATURES);
    const accountContentStrings = this.accountsService.initContentStringsList();
    const mCredential$ = this.mobileCredentialFacade.mobileCredentialEnabled$();

    return zip(
      user,
      inst,
      call,
      this.tileConfigFacadeService.updateTilesConfigBySystemSettings().pipe(first()),
      mCredential$,
      accountContentStrings,
      ...strings
    ).pipe(
      map(
        ([
          userInfo,
          institutionInfo,
          featureSettingsList,
          tilesConfig,
          credentialEnabled,
          accountsContentStrings,
          otherContentStrings,
        ]) => featureSettingsList
      ),
      take(1),
      finalize(() => this.loadingService.closeSpinner())
    );
  }

  private loadContentStrings(): Observable<ContentStringInfo>[] {
    return [
      this.contentStringsFacadeService.fetchContentString$(
        CONTENT_STRINGS_DOMAINS.patronUi,
        CONTENT_STRINGS_CATEGORIES.mealDonation,
        MEAL_CONTENT_STRINGS.dashboardTitle
      ),
      this.contentStringsFacadeService.fetchContentString$(
        CONTENT_STRINGS_DOMAINS.patronUi,
        CONTENT_STRINGS_CATEGORIES.mealDonation,
        MEAL_CONTENT_STRINGS.buttonDonateAMeal
      ),
      this.contentStringsFacadeService.fetchContentString$(
        CONTENT_STRINGS_DOMAINS.patronUi,
        CONTENT_STRINGS_CATEGORIES.ordering,
        ORDERING_CONTENT_STRINGS.labelDashboard
      ),
      this.contentStringsFacadeService.fetchContentString$(
        CONTENT_STRINGS_DOMAINS.patronUi,
        CONTENT_STRINGS_CATEGORIES.ordering,
        ORDERING_CONTENT_STRINGS.buttonDashboardStartOrder
      ),
    ];
  }
}
