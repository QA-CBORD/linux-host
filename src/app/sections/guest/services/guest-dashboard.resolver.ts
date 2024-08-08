import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { combineLatest, Observable } from 'rxjs';
import { finalize, map, take } from 'rxjs/operators';
import { LoadingService } from '@core/service/loading/loading.service';
import { UserFacadeService } from '@core/facades/user/user.facade.service';
import { ProminentDisclosureService } from '@sections/dashboard/services/prominent-disclosure.service';
import { ContentStringsFacadeService } from '@core/facades/content-strings/content-strings.facade.service';
import { CONTENT_STRINGS_DOMAINS, CONTENT_STRINGS_CATEGORIES } from 'src/app/content-strings';
import { SettingsFacadeService } from '@core/facades/settings/settings-facade.service';
import { Settings } from 'src/app/app.global';
import { GuestDashboardSections } from '../dashboard/model/dashboard.config';
import { GuestDashboardSection } from '../dashboard/model/dashboard.item.model';
import { SettingInfo } from '@core/model/configuration/setting-info.model';

export const guestDashboardResolver: ResolveFn<Observable<GuestDashboardSection[]>> = (): Observable<
  GuestDashboardSection[]
> => {
  const loadingService = inject(LoadingService);
  const userFacade = inject(UserFacadeService);
  const contentStringFacade = inject(ContentStringsFacadeService);
  const settingsFacadeService = inject(SettingsFacadeService);
  const prominentDisclosureService = inject(ProminentDisclosureService);

  prominentDisclosureService.openProminentDisclosure();
  loadingService.showSpinner();
  const user$ = userFacade.getUserData$();

  const contentStringObs = contentStringFacade.fetchContentStrings$(
    CONTENT_STRINGS_DOMAINS.patronUi,
    CONTENT_STRINGS_CATEGORIES.guestDashboard
  );

  return combineLatest([
    user$,
    settingsFacadeService.fetchSettingList(Settings.SettingList.FEATURES),
    settingsFacadeService.fetchSettingList(Settings.SettingList.DEPOSITS),
    contentStringObs,
  ]).pipe(
    take(1),
    map(([_, featureSettings, depositSettings]) =>
      getSectionsFromEnabledSettings(
        [...(featureSettings?.list ?? []), ...(depositSettings?.list ?? [])],
        GuestDashboardSections
      )
    ),
    finalize(() => loadingService.closeSpinner())
  );
};

export function getSectionsFromEnabledSettings(
  settings: SettingInfo[],
  configSections: GuestDashboardSection[]
): GuestDashboardSection[] {
  const settingsIds = settings.filter(({ value }) => Boolean(Number(value))).map(setting => setting.name) ?? [];
  const sections: GuestDashboardSection[] = [];

  for (const section of configSections) {
    if (settingsIds.includes(section.id)) {
      sections.push(section);
    }
  }
  return sections;
}
