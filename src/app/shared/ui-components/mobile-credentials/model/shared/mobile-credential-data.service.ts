import { HttpHeaders, HttpParams, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Device, DeviceInfo } from '@capacitor/core';
import { AuthFacadeService } from '@core/facades/auth/auth.facade.service';
import { InstitutionFacadeService } from '@core/facades/institution/institution.facade.service';
import { UserFacadeService } from '@core/facades/user/user.facade.service';
import { APIService, HttpResponseType, RestCallType } from '@core/service/api-service/api.service';
import { StorageStateService } from '@core/states/storage/storage-state.service';
import { forkJoin, from, Observable, of } from 'rxjs';
import { catchError, first, map, switchMap, take, tap } from 'rxjs/operators';
import { ActivePasses } from './credential-utils';
import { MobileCredential } from './mobile-credential';
import { MobileCredentialFactory } from './mobile-credential-factory';

const api_version = 'v1';
const resourceUrls = {
  activePasses: `/android/${api_version}/activePasses`,
};

@Injectable()
export class MobileCredentialDataService {
  protected ttl: number = 600000;
  protected jwtToken_key: string = 'jwt_token';
  protected authBlob_key: string = 'auth_blob';
  protected credential_key: string = 'mobile_credential';

  constructor(
    protected storageStateService: StorageStateService,
    protected authFacadeService: AuthFacadeService,
    protected institutionFacadeService: InstitutionFacadeService,
    protected apiService: APIService,
    protected readonly userFacade: UserFacadeService
  ) {}

  protected retrieveAuthorizationBlob$(deviceModel: string, osVersion: string): Observable<object> {
    return this.authFacadeService.retrieveAuthorizationBlob(deviceModel, osVersion).pipe(
      map(({ response }) => response),
      tap(response => this.storageStateService.updateStateEntity(this.authBlob_key, response, { ttl: this.ttl }))
    );
  }

  protected omniIDJwtToken$(): Observable<string> {
    return this.storageStateService.getStateEntityByKey$<string>(this.jwtToken_key).pipe(
      switchMap(data => {
        if (data && data.lastModified + data.timeToLive >= Date.now()) {
          return of(data.value);
        } else {
          return this.retrieveOmniIDJwtTokenFromServer$();
        }
      })
    );
  }

  protected getUserId(): Observable<string> {
    return this.userFacade.getUserData$().pipe(
      first(),
      map(({ id }) => id)
    );
  }

  protected retrieveOmniIDJwtTokenFromServer$(): Observable<string> {
    return this.authFacadeService
      .getExternalAuthenticationToken$('OmniID')
      .pipe(
        tap(jwtToken => this.storageStateService.updateStateEntity(this.jwtToken_key, jwtToken, { ttl: this.ttl }))
      );
  }

  protected get deviceInfo$(): Observable<DeviceInfo> {
    return from(Device.getInfo()).pipe(
      catchError(() => {
        const info = {
          manufacturer: 'Google',
          model: 'Android SDK built for x86',
          osVersion: '8.0.0',
        };
        return of(<DeviceInfo>info);
      })
    );
  }

  protected authorizationBlob$(): Observable<object> {
    return this.storageStateService.getStateEntityByKey$<object>(this.authBlob_key).pipe(
      switchMap(data => {
        if (data && data.lastModified + data.timeToLive >= Date.now()) {
          return of(data.value);
        }
        return this.deviceInfo$.pipe(
          switchMap(({ model, osVersion }) => {
            return this.retrieveAuthorizationBlob$(model, osVersion);
          })
        );
      })
    );
  }

  activePasses$(): Observable<MobileCredential> {
    return this.getActivePasses().pipe(map(activePasses => MobileCredentialFactory.fromActivePasses(activePasses)));
  }

  private getActivePasses(): Observable<ActivePasses> {
    /**
     * calls api gw android/version/actipasses to obtain activaPasses info for current patron/user.
     * this data is then used to get a credential for the patron/user.
     */
    // doing a forkJoin to ensure all requests actually complete, if one of these fails, the others are useless, just return error
    return this.authorizationBlob$().pipe(switchMap(authorizationBlob => this.getPasses({ authorizationBlob })));
  }

  private getPasses(requestBody: { authorizationBlob: object }): Observable<any> {
    /**
     * @params omniIDToken -> jwt token needed to authenticate with partner payments api on aws.
     * @params authBlob  -> authorization blob that contains ..... ???
     * calls api gw android/version/actipasses to obtain activaPasses info for current patron/user.
     * this data is then used to get a credential for the patron/user.
     */
    // we need to send the institution id to activaPasses resource.
    const institutionInfo$ = this.institutionFacadeService.cachedInstitutionInfo$.pipe(take(1));
    const omniIDJwtToken$ = this.omniIDJwtToken$().pipe(take(1));
    // doing a forkJoin to ensure all requests actually complete, if one of these fails, the others are useless, just return error
    return forkJoin(institutionInfo$, omniIDJwtToken$).pipe(
      switchMap(([{ id }, omniIDJwtToken]) => {
        const headers = new HttpHeaders({ Authorization: `Bearer ${omniIDJwtToken}` });
        // the institution id is required for this request.
        const params = new HttpParams().set('institutionId', id);
        // authBlob needs to be sent in request body.
        return this.apiService.partnerHTTPCall(
          RestCallType.post,
          resourceUrls.activePasses,
          HttpResponseType.json,
          requestBody,
          params,
          headers
        );
      })
    );
  }
}
