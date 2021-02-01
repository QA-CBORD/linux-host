import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { LoadingService } from '@core/service/loading/loading.service';
import { RegistrationServiceFacade } from 'src/app/non-authorized/pages/registration/services/registration-service-facade';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RegistrationPageResolver implements Resolve<Observable<any>> {
  constructor(
    private readonly registrationServiceFacade: RegistrationServiceFacade,
    private readonly loadingService: LoadingService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Observable<Observable<any>> | Promise<Observable<any>> {
    this.loadingService.showSpinner();
    return this.registrationServiceFacade
      .onBeforePageLoad(route.data.isGuest)
      .pipe(finalize(() => this.loadingService.closeSpinner()));
  }
}
