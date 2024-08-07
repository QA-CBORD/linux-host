import { Injectable } from '@angular/core';
import { UserFacadeService } from '@core/facades/user/user.facade.service';
import { combineLatest, Observable } from 'rxjs';
import { finalize, map, take } from 'rxjs/operators';
import { LoadingService } from '@core/service/loading/loading.service';
import { ProminentDisclosureService } from '@sections/dashboard/services/prominent-disclosure.service';
import { ContentStringsFacadeService } from '@core/facades/content-strings/content-strings.facade.service';
import { CONTENT_STRINGS_DOMAINS, CONTENT_STRINGS_CATEGORIES } from 'src/app/content-strings';
import { SettingsFacadeService } from '@core/facades/settings/settings-facade.service';
import { Settings } from 'src/app/app.global';
import { GuestDashboardSections } from '../dashboard/model/dashboard.config';
import { GuestDashboardSection } from '../dashboard/model/dashboard.item.model';
import { SettingInfo } from '@core/model/configuration/setting-info.model';

@Injectable()
export class GuestDashboardResolver {
  constructor(
    private readonly loadingService: LoadingService,
    private readonly userFacade: UserFacadeService,
    private readonly contentStringFacade: ContentStringsFacadeService,
    private readonly settingsFacadeService: SettingsFacadeService,
    private readonly prominentDisclosureService: ProminentDisclosureService
  ) {}

  resolve(): Observable<GuestDashboardSection[]> {
    this.prominentDisclosureService.openProminentDisclosure();
    this.loadingService.showSpinner();
    const user$ = this.userFacade.getUserData$();

    const contentStringObs = this.contentStringFacade.fetchContentStrings$(
      CONTENT_STRINGS_DOMAINS.patronUi,
      CONTENT_STRINGS_CATEGORIES.guestDashboard
    );

    return combineLatest([
      user$,
      this.settingsFacadeService.fetchSettingList(Settings.SettingList.FEATURES),
      this.settingsFacadeService.fetchSettingList(Settings.SettingList.DEPOSITS),
      contentStringObs,
    ]).pipe(
      take(1),
      map(([_, featureSettings, depositSettings]) =>
        getSectionsFromEnabledSettings([...(featureSettings?.list ?? []), ...(depositSettings?.list ?? [])])
      ),
      finalize(() => this.loadingService.closeSpinner())
    );
  }
}

function getSectionsFromEnabledSettings(settings: SettingInfo[]): GuestDashboardSection[] {
  const settingsIds = settings.filter(({ value }) => Boolean(Number(value))).map(setting => setting.name) ?? [];
  const sections: GuestDashboardSection[] = [];

  for (const section of GuestDashboardSections) {
    if (settingsIds.includes(section.id)) {
      sections.push(section);
    }
  }
  return sections;
}
