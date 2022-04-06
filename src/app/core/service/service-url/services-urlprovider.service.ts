import { Injectable } from '@angular/core';
import { ServiceStateFacade } from '@core/classes/service-state-facade';
import { AuthFacadeService } from '@core/facades/auth/auth.facade.service';
import { EnvironmentFacadeService } from '@core/facades/environment/environment.facade.service';
import { InstitutionFacadeService } from '@core/facades/institution/institution.facade.service';
import { StorageStateService } from '@core/states/storage/storage-state.service';
import { Observable, iif, of } from 'rxjs';
import { switchMap, map, first, skip } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ServicesURLProviderService extends ServiceStateFacade {
  private _servicesURL: string;
  private _servicesURLStateKey = 'servicesURLState_Key';

  constructor(
    private readonly environmentFacadeService: EnvironmentFacadeService,
    private readonly authFacadeService: AuthFacadeService,
    private readonly storageStateService: StorageStateService,
    private readonly institutionFacadeService: InstitutionFacadeService
  ) {
    super();
    // Listen for environment change and reset serviceURL
    this.environmentFacadeService.savedEnvironmentType$.pipe(skip(1)).subscribe(() => {
      this.setServicesURL();
    });
  }

  get servicesURL$() {
    return this._servicesURL
      ? of(this._servicesURL)
      : this.storageStateService.getStateEntityByKey$<string>(this._servicesURLStateKey).pipe(
          first(),
          switchMap(data => {
            this.setServicesURL(data ? data.value : null);
            return of(this._servicesURL);
          })
        );
  }

  private setServicesURL(url: string = null) {
    if (this._servicesURL && this._servicesURL === url) return;

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
      institutionId$ = this.authFacadeService.authenticateSystem$().pipe(
        switchMap(() => this.authFacadeService.getAuthSessionToken$()),
        switchMap(sessionId =>
          iif(
            () => !institution.servicesUrl,
            of(institution),
            this.institutionFacadeService.getInstitutionDataByShortName$(institution.shortName, sessionId)
          )
        )
      );

      this.storageStateService.updateStateEntity(this._servicesURLStateKey, this._servicesURL, {
        highPriorityKey: true,
        keepOnLogout: true,
      });
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

  resetServicesURL() {
    this.setServicesURL();
    return this.storageStateService.deleteStateEntityByKey(this._servicesURLStateKey);
  }
}
