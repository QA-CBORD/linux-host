import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { LoadingService } from '@core/service/loading/loading.service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { PreLoginStringModel } from '../../registration/models/registration.shared.model';
import { RegistrationServiceFacade } from '../../registration/services/registration-service-facade';

@Injectable({
  providedIn: 'root',
})
export class PreLoginDataResolverService implements Resolve<Observable<PreLoginStringModel>> {
  constructor(
    private readonly registrationServiceFacade: RegistrationServiceFacade,
    private readonly loadingService: LoadingService
  ) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<PreLoginStringModel> {
    return this.registrationServiceFacade.preloginContents().pipe(
      tap(() => {
        this.loadingService.closeSpinner();
      })
    );
  }
}
