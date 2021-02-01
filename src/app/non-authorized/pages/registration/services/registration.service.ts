import { Injectable } from '@angular/core';
import { InstitutionFacadeService } from '@core/facades/institution/institution.facade.service';
import { RPCQueryConfig } from '@core/interceptors/query-config.model';
import { Observable, throwError, forkJoin, zip, of } from 'rxjs';
import { take } from 'rxjs/internal/operators/take';
import { catchError, map, switchMap } from 'rxjs/operators';
import {
  LookupFieldInfo,
  LookupFieldType,
  PageSetting,
  RegistrationApiMethods,
} from '../models/registration.shared.model';
import { HttpClient } from '@angular/common/http';
import { AuthFacadeService } from '@core/facades/auth/auth.facade.service';
import { SettingsFacadeService } from '@core/facades/settings/settings-facade.service';
import { Settings } from 'src/app/app.global';
import { Institution } from '@core/model/institution/institution.model';

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
    private readonly settingsFacadeService: SettingsFacadeService
  ) {}

  retrieveRegistrationFields(): Observable<LookupFieldInfo[]> {
    return this.makeRPCRequest(RegistrationApiMethods.retrieveRegistrationFields, {}, true, true).pipe(
      map(data => data || []),
      catchError(() =>
        of([
          {
            lookupFieldId: 'Parent_phone',
            displayName: 'Parent phone',
            displayOrder: 2,
            type: LookupFieldType.STRING_FUZZY,
            value: '',
          },
          {
            lookupFieldId: 'student_compus_id',
            displayName: 'Campus ID',
            displayOrder: 1,
            type: LookupFieldType.STRING_IGNORECASE,
            value: '',
          },
          {
            lookupFieldId: 'Media_value',
            displayName: 'Media value',
            displayOrder: 0,
            type: LookupFieldType.MEDIA_VALUE,
            value: '',
          },
        ])
      )
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

  private makeRPCRequest(method: RegistrationApiMethods, params: any = {}, useSessionId, useInstitutionId): Observable<any> {
    return this.paramsObs$().pipe(
      switchMap(([sessionId, { id: institutionId }]) => {
        const queryConfig = new RPCQueryConfig(method, { ...params }, useSessionId, useInstitutionId);
        return this.http.post(this.endpoints.user, queryConfig).pipe(catchError(err => {
           console.log('error ==>> ', err);
          return throwError(err);
        }));
      })
    );
  }

  institition$(): Observable<Institution> {
    return this.institutionFacadeService.cachedInstitutionInfo$.pipe(
      take(1)
    );
  }

  private paramsObs$(): Observable<[string, Institution]> {
    const sessionId$ = this.authFacadeService.getAuthSessionToken$().pipe(take(1));
    const institutionId$ = this.institition$();
    return zip(sessionId$, institutionId$);
  }

  getPageSettings(): Observable<PageSetting> {
    return this.paramsObs$().pipe(
      switchMap(([sessionId, { id, name: institutionName }]) => {
        return this.settingsFacadeService.fetchSetting(Settings.Setting.MOBILE_HEADER_COLOR, sessionId, id).pipe(
          map(({ value }) => {
            const siteColors = value ? JSON.parse(value)['native-header-bg'] : '166dff';
            const backgroundColor = `#${siteColors || '166dff'}`;
            return {
              backgroundColor,
              institutionName,
            };
          })
        );
      })
    );
  }
}
