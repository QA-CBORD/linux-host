import { ActivatedRouteSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable, zip } from 'rxjs';
import { finalize, first, map, take } from 'rxjs/operators';
import { AccountService } from '@sections/accounts/services/accounts.service';
import { LoadingService } from '@core/service/loading/loading.service';
import { SettingInfoList } from '@core/model/configuration/setting-info-list.model';
import { TileConfigFacadeService } from '@sections/dashboard/tile-config-facade.service';
import { ContentStringsFacadeService } from '@core/facades/content-strings/content-strings.facade.service';
import { CONTENT_STRINGS_CATEGORIES, CONTENT_STRINGS_DOMAINS } from '../../../content-strings';
import { ContentStringInfo } from '@core/model/content/content-string-info.model';
import { Settings } from '../../../app.global';
import { InstitutionFacadeService } from '@core/facades/institution/institution.facade.service';
import { SettingsFacadeService } from '@core/facades/settings/settings-facade.service';
import { UserFacadeService } from '@core/facades/user/user.facade.service';
import { MobileCredentialFacade } from '@shared/ui-components/mobile-credentials/service/mobile-credential-facade.service';
import { ProminentDisclosureService } from '../services/prominent-disclosure.service';
import { Institution } from '@core/model/institution';
import { TileWrapperConfig } from '../models';
import { UserInfo } from '@core/model/user';
import { SettingInfo } from '@core/model/configuration/setting-info.model';

@Injectable()
export class DashboardPageResolver {
  constructor(
    private readonly accountsService: AccountService,
    private readonly userFacadeService: UserFacadeService,
    private readonly tileConfigFacadeService: TileConfigFacadeService,
    private readonly contentStringsFacadeService: ContentStringsFacadeService,
    private readonly institutionService: InstitutionFacadeService,
    private readonly settingsFacadeService: SettingsFacadeService,
    private readonly loadingService: LoadingService,
    private readonly mobileCredentialFacade: MobileCredentialFacade,
    private readonly prominentDisclosureService: ProminentDisclosureService
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<SettingInfoList> | Promise<SettingInfoList> {
    const showLoading = !(route.queryParams.skipLoading && JSON.parse(route.queryParams.skipLoading));

    this.prominentDisclosureService.openProminentDisclosure();
    /// get fresh data on dashboard load
    showLoading && this.loadingService.showSpinner();

    return this.loadAllData().pipe(
      take(1),
      map(([, , featureSettingsList]) => featureSettingsList),
      finalize(() => showLoading && this.loadingService.closeSpinner())
    );
  }

  private loadAllData(): Observable<
    [
      UserInfo,
      Institution,
      SettingInfoList,
      boolean,
      TileWrapperConfig[],
      ContentStringInfo[],
      SettingInfo,
      ...ContentStringInfo[][]
    ]
  > {
    const strings = this.loadContentStrings();
    const user = this.userFacadeService.getUser$();
    const inst = this.institutionService.fetchInstitutionData();
    const settingList = this.settingsFacadeService.fetchSettingList(Settings.SettingList.FEATURES);
    const accountContentStrings = this.accountsService.initContentStringsList();
    const mCredential$ = this.mobileCredentialFacade.mobileCredentialEnabled$().pipe(take(1));
    const tilesConfig = this.tileConfigFacadeService.updateTilesConfigBySystemSettings().pipe(first());
    const getLockDown = this.settingsFacadeService.fetchSetting(Settings.Setting.LOCK_DOWN_ORDERING).pipe(take(1));
    return zip(user, inst, settingList, mCredential$, tilesConfig, accountContentStrings, getLockDown, ...strings);
  }

  private loadContentStrings(): Observable<ContentStringInfo[]>[] {
    return [
      this.contentStringsFacadeService.fetchContentStrings$(
        CONTENT_STRINGS_DOMAINS.patronUi,
        CONTENT_STRINGS_CATEGORIES.mealDonation
      ),
      this.contentStringsFacadeService.getContentStrings$(
        CONTENT_STRINGS_DOMAINS.patronUi,
        CONTENT_STRINGS_CATEGORIES.ordering
      ),
      this.contentStringsFacadeService.fetchContentStrings$(
        CONTENT_STRINGS_DOMAINS.get_common,
        CONTENT_STRINGS_CATEGORIES.error_message
      ),
      this.contentStringsFacadeService.fetchContentStrings$(
        CONTENT_STRINGS_DOMAINS.get_common,
        CONTENT_STRINGS_CATEGORIES.error
      ),
    ];
  }
}
