import { Injectable } from '@angular/core';
import { ContentStringsFacadeService } from '@core/facades/content-strings/content-strings.facade.service';
import { InstitutionFacadeService } from '@core/facades/institution/institution.facade.service';
import { ContentStringCategory } from '@shared/model/content-strings/content-strings-api';
import { from, Observable, zip } from 'rxjs';
import { map } from 'rxjs/operators';
import { GuestDashboardSections } from '../dashboard/model/dashboard.config';
import { GuestDashboardSection } from '../dashboard/model/dashboard.item.model';
import { GuestDashboardCsModel } from '../dashboard/model/guest-dashboard-cs.model';
import { Settings } from 'src/app/app.global';
import { SettingsFacadeService } from '@core/facades/settings/settings-facade.service';

@Injectable({
  providedIn: 'root',
})
export class GuestFacadeService {
  constructor(
    private readonly contentStringFacade: ContentStringsFacadeService,
    private readonly settingsFacadeService: SettingsFacadeService,
    private readonly institutionService: InstitutionFacadeService
  ) {}

  private loadAllContentStrings(): Observable<GuestDashboardCsModel> {
    return this.contentStringFacade.fetchContentStringModel(ContentStringCategory.guestDashboard);
  }

  configureGuestDashboard(): Observable<GuestDashboardSection[]> {
    const guestLoginSettingsObs = this.institutionService.guestSettings;
    const contentStringObs = this.loadAllContentStrings();
    const settings$ = this.settingsFacadeService.fetchSettingList(Settings.SettingList.FEATURES);

    return zip(contentStringObs, from(guestLoginSettingsObs), settings$).pipe(
      map(([contentString, guestSetting]) => {
        return Object.keys(GuestDashboardSections)
          .map(itemkey => {
            GuestDashboardSections[itemkey].title = contentString.valueByKey(itemkey);
            return GuestDashboardSections[itemkey];
          })
          .filter(item => item.visibilityOn(guestSetting));
      })
    );
  }
}
