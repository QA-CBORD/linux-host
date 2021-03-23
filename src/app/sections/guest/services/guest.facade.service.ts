import { Injectable } from '@angular/core';
import { ContentStringsFacadeService } from '@core/facades/content-strings/content-strings.facade.service';
import { ContentStringInfo } from '@core/model/content/content-string-info.model';
import { ContentStringApi } from '@shared/model/content-strings/content-strings-api';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { CONTENT_STRINGS_CATEGORIES, CONTENT_STRINGS_DOMAINS } from 'src/app/content-strings';
import { GuestDashboardSections } from '../model/dashboard.config';
import { GuestDashboardSection } from '../model/dashboard.item.model';
import { GuestDashboardCsModel } from '../model/guest-dashboard.content.strings';

@Injectable({
  providedIn: 'root',
})
export class GuestFacadeService {

  constructor(private readonly contentStringFacade: ContentStringsFacadeService) {}

  private loadAllContentStrings(): Observable<GuestDashboardCsModel> {
    return this.contentStringFacade
      .fetchContentStringAfresh(CONTENT_STRINGS_DOMAINS.patronUi, CONTENT_STRINGS_CATEGORIES.guestDashboard)
      .pipe(
        map((data: ContentStringInfo[]) => ContentStringApi.guestDashboard(data)),
        catchError(() => of(ContentStringApi.guestDashboard()))
      );
  }

  configureGuestDashboard(): Observable<GuestDashboardSection[]> {
    return this.loadAllContentStrings().pipe(
      map(model => {
        return Object.keys(GuestDashboardSections).map(itemkey => {
          GuestDashboardSections[itemkey].title = model.content[itemkey];
          return GuestDashboardSections[itemkey];
        });
      })
    );
  }
}
