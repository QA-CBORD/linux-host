import { Injectable } from '@angular/core';
import { InstitutionFacadeService } from '@core/facades/institution/institution.facade.service';
import { RPCQueryConfig } from '@core/interceptors/query-config.model';
import { Observable, throwError, zip, of } from 'rxjs';
import { take } from 'rxjs/internal/operators/take';
import { catchError, map, switchMap } from 'rxjs/operators';
import {
  LookupFieldInfo,
  RegistrationApiMethods,
} from '../models/registration.shared.model';
import { HttpClient } from '@angular/common/http';
import { AuthFacadeService } from '@core/facades/auth/auth.facade.service';
import { SettingsFacadeService } from '@core/facades/settings/settings-facade.service';
import { Settings } from 'src/app/app.global';
import { Institution } from '@core/model/institution/institution.model';
import { ContentStringsFacadeService } from '@core/facades/content-strings/content-strings.facade.service';
import { CONTENT_STRINGS_CATEGORIES, CONTENT_STRINGS_DOMAINS, CONTENT_STRINGS_LOCALES } from 'src/app/content-strings';
import { ContentStringInfo } from '@core/model/content/content-string-info.model';

@Injectable({
  providedIn: 'root',
})
export class RegistrationService {
  private readonly endpoints = {
    user: '/json/user',
  };

  constructor(
    protected readonly institutionFacadeService: InstitutionFacadeService,
    private readonly http: HttpClient,
    private readonly authFacadeService: AuthFacadeService,
    private readonly contentStringFacade: ContentStringsFacadeService
  ) {}

  retrieveRegistrationFields(): Observable<LookupFieldInfo[]> {
    return this.makeRPCRequest(RegistrationApiMethods.retrieveRegistrationFields, {}, true, true).pipe(
      map(({ response }) => response.lookupFields || []),
      catchError(() => of([]))
    );
  }

  callBackend(
    method: RegistrationApiMethods,
    params: any = {},
    useSessionId = true,
    useInstitutionId = false
  ): Observable<any> {
    return this.makeRPCRequest(method, params, useSessionId, useInstitutionId);
  }

  private makeRPCRequest(
    method: RegistrationApiMethods,
    params: any = {},
    useSessionId,
    useInstitutionId
  ): Observable<any> {
    return this.paramsObs$().pipe(
      switchMap(([sessionId]) => {
        const queryConfig = new RPCQueryConfig(method, { sessionId, ...params }, useSessionId, useInstitutionId);
        return this.http.post(this.endpoints.user, queryConfig).pipe(
          catchError(err => {
            console.log('error ==>> ', err);
            return throwError(err);
          })
        );
      })
    );
  }

  getAllRegistrationContentString(): Observable<ContentStringInfo[]> {
    return this.contentStringFacade
      .fetchContentStrings$(CONTENT_STRINGS_DOMAINS.patronUi, CONTENT_STRINGS_CATEGORIES.mobileRegistration)
      .pipe(
        take(1),
        catchError(err => {
          console.log('big ass error ==> ', err);
          return of([]);
        })
      );
  }

  institition$(): Observable<Institution> {
    return this.institutionFacadeService.cachedInstitutionInfo$.pipe(take(1));
  }

  private paramsObs$(): Observable<[string, Institution]> {
    const sessionId$ = this.authFacadeService.getAuthSessionToken$().pipe(take(1));
    const institutionId$ = this.institition$();
    return zip(sessionId$, institutionId$);
  }
}
