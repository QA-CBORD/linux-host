import { Injectable } from '@angular/core';
import { AuthFacadeService } from '@core/facades/auth/auth.facade.service';
import { EnvironmentFacadeService } from '@core/facades/environment/environment.facade.service';
import { InstitutionFacadeService } from '@core/facades/institution/institution.facade.service';
import { InstitutionLookupListItem } from '@core/model/institution';
import { firstValueFrom } from '@shared/utils';
import { Observable, iif, of } from 'rxjs';
import { switchMap, map, first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ServicesURLProviderService {
  private _servicesURL: string;

  constructor(
    private readonly environmentFacadeService: EnvironmentFacadeService,
    private readonly authFacadeService: AuthFacadeService,
    private readonly institutionFacadeService: InstitutionFacadeService
  ) {
    this._servicesURL = this.environmentFacadeService.getServicesURL();
  }

  private setServicesURL(url: string) {
    if (url) {
      this._servicesURL = url;
    } else {
      this._servicesURL = this.environmentFacadeService.getServicesURL();
    }
  }

  get servicesURL() {
    return this._servicesURL;
  }

  async checkAndReturnInstitutionOverride(institution: InstitutionLookupListItem): Promise<string> {
    const shouldOverride = institution.servicesUrl !== this._servicesURL;
    this.setServicesURL(institution.servicesUrl);
    let institutionId$: Observable<{ id: string }>;
    if (shouldOverride) {
      // Since we are performing request to a different server we need to create a new session and get the
      // institution id on that server. If the serviceUrl is null we just return the selected institution id.
      institutionId$ = this.authFacadeService
        .authenticateSystem$()
        .pipe(
          switchMap(sessionId =>
            iif(
              () => !!institution.servicesUrl,
              of(institution),
              this.institutionFacadeService.getInstitutionDataByShortName$(institution.shortName, sessionId)
            )
          )
        );
    } else if (institution.servicesUrl) {
      // Same serviceUrl as previous institution, using existing session.
      institutionId$ = this.authFacadeService
        .getAuthSessionToken$()
        .pipe(
          switchMap(sessionId =>
            this.institutionFacadeService.getInstitutionDataByShortName$(institution.shortName, sessionId)
          )
        );
    } else {
      institutionId$ = of(institution);
    }

    return firstValueFrom(
      institutionId$.pipe(
        first(),
        map(institution => institution.id)
      )
    );
  }
}
