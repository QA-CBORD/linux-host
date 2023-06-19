import { Injectable } from '@angular/core';
import { ServiceStateFacade } from '@core/classes/service-state-facade';
import { NotificationService } from '@core/service/notification/notification.service';
import { combineLatest } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import { AuthFacadeService } from '../auth/auth.facade.service';
import { InstitutionFacadeService } from '../institution/institution.facade.service';

@Injectable()
export class NotificationFacadeService extends ServiceStateFacade {
  constructor(
    private readonly notificationService: NotificationService,
    private readonly authFacadeService: AuthFacadeService,
    private readonly institutionFacadeService: InstitutionFacadeService
  ) {
    super();
  }

  resetPasswordRequest(username: string): Promise<boolean> {
    return combineLatest([
      this.institutionFacadeService.cachedInstitutionInfo$,
      this.authFacadeService.getAuthSessionToken$(),
    ])
      .pipe(
        switchMap(([institution, sessionId]) =>
          this.notificationService.resetPasswordNotification(institution.id, username, sessionId)
        ),
        take(1)
      )
      .toPromise();
  }
}
