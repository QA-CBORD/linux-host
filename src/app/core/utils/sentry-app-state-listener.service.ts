import { inject, Injectable } from '@angular/core';
import { EnvironmentFacadeService } from '@core/facades/environment/environment.facade.service';
import { InstitutionFacadeService } from '@core/facades/institution/institution.facade.service';
import { UserFacadeService } from '@core/facades/user/user.facade.service';
import { CartService } from '@sections/ordering';
import * as Sentry from '@sentry/angular-ivy';
import { Observable, filter, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SentryAppStateListenerService {
  private readonly institutionFacadeService = inject(InstitutionFacadeService);
  private readonly userFacadeService = inject(UserFacadeService);
  private readonly cartService = inject(CartService);
  private readonly environmentFacadeService = inject(EnvironmentFacadeService);

  listenToStateChanges() {
    this.setUserInfo();
    setLogContextFromObservable(this.institutionFacadeService.cachedInstitutionInfo$, 'Institution', [
      'id',
      'name',
      'timeZone',
      'authenticationSystemType',
      'cashlessPaymentSystemType',
    ]);
    setLogContextFromObservable(this.cartService.merchant$, 'Cart Merchant', ['id', 'name', 'timeZone']);
  }

  private setUserInfo() {
    this.userFacadeService.getUserInfo$().subscribe(user => {
      if (user) {
        const { id } = user;
        Sentry.setUser({ id });
      } else {
        Sentry.setUser(null);
      }
    });
  }
}

function setLogContextFromObservable<T>(observable: Observable<T>, tagKey: string, props: (keyof T)[]) {
  observable
    .pipe(
      filter(stateObj => !!stateObj),
      tap(stateObj => {
        if (!stateObj) {
          Sentry.setContext(tagKey, null);
          return;
        }
        const extractedProps = props.reduce((acc: T, prop) => {
          if (stateObj[prop]) {
            acc[prop] = stateObj[prop];
          }
          return acc;
        }, {});
        Sentry.setContext(tagKey, extractedProps);
      })
    )
    .subscribe();
}
