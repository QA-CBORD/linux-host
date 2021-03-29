import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { UserFacadeService } from '@core/facades/user/user.facade.service';
import { Observable, zip } from 'rxjs';
import { finalize, map, take } from 'rxjs/operators';
import { GuestFacadeService } from './guest.facade.service';
import { MessageChannel } from '@shared/model/shared-api';
import { UserInfo } from '@core/model/user';
import { LoadingService } from '@core/service/loading/loading.service';
import { GuestDashboardSection } from '../model/dashboard.item.model';

@Injectable({
  providedIn: 'root',
})
export class GuestDashboardResolver implements Resolve<Observable<UserInfo>> {
  constructor(
    private readonly guestFacadeService: GuestFacadeService,
    private readonly loadingService: LoadingService,
    private readonly userFacade: UserFacadeService
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<UserInfo> {
    this.loadingService.showSpinner();
    const user$ = this.userFacade.getUserData$();
    const dashboardSectionsObs = this.guestFacadeService.configureGuestDashboard().pipe(take(1));
    return zip(user$, dashboardSectionsObs).pipe(
      map(([user, dashboardSections]) => {
        MessageChannel.put(dashboardSections);
        return user;
      }),
      take(1),
      finalize(() => this.loadingService.closeSpinner())
    );
  }
}
