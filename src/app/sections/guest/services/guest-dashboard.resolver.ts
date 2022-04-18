import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { UserFacadeService } from '@core/facades/user/user.facade.service';
import { Observable, of, zip } from 'rxjs';
import { catchError, finalize, map, take } from 'rxjs/operators';
import { GuestFacadeService } from './guest.facade.service';
import { UserInfo } from '@core/model/user';
import { LoadingService } from '@core/service/loading/loading.service';
import { MessageProxy } from '@shared/services/injectable-message.proxy';
import { ProminentDisclosureService } from '@sections/dashboard/services/prominent-disclosure.service';

@Injectable()
export class GuestDashboardResolver implements Resolve<Observable<UserInfo>> {
  constructor(
    private readonly guestFacadeService: GuestFacadeService,
    private readonly loadingService: LoadingService,
    private readonly userFacade: UserFacadeService,
    private readonly messageProxy: MessageProxy,
    private readonly prominentDisclosureService: ProminentDisclosureService,
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<UserInfo> {
    this.prominentDisclosureService.openProminentDisclosure();
    this.loadingService.showSpinner();
    const user$ = this.userFacade.getUserData$();
    const dashboardSectionsObs = this.guestFacadeService.configureGuestDashboard().pipe(take(1));
    return zip(user$, dashboardSectionsObs).pipe(
      take(1),
      map(([user, dashboardSections]) => {
        this.messageProxy.put(dashboardSections);
        return user;
      }),
      catchError((err) => {
        this.messageProxy.put([]);
        console.log('Dashboard.resolver ', err);
        return of({} as any);
      }),
      finalize(() => this.loadingService.closeSpinner())
    );
  }
}
