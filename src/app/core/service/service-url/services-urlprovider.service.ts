import { Injectable } from '@angular/core';
import { AuthFacadeService } from '@core/facades/auth/auth.facade.service';
import { EnvironmentFacadeService } from '@core/facades/environment/environment.facade.service';
import { InstitutionFacadeService } from '@core/facades/institution/institution.facade.service';
import { Observable, iif, of } from 'rxjs';
import { switchMap, map, first, skipWhile } from 'rxjs/operators';

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
    // Check for institution override on load
    this.institutionFacadeService.cachedInstitutionInfo$
      .pipe(
        first(),
        switchMap(institution => this.checkAndReturnInstitutionOverride(institution))
      )
      .subscribe();
    // Listen for environment change and reset serviceURL
    this.environmentFacadeService.savedEnvironmentType$
      .pipe(skipWhile(() => !this._servicesURL))
      .subscribe(() => {
        this.setServicesURL();
      });
  }

  private setServicesURL(url: string = null) {
    if (this._servicesURL === url) return;

    if (url) {
      this._servicesURL = url;
    } else {
      this._servicesURL = this.environmentFacadeService.getServicesURL();
    }
  }

  get servicesURL() {
    return this._servicesURL;
  }

  checkAndReturnInstitutionOverride(institution: {
    id: string;
    servicesUrl: string;
    shortName: string;
  }): Observable<string> {
    if (!institution) {
      this.setServicesURL();
      return;
    }

    const shouldOverride = institution.servicesUrl !== this._servicesURL;
    this.setServicesURL(institution.servicesUrl);
    let institutionId$: Observable<{ id: string }>;
    if (shouldOverride) {
      // Since we are performing request to a different server we need to create a new session and get the
      // institution id on that server. If the serviceUrl is null we just return the selected institution id.
      institutionId$ = this.authFacadeService
        .authenticateSystem$()
        .pipe(
          switchMap(() => this.authFacadeService.getAuthSessionToken$()),
          switchMap(sessionId =>
            iif(
              () => !institution.servicesUrl,
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

    return institutionId$.pipe(
      first(),
      map(institution => institution.id)
    );
  }
}
