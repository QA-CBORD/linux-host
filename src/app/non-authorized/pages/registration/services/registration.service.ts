import { Injectable } from '@angular/core';
import { InstitutionFacadeService } from '@core/facades/institution/institution.facade.service';
import { RPCQueryConfig } from '@core/interceptors/query-config.model';
import { Observable, throwError, zip, of } from 'rxjs';
import { take } from 'rxjs/internal/operators/take';
import { catchError, map, switchMap } from 'rxjs/operators';
import { RegistrationApiMethods } from '../models/registration-utils';
import { HttpClient } from '@angular/common/http';
import { AuthFacadeService } from '@core/facades/auth/auth.facade.service';
import { Institution } from '@core/model/institution/institution.model';
import { ContentStringsFacadeService } from '@core/facades/content-strings/content-strings.facade.service';
import { CONTENT_STRINGS_CATEGORIES, CONTENT_STRINGS_DOMAINS } from 'src/app/content-strings';
import { ContentStringInfo } from '@core/model/content/content-string-info.model';
import { LookupFieldInfo } from '@core/model/institution/institution-lookup-field.model'
import { ContentStringCategory } from '@shared/model/content-strings/content-strings-api';
import { ContentStringModel } from '@shared/model/content-strings/content-string-models';
import { ContentStringRequest } from '@core/model/content/content-string-request.model';

@Injectable({
  providedIn: 'root',
})
export class RegistrationService {
  private institutionPage_key = '';

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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    params: any = {},
    useSessionId = true,
    useInstitutionId = false
  ) {
    return this.makeRPCRequest(method, params, useSessionId, useInstitutionId);
  }

  private makeRPCRequest(
    method: RegistrationApiMethods,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    params: any = {},
    useSessionId,
    useInstitutionId
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ): Observable<any> {
    return this.paramsObs$().pipe(
      switchMap(([sessionId]) => {
        const queryConfig = new RPCQueryConfig(method, { sessionId, ...params }, useSessionId, useInstitutionId);
        return this.http.post(this.endpoints.user, queryConfig).pipe(
          catchError(err => {
            return throwError(err);
          })
        );
      })
    );
  }

  getString$(category: CONTENT_STRINGS_CATEGORIES): Observable<ContentStringInfo[]> {
    return this.contentStringFacade.fetchContentStringAfresh(CONTENT_STRINGS_DOMAINS.patronUi, category);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getStringModel$<T extends ContentStringModel>(category: ContentStringCategory, args: { data?: any; requests?: ContentStringRequest[] } = {}): Observable<T> {
    return this.contentStringFacade.fetchContentStringModel<T>(category, args);
  }


  institution$(): Observable<Institution> {
    return this.institutionFacadeService.cachedInstitutionInfo$.pipe(take(1));
  }

  private paramsObs$(): Observable<[string, Institution]> {
    const sessionId$ = this.authFacadeService.getAuthSessionToken$().pipe(take(1));
    const institutionId$ = this.institution$();
    return zip(sessionId$, institutionId$);
  }
}
