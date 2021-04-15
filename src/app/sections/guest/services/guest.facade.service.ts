import { Injectable } from '@angular/core';
import { AuthFacadeService } from '@core/facades/auth/auth.facade.service';
import { ContentStringsFacadeService } from '@core/facades/content-strings/content-strings.facade.service';
import { ContentStringCategory } from '@shared/model/content-strings/content-strings-api';
import { Observable, zip } from 'rxjs';
import { map } from 'rxjs/operators';
import { GuestDashboardSections } from '../dashboard/model/dashboard.config';
import { GuestDashboardSection } from '../dashboard/model/dashboard.item.model';
import { GuestDashboardCsModel } from '../dashboard/model/guest-dashboard-cs.model';

@Injectable({
  providedIn: 'root',
})
export class GuestFacadeService {
  constructor(
    private readonly contentStringFacade: ContentStringsFacadeService,
    private readonly authService: AuthFacadeService
  ) {}

  private loadAllContentStrings(): Observable<GuestDashboardCsModel> {
    return this.contentStringFacade.fetchContentStringModel(ContentStringCategory.guestDashboard);
  }

  configureGuestDashboard(): Observable<GuestDashboardSection[]> {
    const guestLoginSettingsObs = this.authService.getGuestSettings();
    const contentStringObs = this.loadAllContentStrings();
    return zip(contentStringObs, guestLoginSettingsObs).pipe(
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
